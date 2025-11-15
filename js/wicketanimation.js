// Tone.js Synth initialization (used for the 'thud' sound effect)
const synth = new Tone.Synth({
    oscillator: { type: "sine" },
    envelope: {
        attack: 0.001,
        decay: 0.1,
        sustain: 0,
        release: 0.05
    }
}).toDestination();

const ball = document.getElementById('ball');
const bailL = document.getElementById('bail-left');
const bailR = document.getElementById('bail-right');
const stump1 = document.getElementById('stump-1');
const stump2 = document.getElementById('stump-2');
const stump3 = document.getElementById('stump-3');
const wicketDownText = document.getElementById('wicket-down-text');
const duckEmoji = document.getElementById('duck-emoji');
const animateBtn = document.getElementById('animate-btn');
const statusDiv = document.getElementById('status');

let isAnimating = false;

// --- Helper Function to Clean CSS Classes ---
function resetAnimation() {
    // Remove animation classes from all elements
    [ball, bailL, bailR, stump1, stump2, stump3, wicketDownText, duckEmoji].forEach(el => {
        el.className = el.className.split(' ').filter(c => !c.startsWith('run-')).join(' ');
    });

    // Reset stump positions and opacity
    stump1.style.transform = 'none';
    stump2.style.transform = 'none';
    stump3.style.transform = 'none';
    stump1.style.opacity = 1;
    stump2.style.opacity = 1;
    stump3.style.opacity = 1;

    // Reset ball position
    ball.style.display = 'block';
    ball.style.left = '-30px';
    
    // Reset bails opacity (position is reset by removing animation class)
    bailL.style.opacity = 1;
    bailR.style.opacity = 1;

    // Reset text opacity
    wicketDownText.style.opacity = 0;
    
    isAnimating = false;
    animateBtn.classList.remove('disabled');
    statusDiv.textContent = 'Ready to Bowl!';
}

// --- Main Animation Sequence ---
async function animateWicketHit() {
    if (isAnimating) return;
    isAnimating = true;
    animateBtn.classList.add('disabled');
    statusDiv.textContent = 'Ball is bowled...';

    // Start Tone.js context if not already started (required on first user interaction)
    try {
        await Tone.start();
    } catch (e) {
        console.error("Tone.js failed to start:", e);
    }

    // 1. Initial Reset to ensure clean start
    resetAnimation(); 

    // 2. Ball Approach (Duration: 0.3s)
    ball.classList.add('run-ball-move');

    // --- Impact Sequence (Starts at 0.3s) ---
    setTimeout(() => {
        statusDiv.textContent = 'WICKET!';
        
        // Hide the ball immediately on impact
        ball.style.display = 'none';

        // 3. Bails Launch (Duration: 1.7s)
        bailL.classList.add('run-bail-L');
        bailR.classList.add('run-bail-R');

        // 4. Stumps Wobble and Fall (Starts after a quick wobble)
        stump1.classList.add('run-stump-wobble');
        stump2.classList.add('run-stump-wobble');
        stump3.classList.add('run-stump-wobble');

        // Start the main fall animation slightly after the wobble starts (0.1s delay)
        setTimeout(() => {
            stump1.classList.add('run-stump-fall-1');
            stump2.classList.add('run-stump-fall-2');
            stump3.classList.add('run-stump-fall-3');
            
            // --- New Sequence: Sound, Text, and Duck Animation ---
            // Generate a quick, low-pitch sound for a dramatic 'thud/duck' effect
            synth.triggerAttackRelease("C2", "0.2"); 
            
            wicketDownText.classList.add('run-text-fade'); // Show text container
            duckEmoji.classList.add('run-duck-shake'); // Start the shake animation on the duck
            
            // NOTE: Crying emoji bounce has been removed.
        }, 100); 

    }, 300); // 300ms = ball movement duration

    // 5. Reset (Wait for the longest animation to finish, around 2.5s for bails + text + buffer)
    setTimeout(() => {
        resetAnimation();
    }, 3000); // Increased total duration to accommodate new elements
}

// Event Listeners
animateBtn.addEventListener('click', animateWicketHit);
window.onload = resetAnimation; // Ensure a clean initial state
