---
title: NYC Burger List
date: 2025-06-08
---

# NYC Burger List

Welcome to my new blog! I'm going to list some of the best burgers in NYC.

## Why Burgers?

I'm a big fan of burgers. I've been eating burgers since I was a kid. I've tried burgers from all over the world, but I've never found a burger that I liked as much as the burgers in NYC.

---

## 🍔 NYC Burger Collection

<div id="burger-carousel-container">
    <div id="carousel-wrapper">
        <div id="carousel-track"></div>
        <button id="prev-btn" class="carousel-btn">‹</button>
        <button id="next-btn" class="carousel-btn">›</button>
    </div>
</div>

<script>
// Burger carousel with descriptions
const burgerData = [
    {
        image: 'Tezza-0231.JPG',
        title: 'Gotham Burger Social Club'
    },
    {
        image: 'Tezza-0284.JPG',
        title: 'Nowon'
    },
    {
        image: 'Tezza-0942.JPG',
        title: 'Emmy Squared Pizza'
    },
    {
        image: 'Tezza-9421.JPG',
        title: 'Nowon'
    },
    {
        image: 'Tezza-1465.JPG',
        title: 'Hamburger America'
    },
    {
        image: 'Tezza-3338.JPG',
        title: 'Au Cheval'
    },
    {
        image: 'Tezza-0086.JPG',
        title: 'Fairfax'
    },
    {
        image: 'Tezza-9197.JPG',
        title: 'Little Prince'
    },
    {
        image: 'Tezza-0464.JPG',
        title: 'Red Hook Tavern'
    },
    {
        image: 'Tezza-1410.JPG',
        title: 'Pastis'
    },
    {
        image: 'Tezza-1024.JPG',
        title: 'Minetta Tavern'
    },
    {
        image: 'Tezza-5873.JPG',
        title: '4 Charles'
    },
    {
        image: 'Tezza-6047.JPG',
        title: 'Lords'
    },
    {
        image: 'Tezza-7845.JPG',
        title: 'Monkey Bar'
    },
    {
        image: 'Tezza-8918.JPG',
        title: 'Rafs'
    },
    {
        image: 'Tezza-1667.JPG',
        title: 'NADC'
    },
    {
        image: 'Tezza-5703.JPG',
        title: 'Rolos'
    },
    {
        image: 'Tezza-4515.JPG',
        title: 'Virginias'
    }
];

let currentIndex = 0;
let carouselInterval;

function createCarousel() {
    const track = document.getElementById('carousel-track');
    
    burgerData.forEach((burger, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.innerHTML = `
            <img src="/images/${burger.image}" alt="${burger.title}" data-index="${index}">
        `;
        track.appendChild(slide);
    });
    
    updateCarousel();
    startCarousel();
}

function updateCarousel() {
    const track = document.getElementById('carousel-track');
    const slideWidth = 250; // Smaller width to show more images
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % burgerData.length;
    updateCarousel();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + burgerData.length) % burgerData.length;
    updateCarousel();
}

function startCarousel() {
    carouselInterval = setInterval(nextSlide, 2000); // Change slide every 2 seconds
}



// Initialize carousel when page loads
window.addEventListener('load', () => {
    createCarousel();
    
    // Add button event listeners
    document.getElementById('prev-btn').addEventListener('click', prevSlide);
    document.getElementById('next-btn').addEventListener('click', nextSlide);
});
</script>

<style>
#burger-carousel-container {
    margin: 2rem 0;
    text-align: center;
}

#carousel-wrapper {
    position: relative;
    width: 100%;
    height: 200px;
    margin: 0 auto;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.2);
}

#carousel-track {
    display: flex;
    transition: transform 0.5s ease;
    height: 100%;
    gap: 10px;
}

.carousel-slide {
    min-width: 250px;
    height: 200px;
    transition: transform 0.3s ease;
    flex-shrink: 0;
}

.carousel-slide:hover {
    transform: scale(1.05);
}

.carousel-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
}

.carousel-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0,0,0,0.7);
    color: white;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 20px;
    z-index: 10;
    transition: background 0.3s ease;
}

.carousel-btn:hover {
    background: rgba(0,0,0,0.9);
}

#prev-btn {
    left: 10px;
}

#next-btn {
    right: 10px;
}


</style>

