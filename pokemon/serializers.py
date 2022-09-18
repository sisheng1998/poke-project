from rest_framework import serializers
from .models import Pokemon, OwnedPokemon

class PokemonSerializer(serializers.ModelSerializer):
  class Meta:
    model = Pokemon
    fields = '__all__'

class OwnedPokemonSerializer(serializers.ModelSerializer):
  class Meta:
    model = OwnedPokemon
    fields = '__all__'