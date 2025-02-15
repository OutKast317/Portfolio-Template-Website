//by stzk
// Dropdown for Category(add new and fixed)
document.getElementById("category-btn").addEventListener("click", function() {
  document.getElementById("category-dropdown").classList.toggle("show");
});


// Close dropdown if clicked outside
window.addEventListener("click", function(event) {
  if (!event.target.matches("#category-btn")) {
      document.getElementById("category-dropdown").classList.remove("show");
  }
});


document.addEventListener("DOMContentLoaded", function () {
  // Modal elements
  const modalOverlay = document.getElementById("modal-overlay");
  const loginForm = document.getElementById("loginForm");
  const signUpForm = document.getElementById("signUpForm");
  const formTitle = document.getElementById("form-title");
  const toggleForm = document.getElementById("toggle-form");

  // Show login/signup form
  window.showForm = function (formType) {
    if (formType === "login") {
      loginForm.classList.remove("hidden");
      signUpForm.classList.add("hidden");
      formTitle.textContent = "Login";
      toggleForm.innerHTML = `Don't have an account? <a href="javascript:void(0);" onclick="showForm('signup')">Sign Up</a>`;
    } else if (formType === "signup") {
      signUpForm.classList.remove("hidden");
      loginForm.classList.add("hidden");
      formTitle.textContent = "Sign Up";
      toggleForm.innerHTML = `Already have an account? <a href="javascript:void(0);" onclick="showForm('login')">Log In</a>`;
    }

    modalOverlay.classList.remove("hidden"); // Show modal
  };

  // Close modal
  window.closeModal = function () {
    modalOverlay.classList.add("hidden"); // Hide modal
  };
});
