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
    
    showIcon.style.display = 'none';
    hideIcon.style.display = 'block';

    } else {
    passwordInput.type = 'password';
 
    showIcon.style.display = 'block';
    hideIcon.style.display = 'none';
  }
}


//by stzk
// Dropdown for Category(add new and fixed)
try {
document.getElementById("category-btn").addEventListener("click", function() {
  document.getElementById("category-dropdown").classList.toggle("show");
});

// Dropdown for User Icon
document.getElementById("user-btn").addEventListener("click", function() {
  document.getElementById("user-dropdown").classList.toggle("show");
});

// Close dropdown if clicked outside
window.addEventListener("click", function(event) {
  if (!event.target.matches("#category-btn")) {
      document.getElementById("category-dropdown").classList.remove("show");
  }
  if (!event.target.matches("#user-btn")) {
      document.getElementById("user-dropdown").classList.remove("show");
  }
});}
catch(error){
  console.log("System error!");
}

// Show login/signup form
function showForm(formType) {
  const modalOverlay = document.getElementById("modal-overlay");
  const loginForm = document.getElementById("loginForm");
  const signUpForm = document.getElementById("signUpForm");
  const formTitle = document.getElementById("form-title");
  const toggleForm = document.getElementById("toggle-form");

  if (formType === 'login') {
      loginForm.classList.remove("hidden");
      signUpForm.classList.add("hidden");
      formTitle.textContent = "Login";
      toggleForm.innerHTML = `Don't have an account? <a href="javascript:void(0);" onclick="showForm('signup')">Sign Up</a>`;
  } else if (formType === 'signup') {
      signUpForm.classList.remove("hidden");
      loginForm.classList.add("hidden");
      formTitle.textContent = "Sign Up";
      toggleForm.innerHTML = `Already have an account? <a href="javascript:void(0);" onclick="showForm('login')">Log In</a>`;
  }

  modalOverlay.classList.remove("hidden");
}

// Close modal
function closeModal() {
  const modalOverlay = document.getElementById("modal-overlay");
  modalOverlay.classList.add("hidden");
}


//data for account and json database
//localStorage.clear();// if user refresh temp data will be cleared
logout_button_handling();

let username = " ";
let password = 0;
let jsonData = {};
let jsonFileName = " ";
let account = {};
function formHandling(formType) {

  return function (event) {
    event.preventDefault();
    username = " ";
    jsonFileName = " "; 
    password = 0;
    const errorMessage = document.getElementById(`${formType}-error-message`);
    

    if (formType === 'login') {
        
      let inputUsername = document.getElementById('login-username').value;
      let inputPassword = document.getElementById('login-password').value;
      username = inputUsername;
      password = inputPassword;
      //readJson(`${inputUsername}.json`,errorMessage,inputUsername,inputPassword);//all done in that. check it!
      getData(username,password,errorMessage);
  }
    if (formType === 'signup') {
      let newUsername = document.getElementById('signup-username').value;
      let newPassword = document.getElementById('signup-password').value;
      username = newUsername;
      password = newPassword;
      const confirmPasswordElement = document.getElementById('confirm-password').value;
      const confirmPassword = confirmPasswordElement === password? true : false;

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
      jsonData = {
        name: username,
        pwd: password
      };
      jsonFileName = `${username}.json`;
      //uploadJSON(jsonData,jsonFileName);
      uploadData(jsonData,errorMessage);//signup
    }
    if(formType === 'logout'){
      logOut(event);
    }
  
    
  };
}

const loginForm = document.getElementById('loginForm');
const signUpForm = document.getElementById('signUpForm');


if (loginForm) {
    loginForm.addEventListener('submit',formHandling('login'));
}

if (signUpForm) {
    signUpForm.addEventListener('submit',formHandling('signup'));
}

//logout form
//for logout button
function logout_button_handling(){
  const Logout = document.getElementById("logout");

  if (isUserLoggedIn()) {
    Logout.style.display = "block";
  }
  else{
    Logout.style.display = "none";

  }

}
const logout = document.getElementById("logout");
logout.style.display = "none";
if (logout) {
  logout.addEventListener("click", (formHandling("logout")));
}

