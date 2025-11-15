let slideIndex = 1;
let slideInterval;

// Show slides
function showSlides(n) {
    const slideshowContainers = document.getElementsByClassName("slideshow-container");
    
    // Handle both slideshows
    Array.from(slideshowContainers).forEach(container => {
        const slides = container.getElementsByClassName("slides");
        const dots = container.parentElement.getElementsByClassName("dot");
        
        if (n > slides.length) {slideIndex = 1}
        if (n < 1) {slideIndex = slides.length}
        
        // Hide all slides
        Array.from(slides).forEach(slide => {
            slide.style.display = "none";
            // Add loading class if image hasn't loaded
            if (!slide.querySelector('img').complete) {
                slide.classList.add('loading');
            }
        });

        // Reset all dots
        Array.from(dots).forEach(dot => {
            dot.className = dot.className.replace(" active-dot", "");
        });
        
        // Show current slide and activate dot
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active-dot";
    });
}

// Next/previous controls
function changeSlide(n) {
    clearInterval(slideInterval);
    showSlides(slideIndex += n);
    startAutoSlide();
}

// Thumbnail image controls
function currentSlide(n) {
    clearInterval(slideInterval);
    showSlides(slideIndex = n);
    startAutoSlide();
}

// Auto slide
function startAutoSlide() {
    slideInterval = setInterval(() => {
        slideIndex++;
        showSlides(slideIndex);
    }, 5000); // Change slide every 5 seconds
}

// Add error handling for images
function handleImageError(img) {
    img.src = 'https://via.placeholder.com/800x600/cccccc/666666?text=Image+Not+Available';
}

// Initialize slideshow when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add error handlers to all slideshow images
    const images = document.querySelectorAll('.slides img');
    images.forEach(img => {
        img.onerror = () => handleImageError(img);
    });
    
    showSlides(slideIndex);
    startAutoSlide();
});
