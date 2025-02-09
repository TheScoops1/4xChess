# Generated by Django 5.1.2 on 2024-11-28 00:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('MainSite', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='GameSession',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('game_board', models.JSONField()),
                ('game_session_json', models.CharField(max_length=1000)),
                ('last_player', models.IntegerField()),
                ('player_zero_points', models.IntegerField(db_default=0)),
                ('player_one_points', models.IntegerField(db_default=0)),
                ('game_session_id', models.CharField(max_length=10)),
            ],
        ),
        migrations.CreateModel(
            name='LoginSession',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('session_id', models.CharField(max_length=23)),
                ('uid_for_session', models.IntegerField(db_default=0)),
                ('last_activity_tracker', models.DateTimeField(verbose_name=' last activity')),
                ('date_created', models.DateTimeField(verbose_name='date created')),
            ],
        ),
        migrations.DeleteModel(
            name='GameInstance',
        ),
        migrations.AddField(
            model_name='accountinfo',
            name='user_id',
            field=models.IntegerField(db_default=0),
        ),
    ]
