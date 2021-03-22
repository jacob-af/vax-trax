const db = require("../models");

module.exports = app => {
  app.get("/api/UserStory", (req, res) => {
    const query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }

    db.UserStory.findAll({
      where: query,
      include: [db.User]
    }).then(dbUserStory => res.json(dbUserStory));
  });

  app.get("/api/UserStory/:id", (req, res) => {
    db.UserStory.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(dbUserStory => res.json(dbUserStory));
  });

  app.post("/api/UserStory", (req, res) => {
    db.UserStory.create(req.body).then(dbUserStory => res.json(dbUserStory));
  });

  app.delete("/api/UserStory/:id", (req, res) => {
    db.UserStory.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbUserStory => res.json(dbUserStory));
  });

  app.put("/api/UserStory", (req, res) => {
    db.UserStory.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(dbUserStory => res.json(dbUserStory));
  });

  app.get("/api/UserStory/category/:category", (req, res) => {
    db.UserStory.findAll({
      where: {
        category: req.params.category
      }
    }).then(dbUserStory => {
      res.json(dbUserStory);
    });
  });
};
