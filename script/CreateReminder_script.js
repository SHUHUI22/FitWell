

    // Wait until the page is fully loaded before running JavaScript
    document.addEventListener('DOMContentLoaded', function() {
        // Get references to the tab elements
        const tabButtons = document.querySelectorAll('.tab');
        
        // Add click event listeners to tabs
        tabButtons.forEach(function(tab) {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                tabButtons.forEach(function(t) {
                    t.classList.remove('active');
                });
                
                // Add active class to the clicked tab
                tab.classList.add('active');
                
                // In a real app, you would show/hide content based on tab here
            });
        });

        // Get reference to the form element
        const form = document.getElementById('reminderForm');
        
        // Add submit event listener to the form
        form.addEventListener('submit', function(event) {
            // Prevent the form from actually submitting (which would refresh the page)
            event.preventDefault();
            
            // Get all the form values
            const title = document.getElementById('title').value;
            const category = document.getElementById('category').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            
            // Simple form validation
            if (!title || !category || !date || !time) {
                alert('Please fill in all required fields');
                return;
            }
            
            // Show success message (in a real app, you would save data here)
            alert('Reminder saved successfully!');
            
            // Reset the form to clear all fields
            form.reset();
        });
    });
