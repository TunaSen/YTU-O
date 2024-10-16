from django.core.management.base import BaseCommand, CommandParser
import requests
from bs4 import BeautifulSoup
from Origames.models import Activity
import time
from tenacity import retry, stop_after_attempt, wait_fixed, RetryError
import datetime

# Cookies and headers can be moved here for global access
cookies = {
    '_ga': 'GA1.1.37276005.1694692645',
    'ASPSESSIONIDQEEDTSBA': 'HCONLBGCCLJPPIJLGHGLMKNO',
    '_ga_4M2MLBPQ6Z': 'GS1.1.1721566543.103.1.1721566545.0.0.0',
}

headers = {
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
    'accept-language': 'en-US,en;q=0.9,tr;q=0.8',
    'cache-control': 'max-age=0',
    'if-modified-since': 'Sun, 04 Feb 2024 14:53:06 GMT',
    'if-none-match': '"0f553dc7957da1:0"',
    'priority': 'u=0, i',
    'referer': 'https://www.iog.org.tr/results.asp',
    'sec-ch-ua': '"Not/A)Brand";v="8", "Chromium";v="126", "Microsoft Edge";v="126"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Windows"',
    'sec-fetch-dest': 'document',
    'sec-fetch-mode': 'navigate',
    'sec-fetch-site': 'same-origin',
    'sec-fetch-user': '?1',
    'upgrade-insecure-requests': '1',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36 Edg/126.0.0.0',
}


class Command(BaseCommand):
    help = "Scrapes data from a URL and saves it into the Activity model"

    def add_arguments(self, parser: CommandParser):
        # Adding URL as an argument to pass dynamically
        parser.add_argument('url', type=str, help="URL to scrape data from")

    @retry(stop=stop_after_attempt(500), wait=wait_fixed(1))
    def fetch_url(self, url):
        self.stdout.write("Request sent")
        response = requests.get(url, cookies=cookies,
                                headers=headers, timeout=2)
        response.raise_for_status()
        return response

    def handle(self, *args, **kwargs):
        url = kwargs['url']  # Get the URL from the command arguments
        self.stdout.write("Scraping started")

        try:
            response = self.fetch_url(url)
            self.stdout.write("Request successful")
        except RetryError as e:
            self.stderr.write(f"Error: {e}")
            return

        response.encoding = response.apparent_encoding
        soup = BeautifulSoup(response.text, "lxml")

        title = soup.find("title").text
        self.stdout.write(f"Title: {title}")

        date_str = soup.find("table", {"width": "642px", "style": "table-layout:auto;"}).find_all(
            "tr")[0].find("td", {"id": "rb"}).text.split(" ")[1]
        date = datetime.datetime.strptime(date_str, "%d.%m.%Y")
        self.stdout.write(f"Date: {date}")

        tables = soup.find_all("table", {"width": "642px", "style": ""})
        self.stdout.write(f"Number of tables: {len(tables)}")

        activity = {
            "title": title,
            "date": date,
            "parkours": {}
        }

        for i in range(0, len(tables), 3):
            t1, t2, t3 = tables[i:i+3]

            # Extracting parkour details
            soup = BeautifulSoup(str(t1), "lxml")
            p_name = soup.find("td", {"id": "c00"}).text
            p_info = soup.find("td", {"id": "c01"}).text
            p_distance = p_info.split(" ")[0]
            p_elevation = p_info.split(' ')[3]

            self.stdout.write(
                f"Parkour: {p_name}, Distance: {p_distance}, Elevation: {p_elevation}")

            # Extracting runner details
            soup = BeautifulSoup(str(t3), "lxml")
            runner_list = []
            runners = soup.find_all("tr")
            for runner in runners:
                try:
                    runner_name = runner.find_all("td")[2].text
                    runner_club = runner.find_all("td")[3].text
                    runner_time = runner.find_all("td")[5].text
                    self.stdout.write(
                        f"Runner: {runner_name}, Club: {runner_club}, Time: {runner_time}")
                    runner_list.append(
                        {"name": runner_name, "club": runner_club, "time": runner_time}
                    )
                except IndexError:
                    continue

            activity["parkours"][p_name] = {
                "distance": p_distance,
                "elevation": p_elevation,
                "runners": runner_list
            }

        new_activity = Activity(
            name=activity["title"], date=activity["date"], results=activity["parkours"]
        )
        new_activity.save()
        self.stdout.write("Activity saved successfully")
