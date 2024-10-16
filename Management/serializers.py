from urllib import request
from rest_framework import serializers

from Origames.models import *


from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()  # Nesting the UserSerializer

    class Meta:
        model = Profile
        fields = '__all__'

    def update(instance, validated_data):
        """
        Update and return an existing `Profile` instance, given the validated data.
        """

        instance.bio = validated_data.get('bio', instance.bio)
        instance.location = validated_data.get('location', instance.location)
        instance.birth_date = validated_data.get(
            'birthday', instance.birth_date)
        instance.club = validated_data.get('club', instance.club)

        instance.profile_picture = validated_data.get(
            'profileImage', instance.profile_picture)

        instance.save()  # Save the updated profile to the database
        print(instance.location, validated_data.get(
            'location', instance.location))
        return instance
