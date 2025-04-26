// Animation: slide out welcome message when hover
const leftSide = document.getElementById('left_side');
const overlay = document.getElementById('hover_overlay');
const message = document.getElementById('welcome_message');

leftSide.addEventListener('mouseenter', () => {
    overlay.style.transform = 'translateX(0)';
    message.style.opacity = '1';
    message.style.transform = 'translateX(0)';
});

leftSide.addEventListener('mouseleave', () => {
    overlay.style.transform = 'translateX(-100%)';
    message.style.opacity = '0';
    message.style.transform = 'translateX(-50px)';
});