document.addEventListener('DOMContentLoaded', function() { 
    const remindersList = document.querySelector('#reminder-list');
    const emptyState = document.querySelector('#empty-state'); 

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

    // Function to delete a reminder with confirmation
    function deleteReminder(reminderItem) {
        if (confirm("Are you sure you want to delete this reminder?")) {
            reminderItem.remove(); 
            updateEmptyState(); 
        }
    }

    // Function to edit a reminder
    function editReminder(reminderItem) {
        const reminderText = reminderItem.querySelector('.reminder-text').textContent;
        const reminderTime = reminderItem.querySelector('.reminder-time').textContent;

        // Redirect to CreateReminder page with query parameters
        window.location.href = `/layout/CreateReminder.html?text=${encodeURIComponent(reminderText)}&time=${encodeURIComponent(reminderTime)}`;
    }

});
