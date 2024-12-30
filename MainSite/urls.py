from django.urls import path

from . import views

urlpatterns = [
    path("account_creation/", views.account_creator_page, name="account_creation"),
    path("create_account/", views.account_creation_url, name="account_creator"),
    path("account_login/", views.account_login, name="account_login"),
    path("account_login/login_check", views.account_login_check, name="login_check"),
    path("<uuid:session_token>/", views.main_page, name="login_success"),
    path("<uuid:session_token>/game_page/", views.game_page, name="game_page"),
    path(
        "<uuid:session_token>/account_settings/", views.main_page, name="login_settings"
    ),
    path("<uuid:session_token>/test/", views.test, name="ajaxtest"),
    path(
        "<uuid:session_token>/gather_game_session/",
        views.test_get_game_session_info,
        name="gather_game_session",
    ),
    path(
        "<uuid:session_token>/create_game_session/",
        views.game_board_create,
        name="create_game_board",
    ),
    path(
        "<uuid:session_token>/update_game_board/",
        views.game_board_update,
        name="update_game_board",
    ),
    path("", views.landing_page, name="landing_page"),
]
