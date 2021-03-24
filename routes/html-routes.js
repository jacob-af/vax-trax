// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../config/middleware/isAuthenticated");
const db = require("../models");

module.exports = function(app) {
  app.get("/", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("index", { style: "landing.css" });
  });

  app.get("/login", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("login", { style: "login-signup.css" });
  });

  app.get("/signup", (req, res) => {
    // If the user already has an account send them to the members page
    if (req.user) {
      res.redirect("/members");
    }
    res.render("signup", { style: "login-signup.css" });
  });
  // Here we've add our isAuthenticated middleware to this route.
  // If a user who is not logged in tries to access this route they will be redirected to the signup page
  app.get("/members", isAuthenticated, (req, res) => {
    const query = { UserId: req.user.id };

    db.UserStories.findAll({
      where: query,
      include: [db.User]
    }).then(dbUserStory => {
      const hbsObject = {
        stories: dbUserStory.map(story => story.dataValues),
        style: "member.css",
        options: { allowProtoMethodsByDefault: true }
      };
      res.render("members", hbsObject);
      //res.json(dbUserStory);
    });
  });

  app.get("/public", isAuthenticated, (req, res) => {
    console.log(req.query);

    const query = {};
    if (req.query.user_id) {
      query.UserId = req.query.user_id;
    }
    if (req.query.category) {
      const category = req.query.category.replace(/([A-Z])/g, " $1").trim();
      query.category = category;
    }

    db.UserStories.findAll({
      where: query,
      include: [db.User]
    }).then(dbUserStory => {
      const hbsObject = {
        stories: dbUserStory.map(story => story.dataValues),
        style: "public.css",
        options: { allowProtoMethodsByDefault: true }
      };
      hbsObject.stories.map(story => {
        story.name = story.User.name;
        return story;
      });
      console.log(hbsObject);
      res.render("public", hbsObject);
      //res.json(dbUserStory);
    });
  });
};
