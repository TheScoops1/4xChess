# Generated by Django 5.1.2 on 2024-12-14 15:31

import datetime
import uuid
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MainSite', '0009_gamesession_player_login_session_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='accountinfo',
            name='date_created',
            field=models.DateTimeField(db_default=datetime.datetime(2024, 12, 14, 15, 31, 28, 867311)),
        ),
        migrations.AlterField(
            model_name='gamesession',
            name='date_time_created',
            field=models.DateTimeField(db_default=datetime.datetime(2024, 12, 14, 15, 31, 28, 874861), verbose_name='date time created'),
        ),
        migrations.AlterField(
            model_name='gamesession',
            name='date_time_deleted',
            field=models.DateTimeField(db_default=datetime.datetime(2024, 12, 14, 15, 31, 28, 874841), verbose_name='date time deleted'),
        ),
        migrations.AlterField(
            model_name='gamesession',
            name='date_time_ended',
            field=models.DateTimeField(db_default=datetime.datetime(2024, 12, 14, 15, 31, 28, 874867), verbose_name='date time ended'),
        ),
        migrations.AlterField(
            model_name='gamesession',
            name='game_board',
            field=models.CharField(max_length=200),
        ),
        migrations.AlterField(
            model_name='gamesession',
            name='game_session_id',
            field=models.CharField(db_default=uuid.UUID('1efba307-ceb0-643e-9dd2-584c5af08e15'), max_length=10),
        ),
        migrations.AlterField(
            model_name='gamesession',
            name='last_activity',
            field=models.DateTimeField(db_default=datetime.datetime(2024, 12, 14, 15, 31, 28, 874854), verbose_name='last activity'),
        ),
        migrations.AlterField(
            model_name='loginsession',
            name='date_time_created',
            field=models.DateTimeField(db_default=datetime.datetime(2024, 12, 14, 15, 31, 28, 875124), verbose_name='date created'),
        ),
        migrations.AlterField(
            model_name='loginsession',
            name='date_time_deleted',
            field=models.DateTimeField(db_default=datetime.datetime(2024, 12, 14, 15, 31, 28, 875130), verbose_name='date time deleted'),
        ),
        migrations.AlterField(
            model_name='loginsession',
            name='last_activity_tracker',
            field=models.DateTimeField(db_default=datetime.datetime(2024, 12, 14, 15, 31, 28, 875114), verbose_name=' last activity'),
        ),
    ]