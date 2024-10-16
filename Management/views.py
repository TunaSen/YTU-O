from django.contrib.auth.decorators import login_required
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .auth import EmailBackend
from django.shortcuts import render
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import api_view
from Management.utils import DefaultGetQuerysetMixin
from .serializers import ProfileSerializer
from .models import Profile
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, permission_classes
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import get_authorization_header
from django.shortcuts import get_object_or_404

from .models import Profile
from .serializers import ProfileSerializer
# Create your views here.


class ProfileView(DefaultGetQuerysetMixin, ModelViewSet):
    # Filter profiles with confirmed=True
    serializer_class = ProfileSerializer
    model = Profile


@api_view(['POST'])
def signup(request):
    data = request.data

    if User.objects.filter(email=data['email']).exists():
        return Response({'error': 'User already exists.'}, status=status.HTTP_409_CONFLICT)

    user = User.objects.create_user(
        username=data['email'].split("@")[0],
        email=data['email'],
        password=data['password'],
        first_name=data['name'],
        last_name=data['surname']
    )

    Profile.objects.create(user=user)

    token, _ = Token.objects.get_or_create(user=user)

    return Response({'token': token.key}, status=status.HTTP_201_CREATED)


@api_view(['POST'])
def signin(request):
    print("Burada", request.data)
    backend = EmailBackend()
    user = backend.authenticate(
        email=request.data['email'], password=request.data['password'])
    if user is not None:
        token, _ = Token.objects.get_or_create(user=user)
        profile = Profile.objects.get(user=user)
        serializedProfile = ProfileSerializer(profile)
        return Response({'token': token.key, 'profile': serializedProfile.data}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def profile_detail(request, pk):
    try:
        profile = Profile.objects.get(pk=pk)
    except Profile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ProfileSerializer(profile)
    return Response(serializer.data)


@api_view(['POST'])
def profile_update(request):
    """ Validate the token to check if it is still valid. """
    auth_header = request.headers.get('Authorization')
    print("header ", auth_header)
    if auth_header:
        # Get the token part from "Bearer <token>"
        token = auth_header.split(' ')[1]

        try:
            # Check if the token is valid
            user = TokenAuthentication().authenticate_credentials(token)
            print("user ", user)
            profile = Profile.objects.get(user=user[0])
            print(request.data)
            profile = ProfileSerializer.update(
                instance=profile, validated_data=request.data)

            serilaizer = ProfileSerializer(profile)
            print({'profile': serilaizer.data})

            return JsonResponse({'profile': serilaizer.data})
        except Exception as e:
            print(e)
            return JsonResponse({'valid': False}, status=401)
    return JsonResponse({'valid': False}, status=401)


@api_view(['DELETE'])
def profile_delete(request, pk):
    try:
        profile = Profile.objects.get(pk=pk)
    except Profile.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    profile.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET'])
def validate_token(request):
    """ Validate the token to check if it is still valid. """
    auth_header = request.headers.get('Authorization')
    if auth_header:
        # Get the token part from "Bearer <token>"
        token = auth_header.split(' ')[1]
        print("sonmuccc ", TokenAuthentication().authenticate_credentials(token)
              )

        try:
            # Check if the token is valid
            TokenAuthentication().authenticate_credentials(token)
            return JsonResponse({'valid': True})
        except Exception:

            return JsonResponse({'valid': False}, status=401)
    return JsonResponse({'valid': False}, status=401)
