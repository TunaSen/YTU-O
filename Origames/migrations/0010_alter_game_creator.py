# Generated by Django 5.0.7 on 2024-08-24 07:59

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Management', '0002_profile'),
        ('Origames', '0009_game_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='creator',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='created_games', to='Management.profile'),
        ),
    ]
