# clear_lawyers.py
from accounts.models import CustomUser
from lawyers.models import Lawyer

Lawyer.objects.all().delete()
CustomUser.objects.filter(is_lawyer=True).delete()

print("✅ Cleared all lawyer profiles and users.")
