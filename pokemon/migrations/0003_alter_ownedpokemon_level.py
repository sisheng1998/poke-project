# Generated by Django 4.1.1 on 2022-09-16 01:47

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pokemon', '0002_alter_pokemon_name_alter_pokemon_type_ownedpokemon'),
    ]

    operations = [
        migrations.AlterField(
            model_name='ownedpokemon',
            name='level',
            field=models.IntegerField(validators=[django.core.validators.MinValueValidator(1), django.core.validators.MaxValueValidator(100)]),
        ),
    ]
