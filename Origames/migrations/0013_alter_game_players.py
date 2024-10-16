# Generated by Django 5.0.7 on 2024-08-25 13:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Origames', '0012_alter_runner_time'),
    ]

    operations = [
        migrations.AlterField(
            model_name='game',
            name='players',
            field=models.ManyToManyField(blank=True, null=True, related_name='games_as_player', to='Origames.player'),
        ),
    ]
