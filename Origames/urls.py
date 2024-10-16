from django.urls import path
from .views import *

app_name = 'Origames'


urlpatterns = [
    path('games/', GameListView.as_view({'get': 'list', 'post': 'create'})),
    path('games/<int:pk>/',
         GameView.as_view({'get': 'retrieve', 'put': 'partial_update'})),

    path('scrape/', scraping),
    path('games/submit/<int:pk>/', add_player)


]
