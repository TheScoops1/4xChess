from django.urls import path

from . import views

urlpatterns = [
    path("account_creation/", views.account_creator_page, name="account_creation"),
    path("create_account/", views.account_creation_url, name="account_creator"),
    path("account_login/", views.account_login, name="account_login"),
    path("account_login/login_check/", views.account_login_check, name="login_check"),
    path("<uuid:session_token>/", views.main_page, name="login_success"),
    path("<uuid:session_token>/game_page/", views.game_page, name="game_page"),
    path(
        "<uuid:session_token>/account_settings/", views.main_page, name="login_settings"
    ),
    path(
        "<uuid:session_token>/<str:game_board>/",
        views.game_board_update,
        name="game_board_update",
    ),
    path("", views.landing_page, name="landing_page"),
]
