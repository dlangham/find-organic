const d = document;

//mobile hamburger icon////////////////////////////////////

const hambIcon = d.querySelector('#hamb-icon');
const mobileLinks = d.querySelector('#mobile-menu .nav-links');
const brand = d.querySelector('.brand');
const topA = d.querySelector('.top-a');
const topB = d.querySelectorAll('.top-b');
const body = d.querySelector('body');
const page = d.querySelector('.page');
var isPageListener = false;

const onClickHambIcon = (fn) => {
    hambIcon.addEventListener('click', fn);
};
const onClickPage = (fn) => {
    page.addEventListener('click', fn);
    isPageListener = true;
};

const toggleMobileMenu = () => {
    hambIcon.classList.toggle('open');
    mobileLinks.classList.toggle('hidden');
    brand.classList.toggle('hidden');
    // body.classList.toggle('no-scroll');

    //toggle off .page listener
    if (isPageListener === true) {
        page.removeEventListener('click', toggleMobileMenu);
        isPageListener = false;
    }
    //toggle on .page listener
    if (!mobileLinks.classList.contains('hidden')) {
        onClickPage(toggleMobileMenu);
    }
}

d.addEventListener('DOMContentLoaded', () => {
    onClickHambIcon(toggleMobileMenu);
});