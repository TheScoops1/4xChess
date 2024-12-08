from django import forms


class AccountLoginForm(forms.Form):
    user_name = forms.CharField()
    password = forms.CharField()


class AccountCreationForm(forms.Form):
    email = forms.EmailField(label="email")
    user_name = forms.CharField()
    password = forms.CharField()
