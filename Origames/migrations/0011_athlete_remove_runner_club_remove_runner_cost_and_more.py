# Generated by Django 5.0.7 on 2024-08-24 09:35

import Origames.models
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Origames', '0010_alter_game_creator'),
    ]

    operations = [
        migrations.CreateModel(
            name='Athlete',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('email', models.EmailField(blank=True, max_length=100)),
                ('club', models.CharField(max_length=100)),
                ('cost', models.IntegerField(default=0)),
                ('gender', models.IntegerField(choices=[(0, 'MALE'), (1, 'FEMALE')], default=Origames.models.Gender['MALE'])),
            ],
        ),
        migrations.RemoveField(
            model_name='runner',
            name='club',
        ),
        migrations.RemoveField(
            model_name='runner',
            name='cost',
        ),
        migrations.RemoveField(
            model_name='runner',
            name='email',
        ),
        migrations.RemoveField(
            model_name='runner',
            name='gender',
        ),
        migrations.RemoveField(
            model_name='runner',
            name='name',
        ),
        migrations.AddField(
            model_name='runner',
            name='time',
            field=models.TimeField(default=None),
        ),
        migrations.AddField(
            model_name='runner',
            name='athlete',
            field=models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, to='Origames.athlete'),
        ),
    ]