function logOut(event){
  event.preventDefault();
  localStorage.removeItem("isLogin");
  localStorage.removeItem("username");
  setUsername("Guest");
  alert("You have been logged out.");
  console.log("logout successful!");
  logout_button_handling();
}


// Using Google sheet as Database
//upload json object to google sheet
function uploadData(jsonData,errorMessage) {
  let info = "There was a problem in connection!";
  const url = 'https://script.google.com/macros/s/AKfycbw0bNdRu8A9cffpvY9gKf4RbsAvxgSp3TZUUmgZmMWKiRo28IS8FTZ1X-YD2IyGsvp18Q/exec';
  const data = new URLSearchParams({
    name: jsonData.name,
    pwd: jsonData.pwd
  });
  animation_load();
  fetch(url, {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then(response => response.text())
  .then(result => {
    console.log(result);
    if (result === 'Data uploaded successfullynew version'){
      
      localStorage.setItem("isLogin" , true);
      localStorage.setItem("username", jsonData.name);
      setUsername(jsonData.name);
      //logout.style.display = "block";
      logout_button_handling();
      closeModal();
      animation_close();
    }
    else {
      info = "Already exist!";
      throw new Error ("Already exist");
    }
})
  .catch(error => {
    animation_close();
    errorMessage.style.color = 'red';
    errorMessage.textContent = info;
    console.error('Error:', error)});
  }

// login with google sheet 
function getData(user_name, user_pwd, errorMessage) {
  let info = "There was a problem in connection!";
  let user_data = new URLSearchParams({input : user_name}).toString();
  const url = 'https://script.google.com/macros/s/AKfycbw0bNdRu8A9cffpvY9gKf4RbsAvxgSp3TZUUmgZmMWKiRo28IS8FTZ1X-YD2IyGsvp18Q/exec?' + user_data;
    animation_load(); 
    
    fetch(url, {
        method: 'GET'
    
    })
    .then(response => {
      if (!response.ok){
        throw new Error("Error");
      }
      return response.json();
    })
    .then(data => {
        let login = false;
        for (let x in data) {
            if (data[x].name === user_name && data[x].pwd.toString() === user_pwd) {
                login = true;
            }
        }

        if (!login) {
            info = "Invalid username or password";
            throw new Error(info);
        } else {
          animation_close();
            localStorage.setItem("isLogin", true);
            localStorage.setItem("username", user_name); // Store username in localStorage
            setUsername(user_name); // Set the username in the UI
            closeModal();
            logout_button_handling();
            //logout.style.display = "block";
            console.log("login successful!");
        }
    })
    .catch(error => {
      animation_close(); 
      errorMessage.style.color = 'red';
      errorMessage.textContent = info;
      console.error('Error:', error);
    });
}

// UI mhr username display yan
function setUsername(username) {
  const usernameDisplay = document.getElementById("username-display");
  if (usernameDisplay) {
    usernameDisplay.textContent = username;
  }
}


// Check if user is logged in and set the username on page load
document.addEventListener("DOMContentLoaded", () => {
    if (isUserLoggedIn()) {
        const username = localStorage.getItem("username");
        setUsername(username);
    }
});

//check the account


//for loading animation 
function animation_load(){
  let modal = document.querySelector(".loading-modal");
  modal.style.display = "flex";
}
function animation_close(){
  let modal = document.querySelector(".loading-modal");
  modal.style.display = "none";
}

//search bar
try {
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

});}
catch (error){
  console.log("There is no search bar");
}


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


function loadTemplates(row) {
  try {
    //row = y,tile = x
    let frame = 1;
    let index = 0;
    const templateContainer = document.getElementsByClassName("template-grid");//adjust 
    let containers = templateContainer[row].childElementCount;// map the number of containers at row div
    let container = document.getElementsByClassName("template-box");// map all containers
    index = row * 5; 
    //check for number of photo in folders

        for (let x in templateSection){
          let template = templateSection[x];
          for (let i = 0; i < 5 ; i++) {
              container[index].innerHTML = `
              <img src="IMG/${template.title}/${template.title}_${frame}${template.image}" alt="${template.title}" width="100" height="100">`;
              
              frame++;index++;
              if (frame > 5){frame = 1;}

        }
      }
      
} catch (error) {
      console.log("There is no images");
    }
}  


