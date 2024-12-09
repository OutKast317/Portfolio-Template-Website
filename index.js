document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault(); 
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('error-message');
  
  
  if (!username || !password) {
    errorMessage.textContent = 'Both fields are required for login.';
    return;
  }

  alert('Login successful!');
  errorMessage.textContent = ''; 
});

document.getElementById('signUpForm').addEventListener('submit', function(event) {
  event.preventDefault(); 

  const newUsername = document.getElementById('new-username').value;
  const newPassword = document.getElementById('new-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const errorMessage = document.getElementById('error-message');

//error handling

   if (!newUsername || !newPassword || !confirmPassword) {
    errorMessage.textContent = 'All fields are required for sign-up.';
    return;
  }

  if (newPassword !== confirmPassword) {
    errorMessage.textContent = 'Passwords do not match.';
    return;
  }

  if (newPassword.length < 6) {
    errorMessage.textContent = 'Password must be at least 6 characters.';
    return;
  }

  // code still needs to be fixed for real world logic
  alert('Sign-Up successful!');
  errorMessage.textContent = ''; 
});

// Toggling or Switching between forms 
function toggleForm() {
  const loginForm = document.getElementById('loginForm');
  const signUpForm = document.getElementById('signUpForm');
  const formTitle = document.getElementById('form-title');
  const toggleText = document.getElementById('toggle-form');

  loginForm.classList.toggle('hidden');
  signUpForm.classList.toggle('hidden');

  if (loginForm.classList.contains('hidden')) {
    formTitle.textContent = 'Sign Up'; 
    toggleText.innerHTML = `Already have an account? <a href="javascript:void(0);" onclick="toggleForm()">Login</a>`;
  } else {
    formTitle.textContent = 'Login'; 
    toggleText.innerHTML = `Don't have an account? <a href="javascript:void(0);" onclick="toggleForm()">Sign Up</a>`;
  }
}

