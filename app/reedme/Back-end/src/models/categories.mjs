// https://sequelize.org/docs/v7/models/data-types/

const CategoryModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "Category",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Ce libellé est déjà pris.",
        },
        validate: {
          is: {
            args: /^[A-Za-z0-9À-ÖØ-öø-ÿ\s'-]*$/,
            msg: "Seules les lettres et les espaces sont autorisées.",
          },
          notEmpty: {
            msg: "Le libellé de la catégorie ne peut pas être vide.",
          },
          notNull: {
            msg: "Le libellé de la catégorie est une propriété obligatoire.",
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: "created",
      updatedAt: false,
      tableName: "t_category", // Définit le nom de table exact ici
      freezeTableName: true, // Empêche Sequelize de modifier le nom de la table
    }
  );
};

export { CategoryModel };