//check if user is logged in
function isUserLoggedIn() {
  return localStorage.getItem("isLogin") !== null? true : false;
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

const loginHandler = (event) => {
  event.preventDefault();
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;
  const errorMessage = document.getElementById("login-error-message");

  getData(username, password, errorMessage);

  localStorage.setItem("isLogin", true);
  localStorage.setItem("username", username);
  setUsername(username);

};


//login/signup/logout handling function
function handleAuthentication(action, retryCount = 0, maxRetries = 3) {
  try {
    if (action === "login") {
      const username = document.getElementById("login-username").value;
      const password = document.getElementById("login-password").value;
      const errorMessage = document.getElementById("login-error-message");
      //getData(username, password, errorMessage);
    
      if (!username || !password) {
        errorMessage.textContent = "Please fill in all fields.";
        errorMessage.style.color = "red";
        return;
      }
    
      getData(username, password, errorMessage, () => {
        localStorage.setItem("isLogin", true);
        localStorage.setItem("username", username);
        setUsername(username);
        closeModal();
      });
    } else if (action === "signup") {
      const username = document.getElementById("signup-username").value;
      const password = document.getElementById("signup-password").value;
      const confirmPassword = document.getElementById("confirm-password").value;
      const errorMessage = document.getElementById("signup-error-message");
    
      if (!username || !password || !confirmPassword) {
        errorMessage.textContent = "Please fill in all fields.";
        errorMessage.style.color = "red";
        return;
      }
      
      if (password !== confirmPassword) {
        errorMessage.textContent = "Passwords do not match.";
        errorMessage.style.color = "red";
        return;
      }
      
      if (password.length < 6) {
        errorMessage.textContent = "Password must be at least 6 characters.";
        errorMessage.style.color = "red";
        return;
      }

      uploadData({ name: username, pwd: password }, errorMessage, () => {
        localStorage.setItem("isLogin", true);
        localStorage.setItem("username", username);
        setUsername(username);
        closeModal();
      });
    } else if (action === "logout") {
      localStorage.removeItem("isLogin");
      localStorage.removeItem("username");
      setUsername("Guest");
      alert("You have been logged out.");
      location.reload();
    }
  }
  catch(error){
    console.error(`Error during ${action}:`, error);
    if (retryCount < maxRetries) {
      console.log(`Retrying ${action}... Attempt ${retryCount + 1}`);
      setTimeout(() => handleAuth(action, retryCount + 1, maxRetries), 1000);//delay 1 sec
    } else {
      console.error(`Max retries reached for ${action}.`);
    }
  }
}

// recursive function to load templates 
function loadTemplates(templates, retryCount = 0, maxRetries = 3) {
  try {
    const templateContainer = document.querySelector(".template-grid");
    if (!templateContainer) {
      throw new Error("Template container not found.");
    }

    // Clear existing templates
    templateContainer.innerHTML = "";

    // Load each template
    templates.forEach((template) => {
      const templateBox = document.createElement("div");
      templateBox.classList.add("template-box");

      templateBox.innerHTML = `
        <img src="${template.image}" alt="${template.title}" width="100" height="100">
        <p>${template.title}</p>
        <p>${template.description}</p>
      `;

      templateContainer.appendChild(templateBox);
    });

    console.log("Templates loaded successfully!");
  } catch (error) {
    console.error("Error loading templates:", error);

    if (retryCount < maxRetries) {
      console.log(`Retrying template loading... Attempt ${retryCount + 1}`);
      setTimeout(() => loadTemplates(templates, retryCount + 1, maxRetries), 1000);
    } else {
      console.error("Max retries reached. Templates may not be available.");
    }
  }
}




