document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Intersection Observer for project cards
    const projectCards = document.querySelectorAll('.project-card');
    if (projectCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });

        projectCards.forEach(card => observer.observe(card));
    }

    // Work item expand/collapse handling
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach(item => {
        const header = item.querySelector('.work-header');
        const content = item.querySelector('.work-content');
        const expandButton = item.querySelector('.expand-button');

        header?.addEventListener('click', () => {
            const isExpanded = item.classList.toggle('expanded');
            content.style.maxHeight = isExpanded ? `${content.scrollHeight}px` : '0';
            if (expandButton) {
                expandButton.textContent = isExpanded ? '▲' : '▼';
                expandButton.setAttribute('aria-label', isExpanded ? 'Collapse section' : 'Expand section');
            }
        });
    });

    // Handle window resize to adjust expanded work-items
    window.addEventListener('resize', adjustExpandedItems);
});

function adjustExpandedItems() {
    const expandedItems = document.querySelectorAll('.work-item.expanded');
    expandedItems.forEach(item => {
        const content = item.querySelector('.work-content');
        if (content) {
            content.style.maxHeight = 'none'; // Temporarily reset
            content.style.maxHeight = `${content.scrollHeight}px`;
        }
    });
}

// Function to render media items (image, gif, video)
function renderMediaItem(mediaItem, mediaContainer) {
    if (!mediaItem || !mediaContainer) return;

    let mediaElement;
    if (mediaItem.type === 'video') {
        mediaElement = document.createElement('video');
        mediaElement.src = mediaItem.src;
        mediaElement.controls = true;
    } else {
        mediaElement = document.createElement('img');
        mediaElement.src = mediaItem.src;
    }

    mediaElement.className = 'media-content';
    mediaElement.alt = mediaItem.alt || '';
    mediaElement.setAttribute('aria-label', mediaItem.alt || '');
    mediaContainer.appendChild(mediaElement);

    if (mediaItem.caption) {
        const caption = document.createElement('p');
        caption.className = 'media-caption';
        caption.textContent = mediaItem.caption;
        mediaContainer.appendChild(caption);
    }
}