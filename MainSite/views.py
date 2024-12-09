from passlib.hash import pbkdf2_sha256
import uuid6

from django.shortcuts import render

from .forms import AccountCreationForm, AccountLoginForm

# Create your views here.
from .models import LoginSession, GameSession, AccountInfo


def main_page(request):
    return render(request, "MainSite/main_page.html")


def game_page(request):
    return render(request, "MainSite/game_page.html")


def account_creator_page(request):
    context = {}
    context["form"] = AccountCreationForm()
    return render(request, "MainSite/account_creation.html", context)


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

    return render(request, "MainSite/account_created.html")


def account_login(request):
    context = {}
    context["form"] = AccountLoginForm()
    return render(request, "MainSite/login_page.html", context)


def session_token_generation(request):
    if request.method == "POST":
        form = AccountLoginForm(request.POST)

        print(form)
        if form.is_valid():
            form_data = form.cleaned_data
            login_check = True
            for data_point in form_data:
                print(data_point)
