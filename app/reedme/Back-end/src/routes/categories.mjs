import express from "express";
import { auth } from "../auth/auth.mjs";
import { Category, Book } from "../db/sequelize.mjs";

const categoriesRouter = express();

categoriesRouter.get("/", auth, async (req, res) => {
  try {
    const categories = await Category.findAll({ order: ["name"] });
    const message = "La liste des catégories a bien été récupérée.";
    res.json({ message, data: categories });
  } catch (error) {
    const message =
      "La liste des catégories n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
    res.status(500).json({ message, data: error });
  }
});

categoriesRouter.get("/:id/", auth, async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (category === null) {
      const message =
        "La categorie demandée n'existe pas. Merci de réessayer avec un autre identifiant.";
      res.status(404).json({ message });
    }
    const message = `La categorie dont l'id vaut ${category.id} a bien été récupérée.`;
    res.json({ message, data: category });
  } catch (error) {
    const message =
      "La categorie n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
    res.status(500).json({ message, data: error });
  }
});

categoriesRouter.get("/:id/books/", auth, async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id);
    if (category === null) {
      const message =
        "La categorie demandée n'existe pas. Merci de réessayer avec un autre identifiant.";
      res.status(404).json({ message });
    }
    const books = await Book.findAll({
      where: { categoryId: category.id },
      order: ["title"],
    });
    const message = `La liste des livres de la categorie dont l'id vaut ${category.id} a bien été récupérée.`;
    res.json({ message, data: books });
  } catch (error) {
    const message =
      "La liste des livres de la categorie n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
    res.status(500).json({ message, data: error });
  }
});

export { categoriesRouter };
