// https://sequelize.org/docs/v7/models/data-types/

const CommentModel = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      bookId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Le commentaire ne peut pas être vide.",
          },
          notNull: {
            msg: "Le commentaire est obligatoire.",
          },
        },
      },
    },
    {
      timestamps: false,
      tableName: "t_comment", // Définit le nom de table exact ici
      freezeTableName: true, // Empêche Sequelize de modifier le nom de la table
    }
  );

  Comment.associate = (models) => {
    // associations can be defined here
    Comment.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    Comment.belongsTo(models.Book, { foreignKey: "bookId", as: "book" });
  };

  return Comment;
};

export { CommentModel };
