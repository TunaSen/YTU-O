# Generated by Django 5.0.7 on 2024-09-25 22:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Origames', '0021_alter_player_runnner'),
    ]

    operations = [
        migrations.RenameField(
            model_name='player',
            old_name='runnner',
            new_name='runnners',
        ),
    ]
