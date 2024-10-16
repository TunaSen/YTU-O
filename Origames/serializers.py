from rest_framework import serializers
from Origames.models import Game, Runner, Player
from .models import Gender


class GameListSerializer(serializers.ModelSerializer):
    creator = serializers.SerializerMethodField()

    class Meta:
        model = Game
        fields = ['id', 'name', 'date', 'description', 'creator', 'status']

    def get_creator(self, obj):
        return f"{obj.creator.user.first_name} {obj.creator.user.last_name}"


class GameSerializer(serializers.ModelSerializer):
    creator = serializers.SerializerMethodField()
    players = serializers.SerializerMethodField()
    runners = serializers.SerializerMethodField()

    class Meta:
        model = Game
        fields = ['id', 'name', 'date', 'description',
                  'creator', 'runners', 'players', 'activity', 'max_coin', 'status']

    def get_creator(self, obj):
        return f"{obj.creator.user.first_name} {obj.creator.user.last_name}"

    def get_runners(self, obj):
        return [
            {
                "id": p.id,
                "name": p.athlete.name,
                "cost": p.athlete.cost,
                "gender": "male" if p.athlete.gender == Gender.MALE else "female"
            }
            for p in Runner.objects.filter(game=obj.id).order_by('athlete__cost')
        ]

    def get_players(self, obj):
        return [
            {
                "name": p.name,
            }
            for p in Player.objects.filter(game=obj.id)
        ]
