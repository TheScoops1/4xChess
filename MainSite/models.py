from django.db import models

# Create your models here.


class AccountInfo(models.Model):
    user_name = models.CharField(max_length=20)
    password = models.CharField(max_length=50)
    email = models.CharField(max_length=65)
    # user_id looks like 2024072809090
    user_id = models.IntegerField(db_default=0)
    # account_status will be either bse, pre, pro,
    account_status = models.CharField(max_length=3, db_default="bse")

    def __str__(self):
        return self.user_name


class GameSession(models.Model):
    game_board = models.JSONField()
    game_session_json = models.CharField(max_length=1000)
    last_player = models.IntegerField()
    player_zero_points = models.IntegerField(db_default=0)
    player_one_points = models.IntegerField(db_default=0)
    # starts @ AAAAAAAAAA
    game_session_id = models.CharField(max_length=10)
    date_time_deleted = models.DateTimeField("date time deleted")


class LoginSession(models.Model):
    # session_id starts @ user_id + AAAAAAAAAA
    session_id = models.CharField(max_length=23)
    uid_for_session = models.IntegerField(db_default=0)
    last_activity_tracker = models.DateTimeField(" last activity")
    date_created = models.DateTimeField("date created")
    date_time_deleted = models.DateTimeField("date time deleted")
