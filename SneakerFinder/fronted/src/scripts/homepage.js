const images = ["page1.html", "page2.html", "page3.html"];
let currentIndex = 0;
let autoChangeTimeout;
const slider = document.getElementById("slider");

function updateImage() {
    slider.style.transform = `translateX(-${currentIndex * 100}vw)`;
}

function prevImage() {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
    resetAutoChange(10000);
}

function nextImage() {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
    resetAutoChange(10000);
}

function startAutoChange() {
    autoChangeTimeout = setTimeout(function autoNext() {
        nextImage();
        autoChangeTimeout = setTimeout(autoNext, 5000);
    }, 5000);
}

function resetAutoChange(pauseDuration = 5000) {
    clearTimeout(autoChangeTimeout);
    setTimeout(startAutoChange, pauseDuration);
}

startAutoChange();
