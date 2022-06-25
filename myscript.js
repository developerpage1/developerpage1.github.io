const navbarmenu = document.querySelector('nav');

function burgerToX(arr) {
    arr.classList.toggle('xburger');
    navbarmenu.classList.toggle('show');
}


// ---------------------------------------------------
// slideshow code
const myslide = document.getElementsByClassName('myslide');

function slideMove(num) {
    const sliderLength = myslide.length;
    let currentslider = 0;

    // find current slide
    for (let i = 0; i < sliderLength; i++){
        if (myslide[i].classList.contains('active')) {
            currentslider = i + 1;
        }
    }
    
    currentslider += num;
    if (currentslider > sliderLength) {
        currentslider = 1;
    } 
    if (currentslider < 1) {
        currentslider = sliderLength;
    }
        
    showSlide(currentslider);
}
// show slide with num
function showSlide(num) {
    // hide all slides
    for (let i = 0; i < myslide.length; i++){
        myslide[i].classList.remove('active');
        // if (myslide[i].classList.contains('active')) {
        //     myslide[i].classList.replace(' active', '');
        // }
    }
    // show only active slide
    myslide[num - 1].classList += ' active';
}

//-----------------------------------------------------------
// type writer with javascript
let typenum = 0;
const writer = document.getElementById('typingtxt');
const mytext = 'This is some dummy text written with JavaScript.';
const typespeed = 150;

function typeWriter() {
    if (typenum < mytext.length) {
        writer.innerHTML += mytext.charAt(typenum);
        typenum++;
        setTimeout(typeWriter, typespeed);
    } else {
        setTimeout(startTyping, 2000);
    }
}

function startTyping() {
    writer.innerHTML = '';
    typenum = 0;
}
setInterval(() => {
    typeWriter()
}, 5000);


// ----------------------------------------------------------
// bubbles
function bubbles() {
    const scene = document.getElementById('bubbles');

    let count = 20;
    let j = 0;
    while (j < count) {
        let bubble = document.createElement('span');
        let size = Math.random() * 100;
        let x = Math.floor(Math.random() * window.innerWidth);
        let duration = Math.random() * 5;

        bubble.style.left = x + 'px';
        bubble.style.width = size + 'px';
        bubble.style.height = size + 'px';
        bubble.style.animationDelay = duration + 's';
        bubble.style.animationDuration = 5 + (duration * 5) + 's';

        scene.appendChild(bubble);
        j++;
    }
}

bubbles();

//--------------------------------------------------------------
// intersection observer
const cardbox = document.querySelectorAll('.card-box');
const contact = document.getElementsByClassName('contact')[0];
const test = document.getElementsByClassName('test')[0];

let option = {
    rootMargin: '-100px',
};

const iObserve = new IntersectionObserver(entries => {
    entries.forEach(entry => {
     
        entry.target.classList.toggle('observeMe', entry.isIntersecting);
    })
}, option);

cardbox.forEach(card => {
    iObserve.observe(card);
});
iObserve.observe(contact);
iObserve.observe(test);

