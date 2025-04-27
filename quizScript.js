document.addEventListener('DOMContentLoaded', function() {
    const quizContainers = document.querySelectorAll('.quiz-container');
    const quizzesContainer = document.querySelector('.quizzes-container');
    const previousBtn = document.querySelector('.previous-container');
    const nextBtn = document.querySelector('.next-container');
    

    let visibleQuizzes = 3;
    let currentPosition = 0;

    updateVisibility();

    window.addEventListener('resize', function() {
    
        if (window.innerWidth < 768) {
            visibleQuizzes = 2;
        } else if (window.innerWidth < 1024) {
            visibleQuizzes = 3;
        } else {
            visibleQuizzes = 3;
        }
        
        currentPosition = 0;
        updateVisibility();
    });  

    previousBtn.addEventListener('click', function(e) {
        e.preventDefault();
        currentPosition = (currentPosition - 1 + quizContainers.length) % quizContainers.length;
        updateVisibility();
    });

    nextBtn.addEventListener('click', function(e) {
        e.preventDefault();
        currentPosition = (currentPosition + 1) % quizContainers.length;
        updateVisibility();
    });

    function updateVisibility() {
        quizContainers.forEach(container => {
            container.style.display = 'none';
        });
        
        for (let i = 0; i < visibleQuizzes; i++) {
            const index = (currentPosition + i) % quizContainers.length;
            quizContainers[index].style.display = 'block';
        }

        quizzesContainer.style.transition = 'transform 0.3s ease-in-out';
    }

    updateVisibility();
});

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

      
    

       
       