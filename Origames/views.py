from django.shortcuts import render

# Create your views here.
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import api_view

from django.http import HttpResponse, JsonResponse
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Count
from Origames.models import *

import asyncio

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
import asyncio
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import api_view
from Origames.utils import DefaultGetQuerysetMixin
from Origames.serializers import *


# views.py
class GameListView(DefaultGetQuerysetMixin, ModelViewSet):
    serializer_class = GameListSerializer
    model = Game
    order_by = ['-date']


class GameView(DefaultGetQuerysetMixin, ModelViewSet):
    serializer_class = GameSerializer
    model = Game


@api_view(['POST'])
def scraping(request):
    url = request.data.get("url")

    scraper = Scraper(url)

    asyncio.to_thread(scraper.scrape())

    return Response("Started", status=status.HTTP_200_OK)


@api_view(["POST"])
def add_player(request, pk):

    # Get the game object by ID
    game = Game.objects.get(id=pk)

    # Retrieve runner IDs from request data
    team_ids = request.data.get("team", [])
    runners = Runner.objects.filter(id__in=[i["id"] for i in team_ids])
    player = Player.objects.filter(
        email=request.data.get("email"), game=game).first()
    if player:
        player.name = request.data.get("name")
        player.runnners.set(runners)

    # Get or create the player instance
    else:
        player = Player.objects.create(
            name=request.data.get("name"),
            email=request.data.get("email"),
            game=game)
        player.runnners.set(runners)

    player.save()
    return Response("Eklendi")

    # Associate runners with the player using set() method
    # Use the correct field name for the many-to-many relationship
