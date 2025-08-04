---
title: NYC Burger List
date: 2025-06-08
---

# NYC Burger List

Welcome to my new blog! I'm going to list some of the best burgers in NYC.

## Why Burgers?

I'm a big fan of burgers. I've been eating burgers since I was a kid. I've tried burgers from all over the world, but I've never found a burger that I liked as much as the burgers in NYC.

---

## 🍔 Random Burger Pics

<div id="burger-images-container"></div>

<script>
// Random burger image popup functionality
const burgerImages = [
    'Tezza-0231.JPG',
    'Tezza-0284.JPG',
    'Tezza-0942.JPG',
    'Tezza-9421.JPG',
    'Tezza-1465.JPG',
    'Tezza-3338.JPG',
    'Tezza-0086.JPG',
    'Tezza-9197.JPG',
    'Tezza-0464.JPG',
    'Tezza-1410.JPG',
    'Tezza-1024.JPG',
    'Tezza-5873.JPG',
    'Tezza-6047.JPG',
    'Tezza-7845.JPG',
    'Tezza-8918.JPG',
    'Tezza-1667.JPG',
    'Tezza-5703.JPG',
    'Tezza-4515.JPG'
];

function createRandomImage() {
    if (burgerImages.length === 0) {
        console.log('No burger images found. Please add image filenames to the burgerImages array.');
        return;
    }
    
    const randomImage = burgerImages[Math.floor(Math.random() * burgerImages.length)];
    const img = document.createElement('img');
    img.src = `/Site/images/${randomImage}`;
    img.style.cssText = `
        position: fixed;
        width: 200px;
        height: 150px;
        object-fit: cover;
        border-radius: 10px;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        cursor: pointer;
        transition: transform 0.3s ease;
        left: ${Math.random() * (window.innerWidth - 200)}px;
        top: ${Math.random() * (window.innerHeight - 150)}px;
    `;
    
    // Add hover effect
    img.addEventListener('mouseenter', () => {
        img.style.transform = 'scale(1.1)';
    });
    
    img.addEventListener('mouseleave', () => {
        img.style.transform = 'scale(1)';
    });
    
    // Remove image when clicked
    img.addEventListener('click', () => {
        img.remove();
    });
    
    document.body.appendChild(img);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (img.parentNode) {
            img.remove();
        }
    }, 5000);
}

// Show random images when page loads
window.addEventListener('load', () => {
    // Show 3 random images initially
    for (let i = 0; i < 3; i++) {
        setTimeout(() => createRandomImage(), i * 1000);
    }
    
    // Show a new random image every 8 seconds
    setInterval(createRandomImage, 8000);
});
</script>

<style>
#burger-images-container {
    margin: 2rem 0;
    padding: 1rem;
    background: #f8f8f8;
    border-radius: 8px;
    text-align: center;
}

#burger-images-container::before {
    content: "🍔 Random burger pics will pop up around the page! Click them to dismiss.";
    display: block;
    color: #666;
    font-style: italic;
    margin-bottom: 1rem;
}
</style>

