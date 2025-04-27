document.addEventListener('DOMContentLoaded', () => {
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const audio = document.getElementById("background-audio");

audio.volume = 0.5;

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

