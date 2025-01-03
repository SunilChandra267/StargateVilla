// Property data
const propertyData = {
    'stargate-villa': {
        images: [
            'images/villa/villa1.jpg',
            'images/villa/villa2.jpg',
            'images/villa/villa3.jpg',
            'images/villa/villa4.jpg'
        ],
        video: 'videos/villa-tour.mp4',
        amenities: {
            bedrooms: 4,
            kitchen: 'Fully equipped modern kitchen with island',
            pool: 'Private infinity pool with ocean view',
            additional: [
                'Home theater',
                'Garden with BBQ area',
                'High-speed WiFi',
                'Smart home features'
            ]
        }
    },
    'stargate-farmilla': {
        images: [
            'images/farmvilla/farmilla1.jpg',
            'images/farmvilla/farmilla2.jpg',
            'images/farmvilla/farmilla3.jpg',
            'images/farmvilla/farmilla4.jpg'
        ],
        video: 'videos/farmilla-tour.mp4',
        amenities: {
            bedrooms: 3,
            kitchen: 'Country-style kitchen with modern appliances',
            pool: 'Natural swimming pool surrounded by gardens',
            additional: [
                'Organic garden',
                'Farm animals viewing area',
                'Outdoor dining space',
                'Nature trails'
            ]
        }
    }
};

// Initialize Gate Symbols
function initGateSymbols() {
    const symbolsContainer = document.querySelector('.gate-symbols');
    const numSymbols = 15;
    
    for(let i = 0; i < numSymbols; i++) {
        const symbol = document.createElement('div');
        symbol.className = 'gate-symbol';
        
        // Position symbols in a circle
        const angle = (i / numSymbols) * 2 * Math.PI;
        const radius = 135;
        const x = Math.cos(angle) * radius + 135;
        const y = Math.sin(angle) * radius + 135;
        
        symbol.style.left = `${x}px`;
        symbol.style.top = `${y}px`;
        symbolsContainer.appendChild(symbol);
    }
}

// Remove gate after animation
function removeGate() {
    const gate = document.querySelector('.gate-container');
    gate.style.animation = 'gateDisappear 1s ease-out forwards';
    setTimeout(() => {
        gate.remove();
    }, 1000);
}

// Create star container
const starsContainer = document.createElement('div');
starsContainer.className = 'stars';
document.body.insertBefore(starsContainer, document.body.firstChild);

// Star creation function
function createStar() {
    const star = document.createElement('div');
    const size = Math.random();
    
    if (size < 0.5) {
        star.className = 'star small';
        star.style.setProperty('--base-opacity', '0.5');
    } else if (size < 0.8) {
        star.className = 'star medium';
        star.style.setProperty('--base-opacity', '0.7');
    } else {
        star.className = 'star large';
        star.style.setProperty('--base-opacity', '0.9');
    }

    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    star.style.setProperty('--duration', `${2 + Math.random() * 4}s`);

    return star;
}

// Create shooting star
function createShootingStar() {
    const star = document.createElement('div');
    star.className = 'shooting-star';
    
    const angle = -15 - Math.random() * 30;
    star.style.setProperty('--angle', `${angle}deg`);
    star.style.top = `${Math.random() * 50}%`;
    star.style.setProperty('--duration', `${1 + Math.random() * 2}s`);
    
    return star;
}

// Initialize stars
function initStars() {
    starsContainer.innerHTML = '';
    const numberOfStars = Math.floor((window.innerWidth * window.innerHeight) / 1000);
    
    for (let i = 0; i < numberOfStars; i++) {
        starsContainer.appendChild(createStar());
    }
}

// Initialize Swiper
let swiper;
function initSwiper() {
    swiper = new Swiper('.swiper', {
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        }
    });
}

// Update property content
function updatePropertyContent(propertyId) {
    const property = propertyData[propertyId];

    // Update amenities
    document.querySelector('.bedrooms').textContent = `${property.amenities.bedrooms} Bedrooms`;
    document.querySelector('.kitchen').textContent = property.amenities.kitchen;
    document.querySelector('.pool').textContent = property.amenities.pool;

    // Update additional amenities
    const additionalList = property.amenities.additional
        .map(item => `<li class="mb-2"><i class="fas fa-check me-2"></i>${item}</li>`)
        .join('');
    document.querySelector('.additional-amenities ul').innerHTML = additionalList;

    // Update video source
    const video = document.querySelector('video');
    video.poster = property.images[0];
    const videoSource = video.querySelector('source');
    videoSource.src = property.video;
    video.load();

    // Update carousel
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    swiperWrapper.innerHTML = property.images
        .map(image => `<div class="swiper-slide"><img src="${image}" alt="Property View"></div>`)
        .join('');
    
    if (swiper) {
        swiper.update();
    }
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    initGateSymbols();
    initStars();
    initSwiper();
    
    // Start shooting stars
    setInterval(() => {
        const shootingStar = createShootingStar();
        starsContainer.appendChild(shootingStar);
        setTimeout(() => shootingStar.remove(), 3000);
    }, 8000);

    // Remove gate after animations
    setTimeout(removeGate, 3000);

    // Property selector buttons
    document.querySelectorAll('.property-selector .btn').forEach(button => {
        button.addEventListener('click', () => {
            document.querySelectorAll('.property-selector .btn').forEach(btn => 
                btn.classList.remove('active')
            );
            button.classList.add('active');
            updatePropertyContent(button.dataset.property);
        });
    });
});

// Handle window resize
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        initStars();
        if (swiper) {
            swiper.update();
        }
    }, 150);
});