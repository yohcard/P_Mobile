import { Sequelize, DataTypes } from "sequelize";
import bcrypt from "bcrypt";
import axios from "axios"; // Pour l'importation des données depuis l'API Express
import path from "path";

// Import des modèles Sequelize
import { BookModel } from "../models/books.mjs";
import { AuthorModel } from "../models/authors.mjs";
import { CategoryModel } from "../models/categories.mjs";
import { UserModel } from "../models/users.mjs";
import { CommentModel } from "../models/comments.mjs";
import { NoteModel } from "../models/notes.mjs";

// Mocks de données pour l'import initial
import { users } from "./mock-user.mjs";

// Connexion à la base de données MySQL
const sequelize = new Sequelize(
  "db_passion_lecture", // Nom de la DB qui doit exister
  "root", // Nom de l'utilisateur
  "root", // Mot de passe de l'utilisateur
  {
    host: "localhost",
    dialect: "mysql",
    port: 6033,
    logging: false, // Désactive les logs SQL
  }
);

// Définition des modèles Sequelize
const Book = BookModel(sequelize, DataTypes);
const Author = AuthorModel(sequelize, DataTypes);
const Category = CategoryModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);
const Comment = CommentModel(sequelize, DataTypes);
const Note = NoteModel(sequelize, DataTypes);

// Définition des associations entre les modèles
Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Fonction pour importer les utilisateurs depuis les mocks de données
const importUsers = async () => {
  try {
    for (const user of users) {
      const hash = await bcrypt.hash(user.password, 10); // temps pour hasher = du sel
      await User.create({
        username: user.username,
        password: hash,
        isAdmin: user.isAdmin,
      });
    }
    console.log("Tous les utilisateurs ont été importés avec succès.");
  } catch (error) {
    console.error("Erreur lors de l'importation des utilisateurs :", error);
  }
};

const initDb = async () => {
  try {
    await sequelize.sync({ force: true });

    await importUsers();

    console.log("La base de données a été initialisée avec succès.");
  } catch (error) {
    console.error(
      "Erreur lors de l'initialisation de la base de données :",
      error
    );
  }
};

// Export des éléments nécessaires
export { sequelize, initDb, Book, Author, Category, User, Comment, Note };
