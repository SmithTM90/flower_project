'use-strict'

var User = function(email, password) {
  this.user_email = email;
  this.user_password = password;
}

var fillIn = new User ('example@fake.com', 'nugget');

localStorage.setItem('test', JSON.stringify(fillIn));

if (JSON.parse(localStorage.getItem('test'))) {
  var user = JSON.parse(localStorage.getItem('test'));
}

$('#signIn').click(function() {
    console.log("click");
  if (document.getElementById('email').value === user.user_email && document.getElementById('password').value === user.user_password) {
    window.location = "index.html";
  } else {
    $('.hidden').show();
  }
});

$('#createAccount').click(function() {
  console.log('click');
  $('#signUpForm').slideDown();
});

$('#signUp').click(function() {
  console.log('click');
  document.getElementById('name').value
  document.getElementById('city').value
  document.getElementById('state').value
  document.getElementById('email2').value
  document.getElementById('password2').value
}
