const btn_login = document.querySelector("#btn_login");
const btn_signup = document.querySelector("#btn_signup");
const btn_get_started = document.querySelector("#btn_get_started");

btn_login.addEventListener("click", function(){
    window.location.href = "Login.html";
});

btn_signup.addEventListener("click", function(){
    window.location.href = "SignUp.html";
});

btn_get_started.addEventListener("click", function(){
    window.location.href = "Login.html";
});

// Landing Page after logged in
window.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelector(".navbar");
    const features = document.querySelectorAll(".card");
    const isLoggedIn = localStorage.getItem("loggedIn");
  
    if (isLoggedIn === "true") {
        document.body.classList.add("logged-in");

        // Show the hidden nav items
        document.getElementById("nav_tracker").classList.remove("d-none");
        document.getElementById("nav_nutrition").classList.remove("d-none");
        document.getElementById("nav_progress").classList.remove("d-none");
        document.getElementById("nav_reminder").classList.remove("d-none");
        document.getElementById("nav_profile").classList.remove("d-none");
        document.getElementById("quicklink_tracker").classList.remove("d-none");
        document.getElementById("quicklink_progress").classList.remove("d-none");
        document.getElementById("quicklink_nutrition").classList.remove("d-none");
        document.getElementById("quicklink_reminder").classList.remove("d-none");

        // Hide login/signup buttons
        btn_login.classList.add("d-none");
        btn_signup.classList.add("d-none");
        btn_get_started.classList.add("d-none");

        const buttons = document.querySelectorAll(".btn_feature");
        
        buttons.forEach(button => {
        button.addEventListener("click", function() {
            const card = button.closest(".card");
            const link = card.getAttribute("data-link");
            
            console.log("Redirecting to:", link); // Check console
            window.location.href = link; // Redirect
        });
    });
    }
});

// Highlighting the nav link on click
const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(link => {
        link.addEventListener("click", function () {
            navLinks.forEach(nav => nav.classList.remove("active"));
            this.classList.add("active");
        });
});

// Highlight nav link when scrolling
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('main section');
    const navLinks = document.querySelectorAll('.nav-link');

    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});
  
// Log out
const btn_logout = document.querySelector("#btn_logout");
btn_logout.addEventListener("click", logout);

function logout() {
    // Retain the 'mealFavourites' in localStorage, clear other data
    const favourites = localStorage.getItem('mealFavourites');

    // Clear all other data in localStorage
    localStorage.clear();

    // Restore the 'mealFavourites' back to localStorage
    if (favourites) {
        localStorage.setItem('mealFavourites', favourites);
    }

    // Redirect after a slight delay
    setTimeout(function () {
        window.location.href = "Login.html";
    }, 500);
}