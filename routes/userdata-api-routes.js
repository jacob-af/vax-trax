const db = require("../models");

module.exports = app => {
  //this should get the users vaxination data.
  app.get("/api/user", (req, res) => {
    const query = {};
    if (req.query.User_id) {
      query.UserId = req.query.user_id;
    }
    db.userData
      .findAll({
        where: query
      })
      .then(dbuserData => res.json(dbuserData));
  });

  //this is a route for updating the data.
  app.put("/api/user", (req, res) => {
    db.UserData.update(
      {
        scheduled: req.body.scheduled,
        shotNumber: req.body.shotNumber,
        vaccineType: req.body.vaccineType
      },
      {
        where: {
          id: req.body.id
        }
      }
    )
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.json(err));
  });
};
