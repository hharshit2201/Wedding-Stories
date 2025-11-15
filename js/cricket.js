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
        

function setupCricketAnimation(suffix) {
    const ball = document.getElementById('ball' + suffix);
    const bailL = document.getElementById('bail-left' + suffix);
    const bailR = document.getElementById('bail-right' + suffix);
    const stump1 = document.getElementById('stump-1' + suffix);
    const stump2 = document.getElementById('stump-2' + suffix);
    const stump3 = document.getElementById('stump-3' + suffix);
    const wicketDownText = document.getElementById('wicket-down-text' + suffix);
    const duckEmoji = document.getElementById('duck-emoji' + suffix);
    const animateBtn = document.getElementById('animate-btn' + suffix);
    const statusDiv = document.getElementById('status' + suffix);

    let isAnimating = false;

    function resetAnimation() {
        [ball, bailL, bailR, stump1, stump2, stump3, wicketDownText, duckEmoji].forEach(el => {
            if (el) el.className = el.className.split(' ').filter(c => !c.startsWith('run-')).join(' ');
        });
        if (stump1) { stump1.style.transform = 'none'; stump1.style.opacity = 1; }
        if (stump2) { stump2.style.transform = 'none'; stump2.style.opacity = 1; }
        if (stump3) { stump3.style.transform = 'none'; stump3.style.opacity = 1; }
        if (ball) { ball.style.display = 'block'; ball.style.left = '-30px'; }
        if (bailL) bailL.style.opacity = 1;
        if (bailR) bailR.style.opacity = 1;
        if (wicketDownText) wicketDownText.style.opacity = 0;
        isAnimating = false;
        if (animateBtn) animateBtn.classList.remove('disabled');
        if (statusDiv) statusDiv.textContent = 'Ready to Bowl!';
    }

    async function animateWicketHit() {
        if (isAnimating) return;
        isAnimating = true;
        if (animateBtn) animateBtn.classList.add('disabled');
        if (statusDiv) statusDiv.textContent = 'Ball is bowled...';
        try { await Tone.start(); } catch (e) { console.error("Tone.js failed to start:", e); }
        resetAnimation();
        if (ball) ball.classList.add('run-ball-move');
        setTimeout(() => {
            if (statusDiv) statusDiv.textContent = 'WICKET!';
            if (ball) ball.style.display = 'none';
            if (bailL) bailL.classList.add('run-bail-L');
            if (bailR) bailR.classList.add('run-bail-R');
            if (stump1) stump1.classList.add('run-stump-wobble');
            if (stump2) stump2.classList.add('run-stump-wobble');
            if (stump3) stump3.classList.add('run-stump-wobble');
            setTimeout(() => {
                if (stump1) stump1.classList.add('run-stump-fall-1');
                if (stump2) stump2.classList.add('run-stump-fall-2');
                if (stump3) stump3.classList.add('run-stump-fall-3');
                synth.triggerAttackRelease("C2", "0.2");
                if (wicketDownText) wicketDownText.classList.add('run-text-fade');
                if (duckEmoji) duckEmoji.classList.add('run-duck-shake');
            }, 100);
        }, 300);
        setTimeout(() => {
            resetAnimation();
        }, 3000);
    }

    if (animateBtn) animateBtn.addEventListener('click', animateWicketHit);
    window.addEventListener('DOMContentLoaded', resetAnimation);
}

setupCricketAnimation(''); // For first tab
setupCricketAnimation('-2'); // For second tab
        