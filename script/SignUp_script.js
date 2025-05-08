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

// // Password toggle
// const togglePasswords = document.querySelectorAll('.togglePassword');

// togglePasswords.forEach(function(toggle) {
//     toggle.addEventListener('click', function() {
//         const inputField = this.previousElementSibling; // The input field is always the previous sibling to the icon
//         const type = inputField.getAttribute('type') === 'password' ? 'text' : 'password';
//         inputField.setAttribute('type', type);
        
//         // Toggle the eye icon
//         const icon = this.querySelector('i');
//         icon.classList.toggle('fa-eye');
//         icon.classList.toggle('fa-eye-slash');
//     });
// });

 // Validate the password
 const passwordInput = document.getElementById("password");
 const confirmPasswordInput = document.getElementById("confirm_password");
 const passwordError = document.getElementById("passwordError");
 const confirmPasswordError = document.getElementById("confirmPasswordError");

 function validatePassword() {
     const password = passwordInput.value;
     const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
     if (!passwordPattern.test(password)) {
        passwordError.classList.remove("d-none");
     } else {
        passwordError.classList.add("d-none");
     }
 }

 function validateConfirmPassword() {
     const password = passwordInput.value;
     const confirmPassword = confirmPasswordInput.value;
     if (password !== confirmPassword) {
        confirmPasswordError.classList.remove("d-none");
     } else {
        confirmPasswordError.classList.add("d-none");
     }
 }

 passwordInput.addEventListener("input", validatePassword);
 confirmPasswordInput.addEventListener("input", validateConfirmPassword);