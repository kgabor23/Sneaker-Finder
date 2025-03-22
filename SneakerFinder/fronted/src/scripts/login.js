document.addEventListener("DOMContentLoaded", function() {
    let images = [
        "images/backgrounds/register1.jpg",
        "images/backgrounds/register2.jpg"
    ];
    let index = 0;
    setInterval(() => {
        document.body.style.background = `url('${images[index]}') center / cover no-repeat`;
        index = (index + 1) % images.length;
    }, 5000);
});
