document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('trailer-modal');
    const video = document.getElementById('trailer-video');
    const source = video.querySelector('source');
    const close = document.querySelector('.close');

    // Add click handlers to all movie items
    document.querySelectorAll('.movie-item').forEach(item => {
        item.addEventListener('click', () => {
            const trailerSrc = item.getAttribute('data-trailer');
            console.log('Playing video:', trailerSrc); // Debug log
            source.src = trailerSrc;
            video.load();
            modal.style.display = 'block';
            
            // Play video after loading
            video.addEventListener('loadeddata', () => {
                video.play().catch(e => console.error('Error playing video:', e));
            }, { once: true });
        });
    });

    // Close modal handlers
    close.addEventListener('click', () => {
        modal.style.display = 'none';
        video.pause();
        source.src = ''; // Clear source
        video.load();
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            video.pause();
            source.src = ''; // Clear source
            video.load();
        }
    });

    // Add error handling
    video.addEventListener('error', (e) => {
        console.error('Video error:', video.error);
    });
});