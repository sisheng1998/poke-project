from django.core.validators import MinValueValidator, MaxValueValidator
from django.db import models
from users.models import User

class Pokemon(models.Model):
  name = models.CharField(max_length=255)
  hp = models.IntegerField()
  attack = models.IntegerField()
  defense = models.IntegerField()
  type = models.CharField(max_length=255)

  def __str__(self):
    return self.name

class OwnedPokemon(models.Model):
  level = models.IntegerField(validators=[MinValueValidator(1), MaxValueValidator(100)])
  pokemon = models.ForeignKey(Pokemon, on_delete=models.CASCADE)
  owner = models.ForeignKey(User, on_delete=models.CASCADE)
  captured_at = models.DateTimeField(auto_now_add=True)
