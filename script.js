document.addEventListener('DOMContentLoaded', () => {
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger && navLinks) {
 hamburger.addEventListener('click', (e) => {
     e.stopPropagation();
     navLinks.classList.toggle('active');
 });

 document.addEventListener('click', (e) => {
     if (!navLinks.contains(e.target) && !hamburger.contains(e.target)) {
         navLinks.classList.remove('active');
     }
 });


 document.querySelectorAll('.nav-link').forEach(link => {
     link.addEventListener('click', () => {
         navLinks.classList.remove('active');
     });
 });
}
});

document.querySelector('.hamburger').addEventListener('click', function() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
  });

  document.addEventListener('DOMContentLoaded', function() {
    const clickSound = document.getElementById('clickSound');
    const clickableElements = document.querySelectorAll('button, a');

    clickableElements.forEach(element => {
        element.addEventListener('click', function(e) {
            if (element.tagName === 'A') {
                e.preventDefault();
                const href = this.href;
                const target = this.target;
                
                // Reset and play sound
                clickSound.currentTime = 0;
                clickSound.play();

                setTimeout(() => {
                    // Handle external links
                    if (target === '_blank') {
                        window.open(href, '_blank');
                    } 
                    // Handle anchor links
                    else if (href.includes('#')) {
                        const targetId = href.split('#')[1];
                        const targetElement = document.getElementById(targetId);
                        if (targetElement) {
                            targetElement.scrollIntoView({ behavior: 'smooth' });
                            history.pushState(null, null, `#${targetId}`);
                        } else {
                            window.location.href = href;
                        }
                    } 
                    // Handle normal navigation
                    else {
                        window.location.href = href;
                    }
                }, 100);
            } else {
                // Handle buttons
                clickSound.currentTime = 0;
                clickSound.play();
            }
        });
    });
});