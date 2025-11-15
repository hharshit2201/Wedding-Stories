const weddingDate = new Date(Date.now() + 31 * 24 * 60 * 60 * 1000); // 31 days from now

function updateCountdown(targetDate, elementId) {
    const now = new Date().getTime();
    const target = new Date(targetDate).getTime();
    const timeLeft = target - now;

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

    document.getElementById(elementId).innerHTML = `
        <div class="time-section">
            <span class="time">${days}</span>
            <span class="label">Days</span>
        </div>
        <div class="time-section">
            <span class="time">${hours}</span>
            <span class="label">Hours</span>
        </div>
        <div class="time-section">
            <span class="time">${minutes}</span>
            <span class="label">Minutes</span>
        </div>
        <div class="time-section">
            <span class="time">${seconds}</span>
            <span class="label">Seconds</span>
        </div>
    `;
}

// Set specific wedding dates
const firstWeddingDate = new Date('2025-11-24T00:00:00');
const secondWeddingDate = new Date('2025-12-04T00:00:00');

// Update both countdowns every second
setInterval(() => {
    updateCountdown(firstWeddingDate, 'countdown1');
    updateCountdown(secondWeddingDate, 'countdown2');
}, 1000);

function openTab(tabName) {
    const tabContents = document.getElementsByClassName('tab-content');
    const tabButtons = document.getElementsByClassName('tab-btn');
    
    // Hide all tab contents
    for (let content of tabContents) {
        content.classList.remove('active');
    }
    
    // Deactivate all buttons
    for (let button of tabButtons) {
        button.classList.remove('active');
    }
    
    // Show the selected tab content
    document.getElementById(tabName).classList.add('active');
    
    // Activate the clicked button
    event.currentTarget.classList.add('active');
}