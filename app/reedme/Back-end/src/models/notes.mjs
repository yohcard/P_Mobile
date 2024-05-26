// https://sequelize.org/docs/v7/models/data-types/

const NoteModel = (sequelize, DataTypes) => {
  const Note = sequelize.define(
    "Note",
    {
      userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      bookId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      note: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: [0],
            msg: "La note doit être supérieure ou égale à 0.",
          },
          max: {
            args: [5],
            msg: "La note doit être inférieure ou égale à 5.",
          },
        },
      },
    },
    {
      timestamps: false,
      tableName: "t_note", // Définit le nom de table exact ici
      freezeTableName: true, // Empêche Sequelize de modifier le nom de la table
    }
  );

  Note.associate = (models) => {
    // associations can be defined here
    Note.belongsTo(models.User, { foreignKey: "userId", as: "user" });
    Note.belongsTo(models.Book, { foreignKey: "bookId", as: "book" });
  };

  return Note;
};

export { NoteModel };
