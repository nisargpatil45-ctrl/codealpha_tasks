let currentIndex = 0;
let images = document.querySelectorAll(".gallery img");

// Open Lightbox
images.forEach((img, index) => {
    img.addEventListener("click", () => {
        currentIndex = index;
        openLightbox(img.src);
    });
});

function openLightbox(src) {
    document.getElementById("lightbox").style.display = "flex";
    document.getElementById("lightbox-img").src = src;
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

// Next/Prev
function changeImage(direction) {
    currentIndex += direction;

    if (currentIndex < 0) currentIndex = images.length - 1;
    if (currentIndex >= images.length) currentIndex = 0;

    document.getElementById("lightbox-img").src = images[currentIndex].src;
}

// Filter Function
function filterImages(category) {
    let items = document.querySelectorAll(".image");

    items.forEach(item => {
        item.style.display =
            (category === "all" || item.classList.contains(category))
                ? "block"
                : "none";
    });

    document.querySelectorAll(".btn").forEach(b => b.classList.remove("active"));
    event.target.classList.add("active");
}
