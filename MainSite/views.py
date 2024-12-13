from sys import exception
from passlib.hash import pbkdf2_sha256
import uuid6
import datetime

from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse

# importing the forms for any user input
from .forms import AccountCreationForm, AccountLoginForm

# importing the databse models
from .models import LoginSession, GameSession, AccountInfo


def main_page(request, session_token):
    return render(request, "MainSite/main_page.html")


def landing_page(request):
    return render(request, "MainSite/main_page.html")


def game_page(request, session_token):
    new_game = GameSession()
    return render(request, "MainSite/game_page.html")


def account_creator_page(request):
    context = {}
    context["form"] = AccountCreationForm()
    return render(
        request, "MainSite/AccountCreationFiles/account_creation.html", context
    )


def account_creation_url(request):
    if request.method == "POST":
        form = AccountCreationForm(request.POST)
        print(form)
        if form.is_valid():
            form_data = form.cleaned_data
            new_account = AccountInfo()
            new_account.email = form_data["email"]
            new_account.user_name = form_data["user_name"]
            new_account.password = pbkdf2_sha256.hash(form_data["password"])
            new_account.user_id = uuid6.uuid6()
            print(new_account.user_name, new_account.email, new_account.password)
            new_account.save()

    # return HttpResponseRedirect(reverse('account_login', args=()))
    return render(request, "MainSite/AccountCreationFiles/account_created.html")


def account_login(request):
    context = {}
    context["form"] = AccountLoginForm()
    return render(request, "MainSite/LoginFiles/login_page.html", context)


def account_login_check(request):
    context = {}
    context["form"] = AccountLoginForm()
    if request.method == "POST":
        form = AccountLoginForm(request.POST)
        if form.is_valid():
            form_data = form.cleaned_data
            try:
                user = AccountInfo.objects.get(user_name=form_data["user_name"])
                password_check = pbkdf2_sha256.verify(
                    form_data["password"], user.password
                )
                if password_check:
                    new_session = LoginSession()
                    new_session.user_id = user.user_id
                    new_session.session_id = uuid6.uuid6()
                    new_session.last_activity_tracker = datetime.datetime.now()
                    new_session.date_created = datetime.datetime.now()
                    new_session.save()

                    return HttpResponseRedirect(
                        reverse("login_success", args=(new_session.session_id,))
                    )
            except exception as e:
                return render(
                    request,
                    "MainSite/LoginFiles/login_page_failed_login.html",
                    context,
                )
            else:
                return render(
                    request,
                    "MainSite/LoginFiles/login_page_failed_login.html",
                    context,
                )


def game_board_update(request):
    game_to_update = GameSession.objects.all()
    pass
