from django.urls import path

from . import views

urlpatterns = [
    path("game_page/", views.game_page, name="game_page"),
    path("account_creation/", views.account_creator_page, name="account_creation"),
    path("create_account/", views.account_creation_url, name="account_creator"),
    path("", views.main_page, name="main_page"),
]
