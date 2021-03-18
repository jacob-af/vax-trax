//const { INTEGER } = require("sequelize/types");

// eslint-disable-next-line camelcase
module.exports = function(vax_trax_db, DataTypes) {
  // eslint-disable-next-line camelcase
  const userData = vax_trax_db.define("userData", {
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    vaccineInterest: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    vaccineType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    schuduled: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    shotNumber: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  });
  userData.associate = models => {
    // We're saying that a Post should belong to a user
    // A Post can't be created without a user due to the foreign key constraint
    userData.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return userData;
};