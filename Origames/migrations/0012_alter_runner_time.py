# Generated by Django 5.0.7 on 2024-08-24 09:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Origames', '0011_athlete_remove_runner_club_remove_runner_cost_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='runner',
            name='time',
            field=models.DurationField(default=None),
        ),
    ]
