module.exports = function(vax_trax_db, DataTypes) {
  const UserStories = vax_trax_db.define("UserStories", {
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
    },
    vaccineType: {
      type: DataTypes.STRING,
      allowNull: true
    },
    firstShot: {
      type: DataTypes.STRING,
      allowNull: true
    },
    secondShot: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dateOfShot: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  UserStories.associate = models => {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    UserStories.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return UserStories;
};
