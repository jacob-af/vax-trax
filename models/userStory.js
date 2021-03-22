module.exports = (vax_trax_db, DataTypes) => {
  const UserStory = vax_trax_db.define("UserStory", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    category: {
      type: DataTypes.STRING,
      defaultValue: "Personal"
    }
  });
  UserStory.associate = models => {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    userStory.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return UserStory;
};
