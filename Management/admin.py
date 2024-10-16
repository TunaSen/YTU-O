from django.contrib import admin
from .models import Profile
from django.utils.safestring import mark_safe


class ProfileAdmin(admin.ModelAdmin):
    list_display = ['user_name', 'user_email',
                    'location', 'birth_date', 'profile_picture']

    def user_name(self, obj):
        return obj.user.username

    def user_email(self, obj):
        return obj.user.email

    def profile_picture_tag(self, obj):
        if obj.profile_picture:
            return mark_safe('<img src="%s" width="100" height="100" />' % obj.profile_picture.url)
        return 'No Image'
    profile_picture_tag.short_description = 'Profile Picture'

    user_name.short_description = 'Username'
    user_email.short_description = 'Email'


admin.site.register(Profile, ProfileAdmin)
