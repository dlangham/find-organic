const d = document;

//mobile hamburger icon////////////////////////////////////

const hambIcon = d.querySelector('#hamb-icon');
const mobileLinks = d.querySelector('#mobile-menu .nav-links');

d.addEventListener('DOMContentLoaded', () => {
    hambIcon.addEventListener('click', function() {
        this.classList.toggle('open');
        mobileLinks.classList.toggle('hidden');
    });
});