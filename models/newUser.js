//const { INTEGER } = require("sequelize/types");

// eslint-disable-next-line camelcase
module.exports = function(vax_trax_db, DataTypes) {
  // eslint-disable-next-line camelcase
  const NewUser = vax_trax_db.define("NewUser", {
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    vaccineType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vaccineInterest: {
      type: DataTypes.Boolean,
      allowNull: true
    },
    schuduled: {
      type: DataTypes.Boolean,
      allowNull: true
    },
    shotNumber: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    blog: {
      type: DataTypes.STRING(1500),
      allowNull: true
    }
  });
  return NewUser;
};
