from django.urls import path
from .views import unownedPokemon, myPokemon,allPokemon, addPokemon, releasePokemon

urlpatterns = [
  path('unownedpokemon/', unownedPokemon),
  path('mypokemon/', myPokemon),
  path('allpokemon/', allPokemon),
  path('addpokemon/', addPokemon),
  path('releasepokemon/', releasePokemon),
]
