from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

class Task(models.Model):
    title = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)
    task_date = models.DateTimeField(default=datetime.now)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="notes")
    complete = models.BooleanField(default=False)

    def __str__(self):
        return self.title 

