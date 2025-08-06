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
    <div class="carousel-header">
        <h2>Discover the Best Burgers in NYC</h2>
        <p>From classic joints to trendy spots - here's where to find the perfect burger</p>
    </div>
    
    <div id="carousel-wrapper">
        <div id="carousel-track"></div>
        <div class="carousel-overlay left"></div>
        <div class="carousel-overlay right"></div>
        <button id="prev-btn" class="carousel-btn">‹</button>
        <button id="next-btn" class="carousel-btn">›</button>
    </div>
    
    <div class="carousel-indicators">
        <span class="indicator active" data-index="0"></span>
        <span class="indicator" data-index="1"></span>
        <span class="indicator" data-index="2"></span>
        <span class="indicator" data-index="3"></span>
        <span class="indicator" data-index="4"></span>
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
    
    // Create all images
    burgerData.forEach((burger, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.innerHTML = `
            <div class="slide-content">
                <img src="/Site/images/${burger.image}" alt="${burger.title}" data-index="${index}">
                <div class="slide-overlay">
                    <h3>${burger.title}</h3>
                </div>
            </div>
        `;
        track.appendChild(slide);
    });
    
    // Duplicate images for infinite scroll
    burgerData.forEach((burger, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        slide.innerHTML = `
            <div class="slide-content">
                <img src="/Site/images/${burger.image}" alt="${burger.title}" data-index="${index}">
                <div class="slide-overlay">
                    <h3>${burger.title}</h3>
                </div>
            </div>
        `;
        track.appendChild(slide);
    });
    
    updateIndicators();
    startCarousel();
}

function updateCarousel() {
    const track = document.getElementById('carousel-track');
    const slideWidth = 320; // Wider slides to show more content
    
    if (currentIndex >= burgerData.length) {
        // Reset to beginning for seamless loop
        currentIndex = 0;
        track.style.transition = 'none';
        track.style.transform = `translateX(0px)`;
        setTimeout(() => {
            track.style.transition = 'transform 0.8s ease';
        }, 10);
    } else {
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }
    
    updateIndicators();
}

function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex % 5);
    });
}

function nextSlide() {
    currentIndex++;
    updateCarousel();
}

function prevSlide() {
    currentIndex = Math.max(0, currentIndex - 1);
    updateCarousel();
}

function startCarousel() {
    carouselInterval = setInterval(nextSlide, 3000); // Slower, more elegant movement
}



// Initialize carousel when page loads
window.addEventListener('load', () => {
    createCarousel();
    
    // Add button event listeners
    document.getElementById('prev-btn').addEventListener('click', prevSlide);
    document.getElementById('next-btn').addEventListener('click', nextSlide);
    
    // Add indicator click events
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel();
        });
    });
});
</script>

<style>
#burger-carousel-container {
    margin: 3rem 0;
    text-align: center;
}

.carousel-header {
    margin-bottom: 2rem;
}

.carousel-header h2 {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1a1a1a;
    margin-bottom: 0.5rem;
}

.carousel-header p {
    font-size: 1.1rem;
    color: #666;
    max-width: 600px;
    margin: 0 auto;
}

#carousel-wrapper {
    position: relative;
    width: 100%;
    height: 280px;
    margin: 0 auto;
    overflow: hidden;
    background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 50%, #f8f9fa 100%);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.08);
}

#carousel-track {
    display: flex;
    transition: transform 0.8s ease;
    height: 100%;
    gap: 20px;
    padding: 20px;
}

.carousel-slide {
    min-width: 320px;
    height: 240px;
    transition: all 0.4s ease;
    flex-shrink: 0;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    position: relative;
}

.carousel-slide:hover {
    transform: translateY(-8px) scale(1.02);
    box-shadow: 0 12px 40px rgba(0,0,0,0.15);
}

.slide-content {
    position: relative;
    width: 100%;
    height: 100%;
}

.carousel-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 12px;
}

.slide-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0,0,0,0.8));
    color: white;
    padding: 20px;
    transform: translateY(100%);
    transition: transform 0.3s ease;
}

.carousel-slide:hover .slide-overlay {
    transform: translateY(0);
}

.slide-overlay h3 {
    margin: 0;
    font-size: 1.1rem;
    font-weight: 600;
}

.carousel-overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100px;
    z-index: 5;
    pointer-events: none;
}

.carousel-overlay.left {
    left: 0;
    background: linear-gradient(90deg, rgba(248,249,250,1) 0%, rgba(248,249,250,0) 100%);
}

.carousel-overlay.right {
    right: 0;
    background: linear-gradient(270deg, rgba(248,249,250,1) 0%, rgba(248,249,250,0) 100%);
}

.carousel-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(255,255,255,0.9);
    color: #333;
    border: none;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    cursor: pointer;
    font-size: 24px;
    z-index: 10;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.carousel-btn:hover {
    background: rgba(255,255,255,1);
    transform: translateY(-50%) scale(1.1);
    box-shadow: 0 6px 20px rgba(0,0,0,0.2);
}

#prev-btn {
    left: 20px;
}

#next-btn {
    right: 20px;
}

.carousel-indicators {
    display: flex;
    justify-content: center;
    gap: 8px;
    margin-top: 20px;
}

.indicator {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #ddd;
    cursor: pointer;
    transition: all 0.3s ease;
}

.indicator:hover {
    background: #bbb;
}

.indicator.active {
    background: #333;
    transform: scale(1.2);
}


</style>

