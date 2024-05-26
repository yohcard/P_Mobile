// https://sequelize.org/docs/v7/models/data-types/

const BookModel = (sequelize, DataTypes) => {
  const Book = sequelize.define(
    "Book",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Ce titre est déjà pris.",
        },
        validate: {
          is: {
            args: /^[A-Za-z0-9À-ÖØ-öø-ÿ\s,.:'-]+$/,
            msg: "Seules les lettres et les espaces sont autorisées.",
          },
          notEmpty: {
            msg: "Le titre du livre ne peut pas être vide.",
          },
          notNull: {
            msg: "Le titre du livre est une propriété obligatoire.",
          },
        },
      },
      numberOfPages: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: "Utilisez uniquement des entiers pour le nombre de pages.",
          },
          notEmpty: {
            msg: "Le nombre de pages ne peut pas être vide.",
          },
          notNull: {
            msg: "Le nombre de pages est une propriété obligatoire.",
          },
          min: {
            args: [1],
            msg: "Le nombre de pages doit être supérieur à 1.",
          },
        },
      },
      pdfLink: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      abstract: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      editor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      editionYear: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      imagePath: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      authorId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
      tableName: "t_book", // Définit le nom de table exact ici
      freezeTableName: true, // Empêche Sequelize de modifier le nom de la table
    }
  );

  Book.associate = (models) => {
    Book.hasMany(models.Comment, { foreignKey: "bookId", as: "comments" });
    Book.hasMany(models.Note, { foreignKey: "bookId", as: "notes" });
  };

  return Book;
};

export { BookModel };
