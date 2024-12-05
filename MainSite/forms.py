from django import forms


class AccountForm(forms.Form):
    email = forms.EmailField(label="email")
    user_name = forms.CharField()
    password = forms.CharField()
