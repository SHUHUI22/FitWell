document.addEventListener("DOMContentLoaded", function () {
    const nav = document.querySelector(".navbar");
    const features = document.querySelectorAll(".card");
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
    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {
        const href = link.getAttribute("href");
        // Check if the href contains the current page name or ends with it
        if (href && (href.includes(currentPage) || href.endsWith(currentPage) || 
            (currentPage === "FitnessTracker.html" && href.includes("FitnessTracker.html")))) {
            link.classList.add("active");
            
            // Add green highlight for Progress Chart
            if (currentPage === "FitnessTracker.html") {
                link.classList.add("active-green");
            }
        }
    });

    //Handle logworkout form
    document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();
        
        const type = document.getElementById("workoutType").value;
        const duration = document.getElementById("duration").value;
        const date = document.getElementById("date").value;
        const distanceOrType = document.getElementById("distanceOrType").value;
    
        const workout = { type, duration, date, distanceOrType };
        
        // Store
        console.log("Logged Workout:", workout);
        alert("Workout recorded successfully!");
    
        // Clear inputs
        this.reset();
    });
    

// Example step count and goal
const currentSteps = 6800;
const goalSteps = 10000;
// Calculate percentage
const percent = currentSteps / goalSteps;
const radius = 90;
const circumference = 2 * Math.PI * radius;
const offset = circumference * (1 - percent);

// Apply to stroke-dashoffset
const progressCircle = document.querySelector('.streak-progress');
progressCircle.style.strokeDasharray = `${circumference}`;
progressCircle.style.strokeDashoffset = `${offset}`;

// Update text
document.getElementById('stepCount').textContent = currentSteps.toLocaleString();

});

// Log out
const btn_logout = document.querySelector("#btn_logout");
btn_logout.addEventListener("click",logout);

function logout() {
    localStorage.clear();
    setTimeout(function() {
        window.location.href = "Login.html";
    }, 500); 
}
  