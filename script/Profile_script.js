document.addEventListener("DOMContentLoaded", function () {
    // Function to clean up modal styles
    function cleanModalBackdrop() {
        const backdrop = document.querySelector('.modal-backdrop');
        if (backdrop) backdrop.remove();
        document.body.classList.remove('modal-open');
        document.body.style.removeProperty('padding-right');
        document.body.style.removeProperty('overflow');
    }

    // Listen for modal close events and clean up backdrop
    const modals = ['updateProfileModal', 'changePasswordModal'];
    modals.forEach(modalId => {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.addEventListener('hidden.bs.modal', cleanModalBackdrop);
        }
    });

    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem("loggedIn");
    if (isLoggedIn === "true") {
        document.body.classList.add("logged-in");

        const showIds = [
            "nav_tracker", "nav_nutrition", "nav_progress", "nav_reminder", "nav_profile",
            "quicklink_tracker", "quicklink_progress", "quicklink_nutrition", "quicklink_reminder"
        ];
        showIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.remove("d-none");
        });

        const btn_login = document.querySelector("#btn_login");
        const btn_signup = document.querySelector("#btn_signup");
        const btn_get_started = document.querySelector("#btn_get_started");

        if (btn_login) btn_login.classList.add("d-none");
        if (btn_signup) btn_signup.classList.add("d-none");
        if (btn_get_started) btn_get_started.classList.add("d-none");
    }

    // Retrieve profile info from localStorage
    const email = localStorage.getItem("userEmail") || "user@gmail.com";
    const age = localStorage.getItem("userAge") || "20";
    const gender = localStorage.getItem("userGender") || "Male";
    const height = localStorage.getItem("userHeight") || "1.68"; // Numeric value only, no "m"
    const weight = localStorage.getItem("userWeight") || "55"; // Numeric value only, no "kg"
    const bodyFat = localStorage.getItem("userBodyFat") || "25"; // Numeric value only, no "%"

    // Populate profile info on page
    const profileFields = document.querySelectorAll(".profile .info-row span:last-child");
    if (profileFields.length >= 6) {
        profileFields[0].textContent = email;
        profileFields[1].textContent = age;
        profileFields[2].textContent = gender;
        profileFields[3].textContent = `${height} m`;
        profileFields[4].textContent = `${weight} kg`;
        profileFields[5].textContent = `${bodyFat} %`;
    }

    // Show the update profile modal and populate with existing profile data
    const updateProfileButton = document.querySelector("#updateProfile");
    if (updateProfileButton) {
        updateProfileButton.addEventListener("click", () => {
            const modal = new bootstrap.Modal(document.getElementById("updateProfileModal"));
            document.getElementById("modalEmail").value = email;
            document.getElementById("modalAge").value = age;
            document.getElementById("modalGender").value = gender;
            document.getElementById("modalHeight").value = height; // Numeric value
            document.getElementById("modalWeight").value = weight; // Numeric value
            document.getElementById("modalBodyFat").value = bodyFat; // Numeric value
            modal.show();
        });
    }

    // Save the profile changes after the modal is closed
    const saveProfileChangesButton = document.getElementById("saveProfileChanges");
    if (saveProfileChangesButton) {
        saveProfileChangesButton.addEventListener("click", () => {
            const newEmail = document.getElementById("modalEmail").value;
            const newAge = document.getElementById("modalAge").value;
            const newGender = document.getElementById("modalGender").value;
            const newHeight = parseFloat(document.getElementById("modalHeight").value);
            const newWeight = parseFloat(document.getElementById("modalWeight").value);
            const newBodyFat = parseFloat(document.getElementById("modalBodyFat").value);

            // Save the updated values to localStorage
            localStorage.setItem("userEmail", newEmail);
            localStorage.setItem("userAge", newAge);
            localStorage.setItem("userGender", newGender);
            localStorage.setItem("userHeight", newHeight);
            localStorage.setItem("userWeight", newWeight);
            localStorage.setItem("userBodyFat", newBodyFat);

            // Close the modal and clean up the backdrop
            const modal = bootstrap.Modal.getInstance(document.getElementById("updateProfileModal"));
            modal.hide();

            // Reload to reflect the changes
            location.reload();
        });
    }

    // Change password functionality
    const changePasswordButton = document.getElementById("changePassword");
    if (changePasswordButton) {
        changePasswordButton.addEventListener("click", () => {
            const changePasswordModal = new bootstrap.Modal(document.getElementById("changePasswordModal"));
            changePasswordModal.show();
        });
    }

    // Validate the password change form
    const newPasswordInput = document.getElementById("newPassword");
    const confirmNewPasswordInput = document.getElementById("confirmNewPassword");
    const newPasswordError = document.getElementById("newPasswordError");
    const confirmNewPasswordError = document.getElementById("confirmNewPasswordError");

    function validatePassword() {
        const password = newPasswordInput.value;
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
        if (!passwordPattern.test(password)) {
            newPasswordError.classList.remove("d-none");
        } else {
            newPasswordError.classList.add("d-none");
        }
    }

    function validateConfirmPassword() {
        const password = newPasswordInput.value;
        const confirmPassword = confirmNewPasswordInput.value;
        if (password !== confirmPassword) {
            confirmNewPasswordError.classList.remove("d-none");
        } else {
            confirmNewPasswordError.classList.add("d-none");
        }
    }

    newPasswordInput.addEventListener("input", validatePassword);
    confirmNewPasswordInput.addEventListener("input", validateConfirmPassword);

    // Save new password
    const saveNewPasswordButton = document.getElementById("saveNewPassword");
    if (saveNewPasswordButton) {
        saveNewPasswordButton.addEventListener("click", () => {
            validatePassword();
            validateConfirmPassword();

            // If no errors, save the new password
            if (newPasswordError.classList.contains("d-none") && confirmNewPasswordError.classList.contains("d-none")) {
                const newPassword = newPasswordInput.value;
                localStorage.setItem("userPassword", newPassword);

                // Close the modal and clean up the backdrop
                const changePasswordModal = bootstrap.Modal.getInstance(document.getElementById("changePasswordModal"));
                changePasswordModal.hide();

                // Optionally reload to reflect the changes
                location.reload();
            }
        });
    }

    // Logout functionality
    const btn_logout = document.querySelector("#btn_logout");
    if (btn_logout) {
        btn_logout.addEventListener("click", function () {
            localStorage.clear();
            setTimeout(function () {
                window.location.href = "Login.html";
            }, 500);
        });
}
});
