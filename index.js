document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();
  alert('Login successful!');
});

document.getElementById('signUpForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const username = document.getElementById('new-username').value;
  const password = document.getElementById('new-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const errorMessage = document.getElementById('error-message');

  if (password !== confirmPassword) {
      errorMessage.textContent = 'Passwords do not match';
  } else {
      alert('Sign-Up successful!');
      errorMessage.textContent = '';
  }
});
//hyperlink (html koh manipulate lok dr)
function toggleForm() {
  const loginForm = document.getElementById('loginForm');
  const signUpForm = document.getElementById('signUpForm');
  const formTitle = document.getElementById('form-title');
  const toggleText = document.getElementById('toggle-form');

  if (loginForm.style.display === 'none') {
      loginForm.style.display = 'block';//shows login box
      signUpForm.style.display = 'none';//hides signup box
      formTitle.textContent = 'Login';
      toggleText.innerHTML = `Don't have an account? <a href="javascript:void(0);" onclick="toggleForm()">Sign Up</a>`;
  } else {
      loginForm.style.display = 'none';
      signUpForm.style.display = 'block';
      formTitle.textContent = 'Sign Up';
      toggleText.innerHTML = `Already have an account? <a href="javascript:void(0);" onclick="toggleForm()">Login</a>`;
  }
}
