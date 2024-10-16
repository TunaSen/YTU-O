from django.db import models
from django.contrib.auth.models import User
from enum import IntEnum


class Role(IntEnum):
    ADMIN = 0
    EDITOR = 1
    VIEWER = 2

    @classmethod
    def choices(cls):
        return [(key.value, key.name) for key in cls]


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=100, blank=True, null=True)
    birth_date = models.DateField(blank=True, null=True)
    club = models.CharField(max_length=100, blank=True, null=True)
    role = models.IntegerField(choices=Role.choices(), default=Role.VIEWER)
    profile_picture = models.ImageField(
        upload_to='profile_pics/', blank=True, null=True)
    confirmed = models.BooleanField(default=False)

    # JSON veya başka bir formatta depolayabilirsiniz

    def __str__(self):
        return f'{self.user.username} Profile'
