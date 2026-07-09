const cursorBlob = document.querySelector(".cursor");
const cursorDot = document.querySelector(".cursor-dot");


if(cursorBlob && cursorDot){

let mouseX = 0;
let mouseY = 0;

let blobX = 0;
let blobY = 0;

let dotX = 0;
let dotY = 0;


window.addEventListener("mousemove", e=>{

mouseX = e.clientX;
mouseY = e.clientY;

});


function render(){

dotX += (mouseX-dotX)*0.35;
dotY += (mouseY-dotY)*0.35;


blobX += (mouseX-blobX)*0.12;
blobY += (mouseY-blobY)*0.12;


cursorDot.style.left = dotX + "px";
cursorDot.style.top = dotY + "px";

cursorBlob.style.left = blobX + "px";
cursorBlob.style.top = blobY + "px";


requestAnimationFrame(render);

}


render();



document.querySelectorAll(
"a,button,.card,img,.focus-magnetic"
)
.forEach(el=>{


el.addEventListener("mouseenter",()=>{

cursorBlob.classList.add("cursor-hover");

});


el.addEventListener("mouseleave",()=>{

cursorBlob.classList.remove("cursor-hover");

});


});


}

/* ============================
   Magnetic Buttons
============================ */

document.querySelectorAll('.focus-magnetic').forEach(button => {

  button.addEventListener('mousemove', e => {

    const rect = button.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;


    button.style.transform =
      `translate(${x * 0.08}px, ${y * 0.08}px)`;

  });


  button.addEventListener('mouseleave', () => {

    button.style.transform =
      "translate(0,0)";

  });

});


/* ============================
   Scroll Reveal Animations
============================ */


const revealElements = document.querySelectorAll(
  '.reveal, .reveal-from-top, .reveal-from-left, .reveal-from-right, .reveal-scale'
);


const revealObserver = new IntersectionObserver(
(entries) => {

  entries.forEach(entry => {

    if (entry.isIntersecting) {

      entry.target.classList.add('visible');

      revealObserver.unobserve(entry.target);

    }

  });

},
{
  threshold: 0.15
});


revealElements.forEach(element => {

  revealObserver.observe(element);

});



/* ============================
   Horizon Line Animation
============================ */


const horizonLines =
document.querySelectorAll('.horizon__line');


const horizonObserver =
new IntersectionObserver(
(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add('animate');

horizonObserver.unobserve(entry.target);

}

});

},
{
threshold:0.5
});


horizonLines.forEach(line=>{

horizonObserver.observe(line);

});



/* ============================
   Navbar Scroll Effect
============================ */


const nav = document.querySelector('.nav');


if(nav){

window.addEventListener('scroll',()=>{

if(window.scrollY > 100){

nav.classList.add('scrolled');

}

else{

nav.classList.remove('scrolled');

}

});

}



/* ============================
   Mobile Menu
============================ */


const navToggle =
document.getElementById('nav-toggle');

const mobileMenu =
document.getElementById('mobile-menu');


if(navToggle && mobileMenu){

navToggle.addEventListener('click',()=>{

const expanded =
navToggle.getAttribute('aria-expanded')
=== 'true';


navToggle.setAttribute(
'aria-expanded',
!expanded
);


mobileMenu.setAttribute(
'aria-hidden',
expanded
);


mobileMenu.classList.toggle('active');


});

}



/* ============================
   Smooth Anchor Scrolling
============================ */


document.querySelectorAll(
'a[href^="#"]'
)
.forEach(anchor=>{


anchor.addEventListener(
'click',
function(e){

const target =
document.querySelector(
this.getAttribute('href')
);


if(target){

e.preventDefault();


target.scrollIntoView({

behavior:'smooth',

block:'start'

});

}

});


});



/* ============================
   Staggered Animations
============================ */


document.querySelectorAll(
'.impact__rail li, .focus__item'
)
.forEach((item,index)=>{

item.style.animationDelay =
`${index * 0.12}s`;

item.classList.add(
'reveal-from-right'
);

});



document.querySelectorAll('.event')
.forEach((event,index)=>{

event.style.animationDelay =
`${index * 0.15}s`;

event.classList.add(
'reveal-from-left'
);

});



const hero =
document.querySelector('.hero__content');


if(hero){

hero.querySelectorAll(':scope > *')
.forEach((element,index)=>{


element.style.animationDelay =
`${index * 0.2}s`;


element.classList.add(
'reveal-from-left'
);


});

}



/* ============================
   Disable Cursor On Touch
============================ */


if('ontouchstart' in window){

if(cursorBlob)
cursorBlob.style.display="none";

if(cursorDot)
cursorDot.style.display="none";

}