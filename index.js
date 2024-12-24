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

//show password function for both form
function show(id){
  let password = document.getElementById(id);
  if (password.type === 'password') {
    password.type = 'text';
  } else {  
    password.type = 'password';
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


    //code still needs to be fixed
    if (!username || !password) {
      errorMessage.textContent = 'Both fields are required for login.';
      return;
    }

    if (formType === 'signup') {
      const confirmPassword = document.getElementById('confirm-password').value;

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

//please enter the new js code here
//Drop Down JS by STZK 
    let dropdownMenu = document.getElementById("dropdownMenu");
    function toggleMenu(){
    dropdownMenu.classList.toggle("open-menu");
    }

document.getElementById('loginForm').addEventListener('submit', formHandling('login'));
document.getElementById('signUpForm').addEventListener('submit', formHandling('signup'));


function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden');
}


