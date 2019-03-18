const w = window;
const d = document;

//breakpoints
const mobileAndDown = 767.98;
const tabletDesktopAndUp = 768;

//mobile hamburger icon////////////////////////////////////

const hambIcon = d.querySelector('#hamb-icon');
const mobileLinks = d.querySelector('#mobile-menu .nav-links');
const brand = d.querySelector('.brand');
const offMenu = d.querySelector('.off-menu');
const body = d.querySelector('body');
var isMenuOpen = false;
var isResizeListener = false;
var isOffMenuListener = false;

const uponClickHambIcon = (fn) => {
    hambIcon.addEventListener('click', fn);
};
const uponClickOffMenu = (fn) => {
    offMenu.addEventListener('click', fn);
    isOffMenuListener = true;
};
const removeUponClickOffMenu = (fn) => {
    offMenu.removeEventListener('click', fn);
    isOffMenuListener = false;
};
const uponResize = (fn) => {
    w.addEventListener('resize', fn);
    isResizeListener = true;
};
const removeUponResize = (fn) => {
    w.removeEventListener('resize', fn);
    isResizeListener = false;
};
const uponBreakpoint = () => {
    //if hit breakpoint and menu is open
    if (w.innerWidth >= tabletDesktopAndUp && isMenuOpen) {
        //close menu and remove listener
        toggleMobileMenu();
    }
};

const toggleMobileMenu = () => {
    // console.log('click hambIcon, so toggleMobileMenu');
    
    hambIcon.classList.toggle('open');
    mobileLinks.classList.toggle('hidden');
    brand.classList.toggle('hidden');
    // body.classList.toggle('no-scroll');

    console.log(isMenuOpen ? 'now closing menu' : 'now opening menu');

    //toggle isMenuOpen
    isMenuOpen = isMenuOpen ? false : true;
    

    //if menu is open
    if (isMenuOpen) {
        //listen for window resize; is it past breakpoint? then close menu
        uponResize(uponBreakpoint);
    } else {
        //remove listener for resize
        if (isResizeListener) {
            removeUponResize(toggleMobileMenu);
            console.log('removed "resize" listener, in "if isMenuOpen is false"');
        }
        
    }
    
    // // toggle on .off-menu listener
    // if (isOffMenuListener === false) uponClickOffMenu(toggleMobileMenu);
    // //toggle off .off-menu listener
    // else if (isOffMenuListener === true) removeUponResize(toggleMobileMenu);
    isOffMenuListener === true ? removeUponClickOffMenu(toggleMobileMenu) : uponClickOffMenu(toggleMobileMenu);
}

d.addEventListener('DOMContentLoaded', () => {
    uponClickHambIcon(toggleMobileMenu);
});

