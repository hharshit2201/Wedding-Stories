document.addEventListener('DOMContentLoaded', function() {
    const envelopes = document.querySelectorAll('.envelope, .envelope-2');
    envelopes.forEach(function(envelope) {
        envelope.addEventListener('click', function() {
            this.classList.toggle('open');
        });
    });
});
