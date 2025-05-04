function showTab(tabId, event) {
  // Hide all tab contents
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(content => {
      content.classList.remove('active');
  });

  // Remove active class from all tabs
  const tabs = document.querySelectorAll('.tab');
  tabs.forEach(tab => {
      tab.classList.remove('active');
  });

  // Show the selected tab content
  document.getElementById(tabId).classList.add('active');

  // Add active class to the clicked tab
  if (event && event.currentTarget) {
      event.currentTarget.classList.add('active');
  }
}

document.addEventListener('DOMContentLoaded', function () {
  const categoryOptions = document.querySelectorAll('.category-option');
  const form = document.getElementById('reminderForm');
  const reminderList = document.getElementById('reminder-list');
  const emptyState = document.getElementById('empty-state');
  const toggleButton = document.getElementById('toggle-demo');
  const tabs = document.querySelectorAll('.tab');

  let hasReminders = false;

  // Toggle between empty and filled states
  function toggleView() {
      hasReminders = !hasReminders;
      emptyState.style.display = hasReminders ? 'none' : 'block';
      reminderList.style.display = hasReminders ? 'block' : 'none';
  }

  // Handle category option selection
  function updateSelection() {
      categoryOptions.forEach(option => {
          const radio = option.querySelector('input[type="radio"]');
          if (radio.checked) {
              option.classList.add('selected');
          } else {
              option.classList.remove('selected');
          }
      });
  }

  categoryOptions.forEach(option => {
      option.addEventListener('click', function () {
          const radio = this.querySelector('input[type="radio"]');
          radio.checked = true;
          updateSelection();
      });
  });

  updateSelection(); // On load

  // Handle form submission
  if (form) {
      form.addEventListener('submit', function (event) {
          event.preventDefault();

          const title = document.getElementById('title').value.trim();
          const categoryInput = document.querySelector('input[name="category"]:checked');
          const category = categoryInput ? categoryInput.value : '';
          const date = document.getElementById('date').value;
          const time = document.getElementById('time').value;

          if (!title || !category || !date || !time) {
              alert('Please fill in all required fields');
              return;
          }

          // Create a new reminder element
          const newItem = document.createElement('div');
          newItem.classList.add('reminder-item');
          newItem.innerHTML = `
              <div class="reminder-title">${title}</div>
              <div class="reminder-details">
                  <div class="reminder-category ${category.toLowerCase()}">${category}</div>
                  <div class="reminder-date-time">${date} at ${time}</div>
              </div>
          `;
          reminderList.appendChild(newItem);

          showTab('my', null);
          form.reset();
          updateSelection();

          alert('Reminder saved successfully!');
          hasReminders = true;
          toggleView();
      });
  }

  // Setup toggle button
  if (toggleButton) {
      toggleButton.addEventListener('click', toggleView);
  }

  // Set default state on load
  toggleView();

  // Optional: handle tab switching styling
  tabs.forEach(tab => {
      tab.addEventListener('click', function () {
          tabs.forEach(t => t.classList.remove('active'));
          this.classList.add('active');
      });
  });
});



