$(document).ready(function() {
  // Getting references to our form and input
  var signUpButton = $("button.signup");
  var logInButton = $("button.login");
  var usernameInput = $("input#username-input");
  var passwordInput = $("input#password-input");

  // When the signup button is clicked, we validate the username and password are not blank
  signUpButton.on("click", function(event) {
    event.preventDefault();
    var userData = {
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim(),
     
    };

    if (!userData.username || !userData.password) {
      return;
    }
    // If we have an username and password, run the signUpUser function
    signUpUser(userData.username, userData.password);
    usernameInput.val("");
    passwordInput.val("");
  });

  // Does a post to the signup route. If successful, we are redirected to the game page
  // Otherwise we log any errors
  function signUpUser(username, password) {
    $.post("/api/signup", {
      username: username,
      password: password,
      
    })
      .then(function(data) {
        window.location.replace("/game");
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }

  logInButton.on("click", function(event) {
    event.preventDefault();
    var userData = {
      username: usernameInput.val().trim(),
      password: passwordInput.val().trim(),
     
    };

    if (!userData.username || !userData.password) {
      return;
    }

    // If we have an username and password we run the loginUser function and clear the form
    loginUser(userData.username, userData.password);
    usernameInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(username, password) {
    $.post("/api/login", {
      username: username,
      password: password,
    
    })
      .then(function() {
        window.location.replace("/game");
        // If there's an error, log the error
      })
      .catch(function(err) {
        console.log(err);
      });
  }
});
