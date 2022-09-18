from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Pokemon, OwnedPokemon
from .serializers import PokemonSerializer, OwnedPokemonSerializer

@api_view(['GET'])
def unownedPokemon(request):
  current_user = request.user

  ownedPokemon = OwnedPokemon.objects.filter(owner=current_user.id).values_list('pokemon', flat=True)
  ownedPokemonList = [*set(list(ownedPokemon))]
  
  pokemon = Pokemon.objects.exclude(id__in=ownedPokemonList)
  serializer = PokemonSerializer(pokemon, many=True)
  
  return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def myPokemon(request):
  current_user = request.user
  pokemon = OwnedPokemon.objects.filter(owner=current_user.id)
  serializer = OwnedPokemonSerializer(pokemon, many=True)
  
  return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def allPokemon(request):
  pokemon = Pokemon.objects.all()
  serializer = PokemonSerializer(pokemon, many=True)
  
  return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
def addPokemon(request):
  serializer = OwnedPokemonSerializer(data=request.data)
  if serializer.is_valid():
    serializer.save()
    return Response(serializer.data, status=status.HTTP_201_CREATED)
  else:
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  

@api_view(['POST'])
def releasePokemon(request):
  current_user = request.user
  data = request.data

  pokemon = get_object_or_404(OwnedPokemon, id=data['id'], owner=current_user.id)
  pokemon.delete()

  return Response({}, status=status.HTTP_200_OK)
  