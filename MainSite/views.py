from django.shortcuts import render

from .forms import AccountForm

# Create your views here.
from .models import LoginSession, GameSession, AccountInfo


def main_page(request):
    return render(request, "MainSite/main_page.html")


def game_page(request):
    return render(request, "MainSite/game_page.html")


def account_creator_page(request):
    context = {}
    context["form"] = AccountForm()
    return render(request, "MainSite/account_creation.html", context)


def account_creation_url(request):
    if request.method == "POST":
        form = AccountForm(request.POST)
        print(form)
        if form.is_valid():
            new_account = AccountInfo()
            print(form[id_user_name])

    return render(request, "MainSite/account_created.html")


def account_login(request):
    return render(request, "MainSite/account_creation.html")
