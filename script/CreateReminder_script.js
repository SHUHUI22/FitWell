function showTab(tabId) {
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
    event.currentTarget.classList.add('active');
  }

  // Category selection - improved for better visual feedback
  document.addEventListener('DOMContentLoaded', function() {
    const categoryOptions = document.querySelectorAll('.category-option');
    const radioButtons = document.querySelectorAll('input[type="radio"][name="category"]');
    
    // Handle clicks on the category options
    categoryOptions.forEach(option => {
      option.addEventListener('click', function() {
        // Get the radio button inside this option
        const radio = this.querySelector('input[type="radio"]');
        
        // Check the radio button
        radio.checked = true;
        
        // Update visual selection (remove from all, add to this one)
        updateSelection();
      });
    
    // Initialize selection state
    updateSelection();
  });
    const form = document.getElementById('reminderForm');
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            const title = document.getElementById('title').value;
            const category = document.getElementById('category').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;

            if (!title || !category || !date || !time) {
                alert('Please fill in all required fields');
                return;
            }

            alert('Reminder saved successfully!');
            form.reset();
        });
    }
});
