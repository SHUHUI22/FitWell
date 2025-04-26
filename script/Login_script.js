// Animation: slide out welcome message when hover
const leftSide = document.getElementById('left_side');
const overlay = document.getElementById('hover_overlay');
const message = document.getElementById('welcome_message');

leftSide.addEventListener('mouseenter', () => {
    overlay.style.transform = 'translateX(0)';
    message.style.opacity = '1';
    message.style.transform = 'translateX(0)';
});

leftSide.addEventListener('mouseleave', () => {
    overlay.style.transform = 'translateX(-100%)';
    message.style.opacity = '0';
    message.style.transform = 'translateX(-50px)';
});

// Password toggle
const togglePasswords = document.querySelectorAll('.togglePassword');

togglePasswords.forEach(function(toggle) {
    toggle.addEventListener('click', function() {
        const inputField = this.previousElementSibling; // The input field is always the previous sibling to the icon
        const type = inputField.getAttribute('type') === 'password' ? 'text' : 'password';
        inputField.setAttribute('type', type);
        
        // Toggle the eye icon
        const icon = this.querySelector('i');
        icon.classList.toggle('fa-eye');
        icon.classList.toggle('fa-eye-slash');
    });
});

// Login 
const btn_login = document.querySelector("#btn_login");
btn_login.addEventListener("click", function(e){
    e.preventDefault();
    handleLogin();
});

function handleLogin(){
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    if (validateLogin(email, password)){
        localStorage.setItem("loggedIn", "true");
        window.location.href="LandingPage.html";
    }
    else{
        alert("Invalid credentials");
    }
}

// EXAMPLE credentials
function validateLogin(email, password){
    return email === "user@gmail.com" && password === "User123456";
}