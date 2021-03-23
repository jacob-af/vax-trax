$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $("form.signup");
  const nameInput = $("input#user-name");
  const emailInput = $("input#email-input");
  const passwordInput = $("input#password-input");
  const passwordConfirm = $("input#password-confirm");

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", event => {
    event.preventDefault();
    const userData = {
      name: nameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      confirm: passwordConfirm.val().trim()
    };
    console.log(userData);
    if (
      !userData.email ||
      !userData.password ||
      userData.confirm !== userData.password
    ) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.name, userData.email, userData.password);
    emailInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(name, email, password) {
    $.post("/api/signup", {
      name: name,
      email: email,
      password: password
    })
      .then(() => {
        window.location.replace("/members");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }
});
