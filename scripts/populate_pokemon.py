import csv
from pokemon.models import Pokemon

def run():
  with open('pokemon.csv') as file:
    reader = csv.reader(file)

    Pokemon.objects.all().delete()

    for row in reader:
      print(row)

      pokemon = Pokemon(name=row[0],hp=row[1],attack=row[2],defense=row[3],type=row[4])

      pokemon.save()