from django.db import models
from Management.models import Profile
from enum import IntEnum


class Gender(IntEnum):
    MALE = 0
    FEMALE = 1

    @classmethod
    def choices(cls):
        return [(key.value, key.name) for key in cls]


class Athlete(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(
        max_length=100, blank=True)
    club = models.CharField(max_length=100)
    cost = models.IntegerField(default=0)
    gender = models.IntegerField(choices=Gender.choices(), default=Gender.MALE)

    def __str__(self):
        return self.name


class Activity(models.Model):
    name = models.CharField(max_length=100)
    date = models.DateField()
    results = models.JSONField()

    def __str__(self):
        return self.name


class Game(models.Model):
    name = models.CharField(max_length=100)
    creator = models.ForeignKey(
        Profile, on_delete=models.CASCADE, related_name='created_games')
    date = models.DateField(auto_now_add=True)
    description = models.CharField(max_length=300)
    max_coin = models.IntegerField(default=40)
    status = models.BooleanField(default=True)

    activity = models.ForeignKey(
        Activity, on_delete=models.SET_NULL, null=True, blank=True, related_name='games')

    def __str__(self):
        return self.name

    def calculateResults(self):
        # This method will calculate the results of the game
        parkours = self.activity.results.keys()
        distance = {}
        max_len = 0
        for i in parkours:
            distance[i] = {"distance": int(self.activity.results[i]['distance'].replace(",", "."))*1000,
                           "c": 0}
            max_len = max(max_len, self.activity.results[i]['distance'])
        for i in parkours:
            distance[i]["c"] = (
                max_len/self.activity.results[i]['distance'])  # katsayı hesaplandı

        results = self.activity.results
        for parkour in parkours:
            pass


class Runner(models.Model):
    athlete = models.ForeignKey(
        Athlete, on_delete=models.CASCADE, default=None)
    time = models.DurationField(default=0,)

    point = models.IntegerField(default=0)
    game = models.ForeignKey(Game, on_delete=models.CASCADE, default=None)

    def __str__(self):
        return self.athlete.name


class Player(models.Model):  # Inherit from models.Model
    name = models.CharField(max_length=100)
    email = models.EmailField(max_length=100)
    game = models.ForeignKey(Game, on_delete=models.CASCADE, default=None)
    runnners = models.ManyToManyField(
        Runner, related_name='name_runner', default=None, blank=True)

    # team ınde olan userlerin id lerini ekleyceğim

    def __str__(self):
        return self.name

    class Meta:
        # Ensure game and email are unique together
        unique_together = ('game', 'email')


class Parkour():
    def __init__(self, parkour_name: str, parkour_distance: float, parkour_elevation: float):
        self.parkour_name = parkour_name
        self.parkour_distance = parkour_distance
        self.parkour_elevation = parkour_elevation
        self.runners = list[Runner]
