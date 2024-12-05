from django.contrib import admin

# Register your models here.

from .models import AccountInfo, GameSession, LoginSession

admin.site.register(AccountInfo)
admin.site.register(LoginSession)
admin.site.register(GameSession)
