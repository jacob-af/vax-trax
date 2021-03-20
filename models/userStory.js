// eslint-disable-next-line camelcase
module.exports = function(vax_trax_db, DataTypes) {
  // eslint-disable-next-line camelcase
  const userStory = vax_trax_db.define("userStory", {
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
  userStory.associate = models => {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    userStory.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return userStory;
};
