# Application backend "Passion Lecture"

Le but de cette application backend est de fournir une API REST pour permettre la gestion du site "Passion lecture".

## Définition des routes

| Verbe HTTP | URI                        | JSON                                      | Description                                       |
| ---------- | -------------------------- | ----------------------------------------- | ------------------------------------------------- |
| GET        | /api/books/                |                                           | Obtenir la liste des livres                       |
| GET        | /api/books/:id/            |                                           | Obtenir un livre                                  |
| GET        | /api/books/:id/comments/   |                                           | Obtenir tous les commentaires d'un livre          |
| GET        | /api/books/:id/notes/      |                                           | Obtenir toutes les notes d'un livre               |
| POST       | /api/books/                | { title: '', numberOfPages: '', etc}      | Ajouter un nouveau livre avec catégorie et auteur |
| POST       | /api/books/:id/comments/   | { comment: ''}                            | Commenter un livre                                |
| POST       | /api/books/:id/notes/      | { note: ''}                               | Evaluer un livre                                  |
| PUT        | /api/books/:id/            | { title: '', numberOfPages: '', etc}      | Modifier un livre                                 |
| DELETE     | /api/books/:id/            |                                           | Supprimer un livre                                |
| GET        | /api/categories/           |                                           | Obtenir la liste des catégories                   |
| GET        | /api/categories/:id        |                                           | Obtenir une catégorie                             |
| GET        | /api/categories/:id/books/ |                                           | Obtenir tous les livres de cette catégorie        |
| GET        | /api/authors/              |                                           | Obtenir la liste des auteurs                      |
| GET        | /api/authors/:id/          |                                           | Obtenir un auteur                                 |
| GET        | /api/authors/:id/books/    |                                           | Obtenir tous les livres de cet auteur             |
| GET        | /api/users/:id/books/      |                                           | Obtenir tous les livres d'un utilisateur          |
| POST       | /api/login/                | { "username": "etml", "password": "etml"} | S'authentifier pour obtenir un token              |

## Utilisateur et rôle

Un utilisateur non authentifié peut :

- voir la homepage
- rechercher des livres et filtrer les livres par catégorie

Un utilisateur authentifié (qui n'a pas le rôle admin) peut :

- ajouter un nouveau livre
- modifier <strong>ses</strong> livres
- supprimer <strong>ses</strong> livres
- commenter et évaluer les livres (ajoutés par les autres utilisateurs)

Remarques :

- Un utilisateur authentifié ne peut commenter qu'une fois un livre
- Un utilisateur authentifié ne peut évaluer qu'une fois un livre

Un utilisateur ayant le rôle admin peut tout faire sur l'application.

## Jeton JWT des différents utilisateurs

| username | token                                                                                                                                                                |
| -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| user1    | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MDczNzc2NjksImV4cCI6MTczODkzNTI2OX0.TFfSqdT9M2QqJxqgLROuXFIbTfBtYV8B2Vl4Gmeb7EI |
| user2    | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MDczNzc3MTIsImV4cCI6MTczODkzNTMxMn0.h0Tg2EpJXJXJyxwQ8QGbzxoGZC4h1uF5RmrYcCE6_Zc |
| user3    | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MDczNzc3MzAsImV4cCI6MTczODkzNTMzMH0.tZjTl_MzOZOrI8QGlew7v0iOqLnWwnU9DDOqSI6rctc |
| admin    | eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImlzQWRtaW4iOnRydWUsImlhdCI6MTcwNzM3Nzc1NCwiZXhwIjoxNzM4OTM1MzU0fQ.\_TFQMi1Yz3fIAK29ZbzLpBN6K4AnlDh7Mokf6bK_X4Y |
