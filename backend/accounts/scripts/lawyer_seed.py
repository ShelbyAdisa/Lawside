import random
from django.utils import timezone
from faker import Faker

from accounts.models import CustomUser
from lawyers.models import Lawyer, LawyerAvailability
from practice_areas.models import PracticeArea

def run():
    fake = Faker()

    # Define your specific practice areas
    your_practice_areas = [
        ("Family Law", "Deals with family matters and domestic relations."),
        ("Criminal Law", "Concerns crimes and punishment."),
        ("Employment Law", "Covers rights and obligations in the workplace."),
        ("Personal Injury", "Deals with legal claims from injuries."),
        ("Real Estate", "Focuses on land, property, and real estate transactions."),
        ("Business Law", "Covers company formation and business operations."),
        ("Immigration", "Handles visas, residency, and citizenship."),
        ("Estate Planning", "Involves wills, trusts, and asset planning."),
    ]

    # Create or update PracticeAreas
    print("Ensuring all practice areas exist...")
    for name, desc in your_practice_areas:
        PracticeArea.objects.get_or_create(name=name, defaults={'description': desc})

    all_practice_areas = list(PracticeArea.objects.all())

    # Generate fake lawyers
    NUM_LAWYERS = 10
    PASSWORD = "testpass123"
    print("\nCreating lawyers...\n")

    for i in range(NUM_LAWYERS):
        first_name = fake.first_name()
        last_name = fake.last_name()
        email = f"{first_name.lower()}.{last_name.lower()}@example.com"

        if CustomUser.objects.filter(email=email).exists():
            print(f"⚠️ Skipping existing user: {email}")
            continue

        # Create user account
        user = CustomUser.objects.create_user(
            email=email,
            password=PASSWORD,
            first_name=first_name,
            last_name=last_name,
            user_type="lawyer"  # make sure this field is supported by your model
        )

        # Create lawyer profile
        lawyer = Lawyer.objects.create(
            user=user,
            license_number=fake.unique.bothify(text='LW#######'),
            bar_admission_date=fake.date_between(start_date='-15y', end_date='-1y'),
            years_of_experience=random.randint(1, 15),
            biography=fake.paragraph(nb_sentences=5),
            education=f"{fake.company()} Law School, {random.randint(2005, 2020)}",
            certifications="Certified Legal Practitioner",
            hourly_rate=round(random.uniform(100, 350), 2),
            consultation_fee=round(random.uniform(50, 150), 2),
            office_address=fake.address(),
            languages_spoken=random.choice(["English", "English, Swahili", "English, French"]),
            average_rating=round(random.uniform(3.0, 5.0), 2),
            total_reviews=random.randint(0, 150),
            is_available=True,
        )

        # Assign 1–3 practice areas
        lawyer.practice_areas.set(random.sample(all_practice_areas, random.randint(1, 3)))

        # Set 2 availability slots
        days = random.sample(['monday', 'tuesday', 'wednesday', 'thursday', 'friday'], 2)
        for day in days:
            LawyerAvailability.objects.create(
                lawyer=lawyer,
                day_of_week=day,
                start_time=timezone.datetime.strptime("09:00", "%H:%M").time(),
                end_time=timezone.datetime.strptime("17:00", "%H:%M").time(),
                is_available=True
            )

        # Print login info
        print(f"👨‍⚖️ {first_name} {last_name} | {email} | password: {PASSWORD}")

    print("\n✅ Seeding complete.")
