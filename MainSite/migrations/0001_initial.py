# Generated by Django 5.1.2 on 2024-11-25 20:11

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AccountInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user_name', models.CharField(max_length=20)),
                ('password', models.CharField(max_length=50)),
                ('email', models.CharField(max_length=65)),
            ],
        ),
        migrations.CreateModel(
            name='GameInstance',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('game_board', models.CharField(max_length=1000)),
            ],
        ),
    ]