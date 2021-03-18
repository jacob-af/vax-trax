module.exports = function(vax_trax_db, DataTypes) {
  const userStory = vax_trax_db.define("userStory", {
    shareBlog: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    writeBlog: {
      type: DataTypes.STRING(1234),
      allwNull: true
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
