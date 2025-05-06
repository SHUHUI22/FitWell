const activityData = [
  {
    date: "16 Apr",
    type: "Cycle",
    distance: "15.2 km",
    time: "45 min",
    calories: "370 kcal"
  },
  {
    date: "16 Apr",
    type: "Run",
    distance: "5.4 km",
    time: "30 min",
    calories: "280 kcal"
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
  activityCard.className = "mb-3 p-3 border rounded d-flex align-items-center justify-content-between flex-wrap";

  activityCard.innerHTML = `
    <div class="d-flex align-items-center gap-3 flex-wrap">
      <i class="fas fa-${getIcon(activity.type)} me-3 fs-4"></i>
      <div><strong>${activity.type}</strong></div>
      <i class="fas fa-location-dot"></i> <span class="distance">${activity.distance}</span>
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
    const newDistance = prompt("Enter new distance (e.g., 12.5 km):", activity.distance);
    const newTime = prompt("Enter new time (e.g., 50 min):", activity.time);
    const newCalories = prompt("Enter new calories (e.g., 400 kcal):", activity.calories);

    if (newDistance && newTime && newCalories) {
      activity.distance = newDistance;
      activity.time = newTime;
      activity.calories = newCalories;

      activityCard.querySelector(".distance").textContent = newDistance;
      activityCard.querySelector(".time").textContent = newTime;
      activityCard.querySelector(".calories").textContent = newCalories;
    }
  });
  
  //Delete Button
  btnDelete.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this activity?")) {
      activityCard.remove();
    }
  });
});

function getIcon(type) {
  switch (type.toLowerCase()) {
    case 'cycle': 
      return 'person-biking';
    case 'run': 
      return 'person-running';
    case 'walk': 
      return 'person-walking';
    case "aerobic":
      return "fa-heart-pulse";
    case "yoga":
      return "fa-person-praying";
    case "zumba":
      return "fa-music";
    default: return 'dumbbell';
  }
}

// Log out
const btn_logout = document.querySelector("#btn_logout");
btn_logout.addEventListener("click", logout);

function logout() {
  localStorage.clear();
  setTimeout(function () {
    window.location.href = "Login.html";
  }, 500);
}
