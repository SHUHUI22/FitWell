const bsModal = new bootstrap.Modal(document.getElementById('editModal'));

const activityData = [
  {
    date: "16 Apr",
    type: "Cycling",
    detail: "15.2 km",
    time: "45 min",
    calories: "428 kcal"
  },
  {
    date: "15 Apr",
    type: "Yoga",
    detail: "Vinyasa",
    time: "30 min",
    calories: "90 kcal"
  }
];

const activityContainer = document.getElementById("activityHistory");
activityContainer.innerHTML = '<h2 class="fw-bold mb-4">Activity History</h2>';

let currentDate = "";
activityData.forEach((activity, index) => {
  if (activity.date !== currentDate) {
    const dateHeading = document.createElement("div");
    dateHeading.innerHTML = `<strong>${activity.date}</strong>`;
    dateHeading.classList.add("mb-2", "mt-3");
    activityContainer.appendChild(dateHeading);
    currentDate = activity.date;
  }

  //Create Activity Card
  const activityCard = document.createElement("div");
  activityCard.className = "mb-3 p-3 border rounded d-flex align-items-center justify-content-between flex-wrap history-card";

  activityCard.innerHTML = `
    <div class="d-flex align-items-center gap-3 flex-wrap">
      <i class="fas fa-${getIcon(activity.type)} me-3 fs-4"></i>
      <div><strong>${activity.type}</strong></div>
      <i class="fas ${getDetailIcon(activity.type)}"></i>
      <span class="detail">${activity.detail}</span>
      <i class="fas fa-stopwatch"></i> <span class="time">${activity.time}</span>
      <i class="fas fa-fire"></i> <span class="calories">${activity.calories}</span>
    </div>
    <div class="d-flex">
      <button class="btn btn-outline-success btn-sm me-2 btn-edit">
        <i class="fas fa-pen"></i>
      </button>
      <button class="btn btn-outline-danger btn-sm btn-delete">
        <i class="fas fa-trash"></i>
      </button>
    </div>
  `;

  // Append to container
  activityContainer.appendChild(activityCard);

  // Attach event listeners
  const btnEdit = activityCard.querySelector(".btn-edit");
  const btnDelete = activityCard.querySelector(".btn-delete");

  //Edit Button
  btnEdit.addEventListener("click", () => {
    const detailInput = document.getElementById("editDetail");
    const timeInput = document.getElementById("editTime");
    const calInput = document.getElementById("editCalories");
    const detailLabel = document.getElementById("detailLabel");

    // Pre-fill values
    detailLabel.textContent = `Enter ${getDetailLabel(activity.type)}:`;
    detailInput.value = activity.detail;
    timeInput.value = activity.time;
    calInput.value = activity.calories;

    // Show the modal
    bsModal.show();

    // Save handler
    const saveBtn = document.getElementById("saveEdit");
    const handleSave = () => {
      const newDetail = detailInput.value;
      const newTime = timeInput.value;
      const weight = 60; // default, later fetch from database
      const duration = parseFloat(newTime.replace(/[^\d.]/g, ""));

      activity.detail = newDetail;
      activity.time = newTime;
      activity.calories = getCaloriesBurned(activity.type.toLowerCase(), duration, weight) + " kcal";

      activityCard.querySelector(".detail").textContent = newDetail;
      activityCard.querySelector(".time").textContent = activity.time;
      activityCard.querySelector(".calories").textContent = activity.calories;

      bsModal.hide();
      saveBtn.removeEventListener("click", handleSave);
    };

    saveBtn.addEventListener("click", handleSave);
  });

  //Delete Button
  btnDelete.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this activity?")) {
      activityCard.remove();

    // Check if any other cards exist with the same date
    const otherCardsWithSameDate = Array.from(activityContainer.querySelectorAll(".history-card")).some(card => {
      const heading = card.previousElementSibling;
      return heading && heading.textContent === activity.date;
    });

    // If no more activities for that date, remove the heading
    if (!otherCardsWithSameDate) {
      const headings = activityContainer.querySelectorAll("div.mb-2.mt-3");
      headings.forEach(heading => {
        if (heading.textContent === activity.date) {
          heading.remove();
        }
      });
    }
    }
  });
});

function getIcon(type) {
  switch (type.toLowerCase()) {
    case 'cycling':
      return 'person-biking';
    case 'running':
      return 'person-running';
    case 'walking':
      return 'person-walking';
    case "aerobic":
      return "heart-pulse";
    case "yoga":
      return "person-praying";
    case "zumba":
      return "fa-music";
    default: return 'dumbbell';
  }
}

function getDetailLabel(type) {
  switch (type.toLowerCase()) {
    case "cycle": return "Distance";
    case "run": return "Steps";
    case "aerobic": return "Type";
    case "yoga": return "Type";
    case "zumba": return "Intensity";
  }
}

function getDetailIcon(type) {
  switch (type.toLowerCase()) {
    case "cycling": return "fa-location-dot";
    case "running": return "fa-shoe-prints";
    case "aerobic": return "fa-circle-info";
    case "yoga": return "fa-circle-info";
    case "zumba": return "fa-circle-info";
  }
}

function getCaloriesBurned(type, duration, weight) {
  const MET_VALUES = {
    cycling: 9.5,
    running: 9.8,
    aerobic: 6.83,
    yoga: 3.0,
    zumba: 4.5
  };

  const met = MET_VALUES[type] || 5;
  const hours = duration / 60;

  const calories = met * weight * hours;
  return Math.round(calories);
}

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
