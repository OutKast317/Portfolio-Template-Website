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
//data for account and json database
localStorage.clear();
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
    //username = document.getElementById(`${formType}-username`).value;
    //password = document.getElementById(`${formType}-password`).value;
    const errorMessage = document.getElementById(`${formType}-error-message`);
  
    //for DOM manipulation
    //before displaying error message, check if the element(error message) exists
    //if it doesn't exist, console mhr error message log ml
    //if it exists, display the error message
    
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
      jsonData = {
        name: username,
        pwd: password
      };
      jsonFileName = `${username}.json`;
      //uploadJSON(jsonData,jsonFileName);
      uploadData(jsonData,errorMessage);
        
    }
    localStorage.setItem("isLogin", true);
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
//json and api 
//github api
/*
function uploadJSON(jsonData,filename) {
  const jsonObject = jsonData; 
  
  // Convert the JSON object to a JSON string
  const jsonString = JSON.stringify(jsonObject);

  // Base64 encode the JSON data
  const encodedContent = btoa(jsonString);
  
  const username = 'Isnotavailble';
  const repository = 'FakeDatabase';
  const path = `data/${filename}`; // Path where the file will be uploaded
  const branch = 'main'; 
  const token = 'api_key';//api token

  const url = `https://api.github.com/repos/${username}/${repository}/contents/${path}`;

  fetch(url, {
      method: 'PUT',
      headers: {
          'Authorization': `token ${token}`,
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          message: 'Upload JSON file',
          content: encodedContent,
          branch: branch
      })
  })
  .then(response => {
      if (response.ok) {
          return response.json();
      }
      return response.json().then(error => {
          
          throw new Error(error);
      });
  })
  .then(data => {

      closeModal();
      console.log('File uploaded:', data);
  })
  .catch(error => {
    animation_load();
    alert("There was a problem with network!");
    setTimeout(function (){
      animation_close();
      errorMessage.style.color = 'red';
      errorMessage.textContent = 'Somthing was wrong!'; },4000);
      console.error('Error uploading file:', error);
  });
}

// for reading json file from github through api
// URL of the JSON file
function readJson(filename,errorMessage,name,pwd){
  
  const url = `https://raw.githubusercontent.com/Isnotavailble/FakeDatabase/main/data/${filename}`; 
  fetch(url)
      .then(response => {
          
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          
          return response.json();
      })
      .then(data => {
           if (name === data.name && pwd === data.pwd){
            console.log("login successful");
            closeModal();
            localStorage.setItem("isLogin", true);
          
           }
          else{
            throw new Error('Network response was not ok');
          } 
          
      })
      
      .catch(error => {
        animation_load();
        setTimeout(function (){
          animation_close();
          errorMessage.style.color = 'red';
          errorMessage.textContent = 'Invalid username or password.'; },4000);   
        console.error('Error fetching the JSON file:', error);
      });
      
  }*/

// Using Google sheet as FakeDataBasabase
//upload json object to google sheet
function uploadData(jsonData,errorMessage) {
  const url = 'https://script.google.com/macros/s/AKfycbyeVnr4Fg8ubit6jAtfcrvx68145bJjFNehhQHRFAL2552X_URN4CkcHC76GKm_rIRl9Q/exec';
  const data = new URLSearchParams({
    name: jsonData.name,
    age: jsonData.pwd,
  });
  
  fetch(url, {
    method: 'POST',
    body: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then(response => response.text())
  .then(result => {
    errorMessage.textContent = ' ';
    console.log(result);
    closeModal();
    localStorage.setItem("isLogin" , true);
})
  .catch(error => {
    animation_load();
        setTimeout(function (){
          animation_close();
          errorMessage.style.color = 'red';
          errorMessage.textContent = "There was a problem in connection!"; },4000); 
    console.error('Error:', error)});
  }

  // login with google sheet 
  function getData(user_name,user_pwd,errorMessage){
  const url = 'https://script.google.com/macros/s/AKfycbwgd62_4_7mHHC-IJF_CeF78Z2OUJxxgYeP7KXpMnPE8y1hli6x5qzqy_ereZjkp5E_bQ/exec';
  
  fetch(url, {
    method: 'GET'
  })
  .then(response =>  response.json())
  .then(data => {

    let login = false;
    for (let x in data){
      if (data[x].name === user_name && data[x].pwd.toString() === user_pwd){
        login = true;
      }
    }

    if (!login) { 
      throw new Error ("Error");}
    else {
      localStorage.setItem("isLogin" , true);
      closeModal();
      console.log("login successful!");}
  
  })
  .catch(error => {
    animation_load();
        setTimeout(function (){
          animation_close();
          errorMessage.style.color = 'red';
          errorMessage.textContent = "Invaild username or password!"; },4000); 
    console.error('Error:', error)});
  }
  

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
