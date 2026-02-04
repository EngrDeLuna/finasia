const toggle = document.getElementById('menu-toggle');
const nav = document.getElementById('nav-menu');

toggle.addEventListener('click', () => {
  nav.classList.toggle('active');          // slide menu open/close
  toggle.classList.toggle('active');       // hamburger → X
});


const counters = document.querySelectorAll('.impact-box h4');
const speed = 200; // lower = faster

function countUp(counter) {
  const target = +counter.getAttribute('data-target');
  const suffix = counter.getAttribute('data-suffix') || '';
  let count = 0;

  const updateCount = () => {
    const increment = Math.ceil(target / speed);
    count += increment;
    if (count > target) count = target;
    counter.innerText = count.toLocaleString() + suffix;

    if (count < target) {
      requestAnimationFrame(updateCount);
    }
  };

  updateCount();
}

// Intersection Observer
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counter = entry.target;
      countUp(counter);
      observer.unobserve(counter); // stop observing once counted
    }
  });
}, { threshold: 0.5 }); // trigger when 50% visible

// Observe each counter
counters.forEach(counter => observer.observe(counter));








const slider = document.querySelector('.partners-slider');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});
slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 2; //scroll-fast
  slider.scrollLeft = scrollLeft - walk;
});

// Touch events for mobile
slider.addEventListener('touchstart', (e) => {
  startX = e.touches[0].pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('touchmove', (e) => {
  const x = e.touches[0].pageX - slider.offsetLeft;
  const walk = (x - startX) * 2;
  slider.scrollLeft = scrollLeft - walk;
});
