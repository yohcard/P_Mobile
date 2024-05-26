// https://sequelize.org/docs/v7/models/data-types/

const AuthorModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "Author",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^[A-Za-z0-9À-ÖØ-öø-ÿ\s'-]*$/,
            msg: "Seules les lettres et les espaces sont autorisées.",
          },
          notEmpty: {
            msg: "Le nom de l'auteur ne peut pas être vide.",
          },
          notNull: {
            msg: "Le nom de l'auteur est une propriété obligatoire.",
          },
        },
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          is: {
            args: /^[A-Za-z0-9À-ÖØ-öø-ÿ\s'-]*$/,
            msg: "Seules les lettres et les espaces sont autorisées.",
          },
          notEmpty: {
            msg: "Le prénom de l'auteur ne peut pas être vide.",
          },
          notNull: {
            msg: "Le prénom de l'auteur est une propriété obligatoire.",
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
      tableName: "t_author", // Définit le nom de table exact ici
      freezeTableName: true, // Empêche Sequelize de modifier le nom de la table
    }
  );
};

export { AuthorModel };
