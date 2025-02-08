//open and close image modal
function openImageModal(imageSrc) {
  const modal = document.getElementById("image-modal");
  const modalImage = document.getElementById("modal-image");

  modalImage.src = imageSrc;
  modal.classList.add("show");
}

function closeImageModal() {
  const modal = document.getElementById("image-modal");
  modal.classList.remove("show");
}

// for all template images
document.addEventListener("DOMContentLoaded", () => {
  const templateImages = document.querySelectorAll(".template-box img");

  templateImages.forEach((image) => {
      image.addEventListener("click", function () {
          openImageModal(this.src);
      });
  });
});

//show password function by kph and stzk
//modified by pwt
function showPassword(element) {
  const passwordInput = element.previousElementSibling;
  const showIcon = element.querySelector('.fa-eye');//fixed
  const hideIcon = element.querySelector('.fa-eye-slash');//fixed

  
  if (!passwordInput) {
    console.error('Password not found');
    return;
  } 

  if (passwordInput.type === 'password') {
    passwordInput.type = 'text';
    /*
    showIcon.classList.remove('visible');
    showIcon.classList.add('hidden');
    hideIcon.classList.remove('hidden');
    hideIcon.classList.add('visible');
  */
    showIcon.style.display = 'none';
    hideIcon.style.display = 'block';

    } else {
    passwordInput.type = 'password';
    /*
    hideIcon.classList.remove('hidden');
    hideIcon.classList.add('visible');
    showIcon.classList.remove('visible');
    showIcon.classList.add('hidden');
*/
    showIcon.style.display = 'block';
    hideIcon.style.display = 'none';
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
//data for account
let username = " ";
let password = 0;

function formHandling(formType) {
  return function (event) {
    
    event.preventDefault();

    //username = document.getElementById(`${formType}-username`).value;
    //password = document.getElementById(`${formType}-password`).value;
    const errorMessage = document.getElementById(`${formType}-error-message`);
    
    //for DOM manipulation
    //before displaying error message, check if the element(error message) exists
    //if it doesn't exist, console mhr error message log ml
    //if it exists, display the error message
    let islogin = localStorage.getItem("user-name")? true : false;
  
    if (formType === 'login' && islogin) {
      username = localStorage.getItem("user-name");
      password = localStorage.getItem("password");
      let inputUsername = document.getElementById('login-username').value;
      let inputPassword = document.getElementById('login-password').value;
    if (!errorMessage) {
      console.error('Error message element not found');
      return;
    }
    if (inputUsername === username && inputPassword === password){
      alert("Login successful!");
    }
    else{
      errorMessage.style.color = 'red';
      errorMessage.textContent = 'Invalid username or password.';
      return;
    }
    //code still needs to be fixed
    /*if (!username) {
      errorMessage.textContent = 'Username is required.';
      return;
    }*/

    /*if (!password) {
      errorMessage.textContent = 'Password is required.';
      return;
    }*/
  }
    if (formType === 'signup') {
      let newUsername = document.getElementById('signup-username').value;
      let newPassword = document.getElementById('signup-password').value;
      username = newUsername;
      password = newPassword;
      const confirmPasswordElement = document.getElementById('confirm-password').value;
      //const confirmPassword = confirmPasswordElement ? confirmPasswordElement.value : '';
      const confirmPassword = confirmPasswordElement === password? true : false;

      //html form element done that checking so this is not needed!
      /*if (!newUsername || !newPassword || !confirmPassword) {
        errorMessage.textContent = 'All fields are required for sign-up.';
        alert("All fields are required for sign-up.");
        return;
      }*/

      if (!confirmPassword) {
        errorMessage.style.color = 'red';
        errorMessage.textContent = 'Passwords do not match.';
        return;
      }
    
      if (password.length < 6) {
        errorMessage.style.color = 'red';
        errorMessage.textContent = 'Password must be at least 6 characters.';
        return;
      }
      localStorage.setItem("user-name", username);
      localStorage.setItem("password", password);

      alert("Sign up successful!");
    }

    closeModal();
    

  };
}

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


//dynamic template section

const templateSection = [
  {
    title: "Modern CV", image: "cv1.jpg", description: "A modern CV template with a sleek design."
  },
  {
    title: "Minimal Resume", image: "cv2.jpg", description: "A resume template with a minimalistic design."
  },
  {
    title: "Creative Portfolio", image: "cv3.jpg", description: "A portfolio template with a creative design."
  },
  {
    title: "Business template", image: "cv4.jpg", description: "A business template with a creative design."
  },
  {
    title: "Freelancer Resume", image: "cv5.jpg", description: "A freelancer resume template with a sleek design."
  },
];


function loadTemplates(row,tile) {
  //row = y,tile = x
let frame = 1; 
let index = 0;
const templateContainer = document.getElementsByClassName("template-grid");//adjust 
let containers = templateContainer[row].childElementCount;// map the number of containers 
let container = document.getElementsByClassName("template-box");// map all containers

if (row > 0) {
   index = containers +  ((containers * row) - containers);
   //alert(index);
}

for (let i = index; i < index + tile; i++) {
  templateSection.forEach((template) => {
    //const templateBox = document.createElement("div");
    //templateBox.classList.add("template-box");
    container[i].innerHTML = `
      <img src="cv${frame}.jpg" alt="${template.title}"  width="100" height="100" >
        `;
    
  });
  frame++;}
}
//tile max is 5 cuz grid is 5.Adjust it when used
loadTemplates(0,5);

//check if user is logged in
function isUserLoggedIn() {
  return localStorage.getItem("user-name") !== null? true : false;
}

//download function
//only for logged in users
let pendingDownload = null;

function downloadImage() {
  if (!isUserLoggedIn()) {
    alert("Please login to download this template.");
    pendingDownload = document.getElementById("modal-image").src;
    showForm("login");
    return;
  }

  startDownload(document.getElementById("modal-image").src);

}

function startDownload(imageSrc) {
  const link = document.createElement("a");
  link.href = imageSrc;
  link.download = "template-image.jpg";//file will be saved as that name.
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
