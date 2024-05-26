import express from "express";
import { auth } from "../auth/auth.mjs";
import { Author, Book } from "../db/sequelize.mjs";

const authorsRouter = express();

authorsRouter.get("/", auth, async (req, res) => {
  try {
    const authors = await Author.findAll({ order: ["lastname", "firstname"] });
    const message = "La liste des auteurs a bien été récupérée.";
    res.json({ message, data: authors });
  } catch (error) {
    const message =
      "La liste des auteurs n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
    res.status(500).json({ message, data: error });
  }
});

authorsRouter.get("/:id/", auth, async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (author === null) {
      const message =
        "L'auteur demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
      res.status(404).json({ message });
    }
    const message = `L'auteur dont l'id vaut ${author.id} a bien été récupéré.`;
    res.json({ message, data: author });
  } catch (error) {
    const message =
      "Le livre n'a pas pu être récupéré. Merci de réessayer dans quelques instants.";
    res.status(500).json({ message, data: error });
  }
});

authorsRouter.get("/:id/books/", auth, async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (author === null) {
      const message =
        "L'auteur demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
      res.status(404).json({ message });
    }
    const books = await Book.findAll({
      where: { authorId: author.id },
      order: ["title"],
    });

    const message = `La liste des livres de l'auteur dont l'id vaut ${author.id} a bien été récupérée.`;
    res.json({ message, data: books });
  } catch (error) {
    const message =
      "La liste des livres n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
    res.status(500).json({ message, data: error });
  }
});

export { authorsRouter };
