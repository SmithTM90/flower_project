'use-strict'

var user;

var User = function(name, city, state, email, password) {
  this.user_name = name;
  this.user_city = city;
  this.user_state = state;
  this.user_email = email;
  this.user_password = password;
}
//this was used to test the sign in functionality
// var fillIn = new User ('John', 'Seattle', 'WA', 'example@fake.com', 'nugget');
// localStorage.setItem('test', JSON.stringify(fillIn));

if (JSON.parse(localStorage.getItem('user'))) {
  user = JSON.parse(localStorage.getItem('user'));
}

$('#signIn').click(function() {
    console.log("click");
  if (document.getElementById('email').value === user.user_email && document.getElementById('password').value === user.user_password) {
    window.location = "index_p2.html";
  } else {
    $('.hidden').show();
  }
});

$('#createAccount').click(function() {
  console.log('click');
  $('#signUpForm').slideDown();
  $('#signUp').show();
  $('#noMatch').hide();
});

$('#signUp').click(function() {
  console.log('click');
  $('.logIn').show();
  $('#noMatch').hide();
  $('#signUp').hide();

  user = new User (
    this.user_name = document.getElementById('name').value,
    this.user_city = document.getElementById('city').value,
    this.user_state = document.getElementById('state').value,
    this.user_email = document.getElementById('email2').value,
    this.user_password = document.getElementById('password2').value
  );
  localStorage.setItem('user', JSON.stringify(user));
  $('#signUpForm').slideUp();
});
