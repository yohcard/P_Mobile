import jwt from "jsonwebtoken";
import { privateKey } from "./private_key.mjs";
import { Book } from "../db/sequelize.mjs";

const auth = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`;
    return res.status(401).json({ message });
  } else {
    const token = authorizationHeader.split(" ")[1];
    const decodedToken = jwt.verify(
      token,
      privateKey,
      async (error, decodedToken) => {
        if (error) {
          const message = `L'utilisateur n'est pas autorisé à accéder à cette ressource.`;
          return res.status(401).json({ message, data: error });
        }
        const userId = decodedToken.userId;

        console.log(userId);

        // Un moyen de transmettre le user id pour l'utiliser dans la route
        res.locals.userId = userId;
        const isAdmin = decodedToken.isAdmin;

        // Un utilisateur ne peut modifier que ses livres
        // Un utilisateur ne peut supprimer que ses livres
        if (["PUT", "DELETE"].includes(req.method)) {
          console.log(req.method);
          const bookId = req.params.id;
          const book = await Book.findByPk(bookId);

          console.log(`Est ce que ce user est admin ? ${isAdmin}`);
          console.log(`ID USER du token : ${userId} `);
          console.log(`ID USER du book : ${book.userId} `);

          if (!isAdmin && book.userId !== userId) {
            const message = `L'utilisateur n'est pas autorisé à accéder à cette ressource.`;
            return res.status(401).json({ message, data: error });
          }
        }

        if (req.body.userId && req.body.userId !== userId) {
          const message = `L'identifiant de l'utisateur est invalide`;
          return res.status(401).json({ message });
        } else {
          next();
        }
      }
    );
  }
};

export { auth };
