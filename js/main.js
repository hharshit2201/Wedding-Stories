import Timer from '../components/timer.js';

function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Set checkbox state based on theme
    const themeCheckbox = document.getElementById('themeCheckbox');
    if (themeCheckbox) {
        themeCheckbox.checked = savedTheme === 'dark';
    }
}

function toggleTheme(event) {
    const newTheme = event.target.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Initialize theme when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    const themeCheckbox = document.getElementById('themeCheckbox');
    if (themeCheckbox) {
        themeCheckbox.addEventListener('change', toggleTheme);
    }
});

const weddingDate = new Date();
weddingDate.setDate(weddingDate.getDate() + 31); // Set the wedding date to 31 days from now

const timer = new Timer(weddingDate);
timer.start();

function openTab(tabName) {
    const tabContents = document.getElementsByClassName('tab-content');
    const tabButtons = document.getElementsByClassName('tab-btn');
    
    // Hide all tab contents with animation
    for (let content of tabContents) {
        if (content.classList.contains('active')) {
            content.style.transform = 'translateY(20px)';
            content.style.opacity = '0';
        }
        setTimeout(() => {
            content.classList.remove('active');
        }, 300);
    }
    
    // Deactivate all buttons
    for (let button of tabButtons) {
        button.classList.remove('active');
    }
    
    // Show the selected tab content with animation
    setTimeout(() => {
        const selectedTab = document.getElementById(tabName);
        selectedTab.classList.add('active');
        selectedTab.style.transform = 'translateY(0)';
        selectedTab.style.opacity = '1';
    }, 300);
    
    // Activate the clicked button
    event.currentTarget.classList.add('active');
}

// Add initial animation when page loads
document.addEventListener('DOMContentLoaded', () => {
    const activeTab = document.querySelector('.tab-content.active');
    if (activeTab) {
        activeTab.style.transform = 'translateY(0)';
        activeTab.style.opacity = '1';
    }
});