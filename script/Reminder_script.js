function showTab(tabId, event) {
    // Hide all tab contents
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => content.classList.remove('active'));
  
    // Remove active class from all tabs
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
  
    // Show selected tab content
    document.getElementById(tabId).classList.add('active');
  
    // Add active class to the clicked tab
    if (event && event.currentTarget) {
      event.currentTarget.classList.add('active');
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const remindersList = document.querySelector('#reminder-list');
    const emptyState = document.querySelector('#empty-state'); // Empty state element

    // Function to update the visibility of the empty-state and the reminder list
    function updateEmptyState() {
        if (remindersList.querySelectorAll('.reminder-item').length === 0){
            emptyState.style.display = 'block';  // Show empty state when no reminders
            remindersList.style.display = 'none'; // Hide the list of reminders
        } else {
            emptyState.style.display = 'none';  // Hide empty state
            remindersList.style.display = 'block'; // Show the list of reminders
        }
    }

    // Ensure the empty state is correctly updated on page load
    updateEmptyState();

    // Event delegation for edit and delete actions
    remindersList.addEventListener('click', function(event) {
        const target = event.target;

        // Delete button clicked
        if (target.closest('.delete-btn')) {
            deleteReminder(target.closest('.reminder-item'));
        }

        // Edit button clicked
        else if (target.closest('.edit-btn')) {
            editReminder(target.closest('.reminder-item'));
        }
    });

    // Function to delete a reminder
    function deleteReminder(reminderItem) {
        reminderItem.remove(); // Remove the reminder item from the list
        updateEmptyState(); // Re-check if the list is empty after deletion
    }

    // Function to edit a reminder
    function editReminder(reminderItem) {
        const reminderText = reminderItem.querySelector('.reminder-text').textContent;
        alert('Edit: ' + reminderText);
        // You can replace this with a modal or prompt for actual editing
    }
});
