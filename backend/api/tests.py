from django.test import TestCase
from models import Task

all_objects = Task.objects.all()
for obj in all_objects:
    print(obj.complete)
# Create your tests here.
