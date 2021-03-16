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
  return userData;
};
