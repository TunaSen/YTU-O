# Generated by Django 5.0.7 on 2024-08-24 09:53

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Management', '0005_alter_profile_permissions'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='permissions',
        ),
    ]
