const db = require("../models");

module.exports = app => {
  app.get("/api/UserStory", (req, res) => {
    const query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }

    db.UserStories.findAll({
      where: query,
      include: [db.User],
      options: { allowProtoMethodsByDefault: true }
    }).then(dbUserStory => {
      const hbsObject = {
        stories: dbUserStory.map(story => story.dataValues)
      };
      hbsObject.stories.map(story => {
        story.name = story.User.name;
        return story;
      });
      res.render("public", hbsObject);
      //res.json(dbUserStory);
    });
  });

  app.get("/api/UserStory/:id", (req, res) => {
    db.UserStories.findOne({
      where: {
        id: req.params.id
      },
      include: [db.User]
    }).then(dbUserStory => res.json(dbUserStory));
  });

  // app.get("/api/UserStory/category/:category", (req, res) => {
  //   db.UserStories.findAll({
  //     where: {
  //       category: req.params.category
  //     }
  //   }).then(dbPost => {
  //     res.json(dbPost);
  //   });
  // });

  app.post("/api/UserStory", (req, res) => {
    db.UserStories.create(req.body).then(dbUserStory => res.json(dbUserStory));
  });

  app.delete("/api/UserStory/:id", (req, res) => {
    db.UserStories.destroy({
      where: {
        id: req.params.id
      }
    }).then(dbUserStory => res.json(dbUserStory));
  });

  app.put("/api/UserStory", (req, res) => {
    db.UserStories.update(req.body, {
      where: {
        id: req.body.id
      }
    }).then(dbUserStory => res.json(dbUserStory));
  });
};
