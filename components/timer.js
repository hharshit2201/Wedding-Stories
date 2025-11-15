class Timer {
    constructor(endDate) {
        this.endDate = new Date(endDate);
        this.interval = null;
    }

    start() {
        this.interval = setInterval(() => {
            this.updateDisplay();
        }, 1000);
    }

    updateDisplay() {
        const now = new Date();
        const timeRemaining = this.endDate - now;

        if (timeRemaining <= 0) {
            clearInterval(this.interval);
            this.displayFinished();
            return;
        }

        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        this.displayTime(days, hours, minutes, seconds);
    }

    displayTime(days, hours, minutes, seconds) {
        const timerElement = document.getElementById('timer');
        timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    displayFinished() {
        const timerElement = document.getElementById('timer');
        timerElement.innerHTML = "It's time!";
    }
}

export default Timer;