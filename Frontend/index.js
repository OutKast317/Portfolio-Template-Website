//show password function by kph and stzk
//modified by pwt
function showPassword(element) {
  const passwordInput = element.previousElementSibling;
  const showIcon = element.querySelector('.visible');//fixed
  const hideIcon = element.querySelector('.hidden');//fixed
  
  if (!passwordInput) {
    console.error('Password not found!');
    return;
  } 

  if (!showIcon || !hideIcon){
    console.error('Icon missing!');
    return;
  }

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    showIcon.classList.remove('visible');
    showIcon.classList.add('hidden');
    hideIcon.classList.remove('hidden');
    hideIcon.classList.add('visible');
  } else {
    passwordInput.type = 'password';
    hideIcon.classList.remove('hidden');
    hideIcon.classList.add('visible');
    showIcon.classList.remove('visible');
    showIcon.classList.add('hidden');
  }
}


//by stzk
function toggleMenu() {
  const dropdownMenu = document.getElementById('dropdownMenu');
  dropdownMenu.classList.toggle('open-menu');
}

function closeModal() {
  const modalOverlay = document.getElementById('modal-overlay');
  modalOverlay.classList.add('hidden');
}


function showForm(type) {
  const modalOverlay = document.getElementById('modal-overlay');
  const loginForm = document.getElementById('loginForm');
  const signUpForm = document.getElementById('signUpForm');
  const formTitle = document.getElementById('form-title');
  const toggleText = document.getElementById('toggle-form');
  
   modalOverlay.classList.remove('hidden');

  // Toggle forms
  if (type === 'login') {
    loginForm.classList.remove('hidden');
    signUpForm.classList.add('hidden');
    formTitle.textContent = 'Login';
    toggleText.innerHTML =
      "Don't have an account? <a href='javascript:void(0);' onclick='showForm(\"signup\")'>Sign Up</a>";
  } else if (type === 'signup') {
    signUpForm.classList.remove('hidden');
    loginForm.classList.add('hidden');
    formTitle.textContent = 'Sign Up';
    toggleText.innerHTML =
      "Already have an account? <a href='javascript:void(0);' onclick='showForm(\"login\")'>Login</a>";
  }
}


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
      const newUsername = document.getElementById('new-username').value;
      const newPassword = document.getElementById('new-password').value;
      const confirmPasswordElement = document.getElementById('confirm-password');
      const confirmPassword = confirmPasswordElement ? confirmPasswordElement.value : '';
      
      if (!newUsername || !newPassword || !confirmPassword) {
        errorMessage.textContent = 'All fields are required for sign-up.';
        return;
      }

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

const loginForm = document.getElementById('loginForm');
const signUpForm = document.getElementById('signUpForm');

if (loginForm) {
    loginForm.addEventListener('submit', formHandling('login'));
}

if (signUpForm) {
    signUpForm.addEventListener('submit', formHandling('signup'));
}

//search bar

document.querySelector(".search-bar input").addEventListener("keyup", function () {
  const searchQuery = this.value.toLowerCase();
  const templateBoxes = document.querySelectorAll(".template-box");

  templateBoxes.forEach(function (templateBox) {
    const templateTitle = templateBox.querySelector("p").textContent.toLowerCase();
    if (templateTitle.includes(searchQuery)) {
      templateBox.style.display = "flex";
    } else {
      templateBox.style.display = "none";
    }
  });

});