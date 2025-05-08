document.addEventListener('DOMContentLoaded', function () {
    const remindersList = document.querySelector('#reminder-list');
    const emptyState = document.querySelector('#empty-state');

    if (remindersList) {

        // Function to update the visibility of the empty-state and the reminder list
        function updateEmptyState() {
            if (remindersList.querySelectorAll('.reminder-item').length === 0) {
                emptyState.style.display = 'block';
                remindersList.style.display = 'none';
            } else {
                emptyState.style.display = 'none';
                remindersList.style.display = 'block';
            }
        }

        // Ensure the empty state is correctly updated on page load
        updateEmptyState();

        // Event delegation for delete actions
        const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
        const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
        let reminderToDelete = null;
        remindersList.addEventListener('click', function (event) {
            const target = event.target;

            // Delete button clicked
            if (target.closest('.delete-btn')) {
                // Store the reminder to delete and show modal
                reminderToDelete = target.closest('.reminder-item');
                deleteModal.show();
            }
        });

        // Handle confirmed deletion
        confirmDeleteBtn.addEventListener('click', function () {
            if (reminderToDelete) {
                reminderToDelete.remove();
                updateEmptyState();
                deleteModal.hide();
                reminderToDelete = null; // Reset after deletion
            }
        });

    }

    const isLoggedIn = localStorage.getItem("loggedIn");

    // Check if user is logged in
    if (isLoggedIn === "true") {
        document.body.classList.add("logged-in");

        // Show the hidden nav and quicklink items
        const showIds = [
            "nav_tracker", "nav_nutrition", "nav_progress", "nav_reminder", "nav_profile",
            "quicklink_tracker", "quicklink_progress", "quicklink_nutrition", "quicklink_reminder"
        ];
        showIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.classList.remove("d-none");
        });

        // Hide login/signup/get-started buttons
        const btn_login = document.querySelector("#btn_login");
        const btn_signup = document.querySelector("#btn_signup");
        const btn_get_started = document.querySelector("#btn_get_started");

        if (btn_login) btn_login.classList.add("d-none");
        if (btn_signup) btn_signup.classList.add("d-none");
        if (btn_get_started) btn_get_started.classList.add("d-none");

        // Card feature redirection
        const buttons = document.querySelectorAll(".btn_feature");
        buttons.forEach(button => {
            button.addEventListener("click", function () {
                const card = button.closest(".card");
                const link = card.getAttribute("data-link");
                if (link) {
                    console.log("Redirecting to:", link);
                    window.location.href = link;
                }
            });
        });
    }

    // Automatically highlight the correct nav link based on current page
    const currentPage = window.location.pathname.split("/").pop();
    const navLinks = document.querySelector("#nav_reminder a");

    // Determine if we're on a Reminder-related page
    const isReminderPage = currentPage === "CreateReminder.html" || currentPage === "MyReminder.html";

    if (isReminderPage && navLinks) {
        navLinks.classList.add("active");
    }
});

// Log out
const btn_logout = document.querySelector("#btn_logout");
btn_logout.addEventListener("click", logout);

function logout() {
  // Retain the 'mealFavorites' in localStorage, clear other data
  const favorites = localStorage.getItem('mealFavourites');

  // Clear all other data in localStorage
  localStorage.clear();

  // Restore the 'mealFavorites' back to localStorage
  if (favorites) {
    localStorage.setItem('mealFavourites', favorites);
  }

  // Redirect after a slight delay
  setTimeout(function () {
    window.location.href = "Login.html";
  }, 500);
}
