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
                
                clickSound.currentTime = 0;
                clickSound.play();

                setTimeout(() => {
                    if (target === '_blank') {
                        window.open(href, '_blank');
                    } 
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
                    else {
                        window.location.href = href;
                    }
                }, 100);
            } else {
                clickSound.currentTime = 0;
                clickSound.play();
            }
        });
    });
});