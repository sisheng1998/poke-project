# Poke Project

A full stack web application using ReactJS + Django. Allow user to sign up, login, view captured pokemon, pokedex and catch pokemon.

## Tech Stack

#### Frontend

- ReactJS
- TypeScript
- Redux Toolkit
- TailwindCSS

#### Backend

- Django
- Djoser
- Django Rest Framework
- Django Rest Framework - Simple JWT

## Instruction

In order to test out this project, follow these steps:

- Clone the repository
- Run: cd frontend
- Run: npm install, this will install the required frontend packages
- Run: npm run build, this will make the production ReactJS build folder
- Run: cd ..
- Run: python -m venv venv
- Run: venv/scripts/activate, this will activate the virtual environment
- Run: pip install -r requirements.txt
- Run: python manage.py makemigrations
- Run: python manage.py migrate
- Run: python manage.py runscript populate_pokemon, this will import all pokemon from pokemon.csv to the database
- Run: python manage.py runserver
- Enjoy!
