# Generated by Django 5.0.7 on 2024-09-09 18:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Management', '0007_profile_profile_picture'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='confirmed',
            field=models.BooleanField(default=False),
        ),
    ]
