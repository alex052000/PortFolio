// TILT EFFECTY ON IMAGE

const tiltEffectSettings = {
    max: 10,
    perspective: 4000,
    scale: 1.0,
    speed: 300,
    easing: "cubic-bezier(.1,.7,.2,.9)",
};

const cards = document.querySelectorAll(".card");
const faders = document.querySelectorAll('.fadein');
const sliders = document.querySelectorAll('.slide');

cards.forEach(card => {
    card.addEventListener("mouseenter", cardMouseEnter);
    card.addEventListener("mousemove", cardMouseMove);
    card.addEventListener("mouseleave", cardMouseLeave);
});

function cardMouseEnter(event) {
    setTransition(event);
}

function cardMouseMove(event) {
    const card = event.currentTarget;
    const cardWidth = card.offsetWidth;
    const cardHeight = card.offsetHeight;
    const centerX = card.offsetLeft + cardWidth / 2;
    const centerY = card.offsetTop + cardHeight / 2;
    const mouseX = event.clientX - centerX;
    const mouseY = event.clientY - centerY;
    const rotateXUncapped = (+1) * tiltEffectSettings.max * mouseY / (cardHeight / 2);
    const rotateYUncapped = (-1) * tiltEffectSettings.max * mouseX / (cardWidth / 2);
    const rotateX = rotateXUncapped < -tiltEffectSettings.max ? -tiltEffectSettings.max :
        (rotateXUncapped > tiltEffectSettings.max ? tiltEffectSettings.max : rotateXUncapped);
    const rotateY = rotateYUncapped < -tiltEffectSettings.max ? -tiltEffectSettings.max :
        (rotateYUncapped > tiltEffectSettings.max ? tiltEffectSettings.max : rotateYUncapped);

    card.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${tiltEffectSettings.scale}, ${tiltEffectSettings.scale}, ${tiltEffectSettings.scale})`;
}

function cardMouseLeave(event) {
    event.currentTarget.style.transform = `perspective(${tiltEffectSettings.perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    setTransition(event);
}

function setTransition(event) {
    const card = event.currentTarget;
    clearTimeout(card.transitionTimeoutId);
    card.style.transition = `transform ${tiltEffectSettings.speed}ms ${tiltEffectSettings.easing}`;
    card.transitionTimeoutId = setTimeout(() => {
        card.style.transition = "";
    }, tiltEffectSettings.speed);
}


// ADD SKILLS
var button = document.getElementById('enter');
var input = document.getElementById('userinput');
var ul = document.querySelector('ul');
var li = document.getElementsByTagName('li')

button.addEventListener('click', Onclick);
input.addEventListener('keypress', addElement);


liEvent();
buttonListElement();

function checkInputlength() {
    return input.value.length;
}


function createListElement() {

    var li = document.createElement("li");
    var button = document.createElement('button');
    li.appendChild(document.createTextNode(input.value));
    ul.appendChild(li);
    li.appendChild(button)
    button.innerHTML = "delete";
    input.value = "";

    liEvent();
    buttonListElement();
}



function Onclick() {

    if (checkInputlength() > 0) {
        createListElement();
    }

}


function addElement() {

    if (checkInputlength() > 0 && event.keyCode === 13) {
        createListElement();
    }
}

function liEvent() {
    for (i = 0; i < li.length; i++) {
        li[i].addEventListener('click', changeClass)
    }
}

function changeClass() {
    this.classList.toggle('done');
}

function buttonListElement() {
    var button = document.querySelectorAll('li button');
    for (i = 0; i < button.length; i++) {
        button[i].addEventListener('click', clearElement)
    }
}

function clearElement() {
    for (var i = 0; i < li.length; i++) {
        this.parentNode.remove()
    }
}




// On scroll appear

const appearOptions = {
    threshold: 0,
    rootargin: "0 0 -250px 0"
};
const appearONScroll = new IntersectionObserver(function(
        entries,
        appearONScroll
    ) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('appear');
                appearONScroll.unobserve(entry.target);
            }
        });
    },
    appearOptions);


faders.forEach(fader => {
    appearONScroll.observe(fader);
});

sliders.forEach(slider => {
    appearONScroll.observe(slider);
});