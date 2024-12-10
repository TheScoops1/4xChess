from django.db import models
import datetime
import uuid6

# Create your models here.


class AccountInfo(models.Model):
    user_name = models.CharField(max_length=20)
    password = models.CharField(max_length=50)
    email = models.CharField(max_length=65)
    # session_id is a UUID6
    user_id = models.CharField(max_length=50)
    # account_status will be either bse, pre, pro,
    account_status = models.CharField(max_length=3, db_default="bse")
    date_created = models.DateTimeField(db_default=datetime.datetime.now())

    def __str__(self):
        return self.user_name

    def return_all_info(self):
        return self.user_name, self.user_id, self.email, self.account_status


class GameSession(models.Model):
    game_board = models.JSONField()
    game_session_json = models.CharField(max_length=1000)
    last_player = models.IntegerField()
    player_zero_points = models.IntegerField(db_default=0)
    player_one_points = models.IntegerField(db_default=0)
    # session_id is a UUID6
    game_session_id = models.CharField(max_length=10, db_default=uuid6.uuid6())
    date_time_deleted = models.DateTimeField("date time deleted")
    last_activity = models.DateTimeField(
        "last activity", db_default=datetime.datetime.now()
    )


class LoginSession(models.Model):
    # session_id is a UUID6
    session_id = models.CharField(max_length=50)
    user_id = models.CharField(db_default=0, max_length=50)
    last_activity_tracker = models.DateTimeField(" last activity")
    date_created = models.DateTimeField("date created")
    date_time_deleted = models.DateTimeField(
        "date time deleted", db_default=datetime.datetime.now()
    )
