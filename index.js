function showForm(type) {
  const formContainer = document.getElementById('modal-overlay');
  const loginForm = document.getElementById('loginForm');
  const signUpForm = document.getElementById('signUpForm');
  const formTitle = document.getElementById('form-title');
  const toggleText = document.getElementById('toggle-form');
  
   formContainer.classList.remove('hidden');

  // Toggle forms
  if (type === 'login') {
    loginForm.classList.remove('hidden');
    signUpForm.classList.add('hidden');
    formTitle.innerText = 'Login';
    toggleText.innerHTML =
      "Don't have an account? <a href='javascript:void(0);' onclick='showForm(\"signup\")'>Sign Up</a>";
  } else if (type === 'signup') {
    signUpForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    formTitle.innerText = 'Sign Up';
    toggleText.innerHTML =
      "Already have an account? <a href='javascript:void(0);' onclick='showForm(\"login\")'>Login</a>";
  }
}
/*
// Login Handling
// Login still needs some fix
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const errorMessage = document.getElementById('error-message');

  if (!username || !password) {
    errorMessage.textContent = 'Both fields are required for login.';
    return;
  }
//codes still need to be fixed for real world logic
  alert('Login successful!');
  errorMessage.textContent = '';
});

// Sign-up
document.getElementById('signUpForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const newUsername = document.getElementById('new-username').value;
  const newPassword = document.getElementById('new-password').value;
  const confirmPassword = document.getElementById('confirm-password').value;
  const errorMessage = document.getElementById('error-message');

  // Error handling
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

  //codes still need to be fixed for real world logic
  alert('Sign-Up successful!');
  errorMessage.textContent = '';
});
*/

function formHandling(formType) {
  return function (event) {

    event.preventDefault();

    const username = document.getElementById(`${formType}-username`).value;
    const password = document.getElementById(`${formType}-password`).value;
    const errorMessage = document.getElementById(`${formType}-error-message`); 

    //for DOM manipulation
      //before displaying error message, check if the element(error message) exists
      //if it doesn't exist, console mhr error message log ml
      //if it exists, display the error message
      if (!errorMessage) {
        console.error('Error message element not found');
        return;
      }
    

    //code still needs to be fixed
    if (!username) {
      errorMessage.textContent = 'Username is required.';
      return;
    }

    if (!password) {
      errorMessage.textContent = 'Password is required.';
      return;
    }
    
    if (formType === 'signup') {
      const confirmPasswordElement = document.getElementById('confirm-password');
      const confirmPassword = confirmPasswordElement ? confirmPasswordElement.value : '';
            
      if (password !== confirmPassword) {
        errorMessage.textContent = 'Passwords do not match.';
        return;
      }
    
      if (password.length < 6) {
        errorMessage.textContent = 'Password must be at least 6 characters.';
        return;
      }
    }

    alert(`${formType} === 'login' ? 'Login' : 'Sign-Up'} successful!`);
    errorMessage.textContent = '';

  }
};




//show password function by kph and stzk
//modified by pwt
function showPassword(element) {
  const passwordInput = element.previousElementSibling;
  const showIcon = element.querySelector('#hide1');
  const hideIcon = element.querySelector('#hide2');

  if (!passwordInput) {
    console.error('Password input not found');
    return;
  } 
    
  if (passwordInput.type === 'password') {
    input.type = 'text';
    showIcon.classList.add('visible');
    showIcon.classList.remove('visible');
    hideIcon.classList.add('hidden');
    hideIcon.classList.remove('visible');
  } else {
    passwordInput.type = 'password';
    showIcon.classList.add('hidden');
    showIcon.classList.remove('visible');
    hide1.classList.add('visible');
    hide2.classList.remove('hidden');
  }
}


document.getElementById('loginForm').addEventListener('submit', formHandling('login'));
document.getElementById('signUpForm').addEventListener('submit', formHandling('signup'));


function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
}


