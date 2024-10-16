from django.urls import path
from .views import *

app_name = 'Management'


urlpatterns = [
    path('profile/', ProfileView.as_view({'get': 'list', 'post': 'create'})),
    path('auth/signup/', signup, name='signup'),
    path('auth/signin/', signin, name='signin'),
    path('auth/validate/', validate_token),
    path('profile/<int:pk>/', profile_detail, name='profile-detail'),
    path('profile/update/', profile_update, name='profile-update'),
    path('profile/delete/', profile_delete, name='profile-delete'),


]
