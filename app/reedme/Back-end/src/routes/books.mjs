import express from "express";
import { ValidationError } from "sequelize";
import { auth } from "../auth/auth.mjs";
import { Book, Category, Author, Comment, Note } from "../db/sequelize.mjs";

const booksRouter = express();

booksRouter.post("/:id/notes/", auth, async (req, res) => {
  console.log(res.locals);

  try {
    const book = await Book.findByPk(req.params.id);
    const data = {
      bookId: book.id,
      userId: res.locals.userId,
      note: req.body.note,
    };

    const newNote = await Note.create(data);
    const message = `La note a bien été ajoutée !`;
    res.json({ message, data: newNote });
  } catch (error) {
    console.log(error);
    // En cas de problème de validatin de données
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message, data: error });
    }

    // En cas de tout autres problèmes
    const message =
      "La note n'a pas pu être ajouté. Merci de réessayer dans quelques instants.";
    res.status(500).json({ message, data: error });
  }
});

booksRouter.get("/:id/notes/", auth, async (req, res) => {
  const book = await Book.findByPk(req.params.id, {
    include: [
      {
        model: Note,
        as: "notes", // Utilisation de l'alias défini dans votre association
      },
    ],
  });

  const message = `Les notes du livre ${book.title}.`;
  res.json({ message, data: book.notes });
});

booksRouter.post("/:id/comments/", auth, async (req, res) => {
  console.log(res.locals);

  try {
    const book = await Book.findByPk(req.params.id);
    const data = {
      bookId: book.id,
      userId: res.locals.userId,
      content: req.body.comment,
    };
    const newComment = await Comment.create(data);
    const message = `Le commentaire a bien été ajouté !`;
    res.json({ message, data: newComment });
  } catch (error) {
    // En cas de problème de validatin de données
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message, data: error });
    }

    // En cas de tout autres problèmes
    const message =
      "Le commentaire n'a pas pu être ajouté. Merci de réessayer dans quelques instants.";
    res.status(500).json({ message, data: error });
  }
});

booksRouter.get("/:id/comments/", auth, async (req, res) => {
  const book = await Book.findByPk(req.params.id, {
    include: [
      {
        model: Comment,
        as: "comments", // Utilisation de l'alias défini dans votre association
      },
    ],
  });

  const message = `Les commentaires du livre ${book.title}.`;
  res.json({ message, data: book.comments });
});

booksRouter.get("/", auth, async (req, res) => {
  try {
    const books = await Book.findAll({ order: ["title"] });
    const message = "La liste des livres a bien été récupérée.";
    res.json({ message, data: books });
  } catch (error) {
    const message =
      "La liste des livres n'a pas pu être récupérée. Merci de réessayer dans quelques instants.";
    res.status(500).json({ message, data: error });
  }
});

booksRouter.get("/:id/", auth, async (req, res) => {
  try {
    const book = await Book.findByPk(req.params.id);
    if (book === null) {
      const message =
        "Le livre demandé n'existe pas. Merci de réessayer avec un autre identifiant.";
      res.status(404).json({ message });
    }
    const message = `Le livre dont l'id vaut ${book.id} a bien été récupéré.`;
    res.json({ message, data: book });
  } catch (error) {
    const message =
      "Le livre n'a pas pu être récupéré. Merci de réessayer dans quelques instants.";
    res.status(500).json({ message, data: error });
  }
});

booksRouter.post("/", auth, async (req, res) => {
  try {
    const categoryData = { name: req.body.category };
    const category = await Category.create(categoryData);

    const authorData = {
      lastname: req.body.author.lastname,
      firstname: req.body.author.firstname,
    };
    const author = await Author.create(authorData);
    const data = {
      ...req.body,
      authorId: parseInt(author.id),
      categoryId: parseInt(category.id),
      userId: res.locals.userId,
    };
    const newBook = await Book.create(data);
    const message = `Le livre ${newBook.title} a bien été ajouté !`;
    res.json({ message, data: newBook });
    //res.json({ message: "Youpi", data: category });
  } catch (error) {
    // En cas de problème de validatin de données
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message, data: error });
    }

    // En cas de tout autres problèmes
    const message =
      "Le livre n'a pas pu être ajouté. Merci de réessayer dans quelques instants.";
    res.status(500).json({ message, data: error });
  }
});

booksRouter.put("/:id", auth, async (req, res) => {
  try {
    const data = {
      ...req.body,
      userId: res.locals.userId,
    };
    await Book.update(data, {
      where: { id: req.params.id },
    });

    const updatedBook = await Book.findByPk(req.params.id);

    if (updatedBook === null) {
      const message =
        "Le livre que vous souhaitez modifier n'existe pas. Merci de réessayer avec un autre identifiant.";
      res.status(404).json({ message });
    }

    const message = `Le livre ${updatedBook.title} a été modifié avec succès !`;
    res.json({ message, data: updatedBook });
  } catch (error) {
    console.log(error);
    const message =
      "Le livre n'a pas pu être modifié. Merci de réessayer dans quelques instants.";
    res.status(500).json({ message, data: error });
  }
});

booksRouter.delete("/:id", auth, async (req, res) => {
  try {
    const deletedBook = await Book.findByPk(req.params.id);
    if (deletedBook === null) {
      const message =
        "Le livre que vous souhaitez supprimer n'existe pas. Merci de réessayer avec un autre identifiant.";
      res.status(404).json({ message });
    }

    Book.destroy({
      where: { id: deletedBook.id },
    });

    const message = `Le livre ${deletedBook.title} a été supprimé avec succès !`;
    res.json({ message, data: deletedBook });
  } catch (error) {
    const message =
      "Le livre n'a pas pu être supprimé. Merci de réessayer dans quelques instants.";
    res.status(500).json({ message, data: error });
  }
});

export { booksRouter };
