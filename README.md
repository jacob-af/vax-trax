# vax-trax

Vax-trax is a blog web site where users can track their progress for the vaccination process of the Covid-19 virus.  

Users can recieve up to date information about the state of the covid-19 virus in regards to infection, deaths and how many others have had their first and second shots.  This information can be catagorized by state.  

The user can track, what shot they are recieving, when the dates are that they will be going to get them and they can also blog about their experience.  

The user can then access other peoples experience that use the site.  The site uses cdc databases and also stores user information on its own database.  This site is deployed through heroku.

## Follow this link to the live application web site.
https://vax-trax.herokuapp.com/

## License

## The User Experience

The first page that you are brought to is a split page for signing up or signing in.

![Image of random password generator site](/public/assets/img/landing.png)

The individual either signs in or signs up on one of these two pages

![Image of random password generator site](/public/assets/img/login.png)

![Image of random password generator site](/public/assets/img/signup.png)

Once the user is signed in or have signed up they will be brought to their member page.  Here the user can choose to write a blog post about there vaccine experience or acces graphs describing the tregectory of covid deaths, covid cases and how many people have been vaccinated in their area.  The user can also look into cases in other areas.  Once the first post is made then the posts specific to the user will occupy their personal page.

![Image of random password generator site](/public/assets/img/member.png)

The user can then navigate to a more public page where all blog posts from themselves and other users is posted.  This gives the user the ability to look in to how others are coping or dealing with their vaccine experience.  There are direct links to the CDC web site on this page as well that will inform the user of things the CDC thinks all citizens should know about the virus and vaccinations.  There are even still graphs on this page describing the standings of covid deaths, cases and vaccinations in the United States.

![Image of random password generator site](/public/assets/img/public.png)




(this should explain how to use the site and what it does with images of the site)

## Technologies used
- sequelize
- mysql database
- JawsDB mysql
- express
- express-handlebars
- express-sessions
- bcryptjs
- bootstrap css modeling
- passport
- passport-local
- mysql2
- node-fetch
- nodemon
- cors
- mailer
- eslint
- eslint-config-prettier

## Future Goals

While the web-application is geared toward the novel carona virus we may see that this may be a helpful tool and landing page for people in the future getting other vaccines.  Adding a variety of vaccinations to the page may be helpfull not only for indivdual purposes but also public health services.  

We would also like to see the list of capabilities grow.  This would be in terms of what we are tracking and the information that could be divulged from their.  This would include mapping, more finite localization for usership (moving from a state model to a more localized model) and creating a more apt communication effort that would send information to the user more readily and promptly.

## Contributions to this project

If you are interested in contributing to this project feel free to clone down the repository and make a pull request.  It would be helpful to email the repository owner that you have made changes, with a detailed list of changes and reasonings.  Any changes will be considered and very much appreciated.


## Thank you

Thank you so much for checking out the repository and remember to stay safe out there!


## Quick look at user story:


This is our covid app:

User story:

As a person concerned about the covid-19 virus.  I am interested in getting the vaccine and tracking my vaccination progress.  I also would like to be connected with other and there experience with getting the vaccine.  

When I Schedule my first round of vaccine dosage, Then I can log what type of vaccine I am getting.

When I have a  vaccine schedule and input the first dose, Then I should be prompted to when my second dose should be.

When I have finished a dose of the vaccine and have logged that, then I am given an opportunity for a testimonial.

When the user provides information, Then the user will be prompted with information and guidelines from the CDC in order to move forward.  

When the user is interested in further information about others experience, Then they can search other users testimonials on the site.

When the user wants to search other users experience , They can do so by the key words provided to describe the others experiences.

When the user provides information, Then they are prompted to keep it private or not.
