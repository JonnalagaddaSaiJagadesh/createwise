// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute('href'));
    target.scrollIntoView({
      behavior: 'smooth'
    });
  });
});
// Form Validation
const form = document.querySelector('form');
const nameInput = form.querySelector('input[type="text"]');
const emailInput = form.querySelector('input[type="email"]');
const messageInput = form.querySelector('textarea');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  let isValid = true;

  // Validate Name
  if (nameInput.value.trim() === '') {
    showError(nameInput, 'Name is required.');
    isValid = false;
  } else {
    clearError(nameInput);
  }

  // Validate Email
  if (!validateEmail(emailInput.value)) {
    showError(emailInput, 'Enter a valid email address.');
    isValid = false;
  } else {
    clearError(emailInput);
  }

  // Validate Message
  if (messageInput.value.trim() === '') {
    showError(messageInput, 'Message cannot be empty.');
    isValid = false;
  } else {
    clearError(messageInput);
  }

  // Submit if valid
  if (isValid) {
    alert('Form submitted successfully!');
    form.reset();
  }
});

function showError(input, message) {
  let error = input.nextElementSibling;
  if (!error || !error.classList.contains('error-message')) {
    error = document.createElement('div');
    error.className = 'error-message';
    input.parentNode.appendChild(error);
  }
  error.textContent = message;
  input.style.borderColor = 'red';
}

function clearError(input) {
  const error = input.nextElementSibling;
  if (error && error.classList.contains('error-message')) {
    error.remove();
  }
  input.style.borderColor = '';
}

function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
// Scroll-to-Top Button
const scrollToTopButton = document.getElementById('scrollToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollToTopButton.style.display = 'block';
  } else {
    scrollToTopButton.style.display = 'none';
  }
});

scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
// Lazy Loading Images
const lazyImages = document.querySelectorAll('.lazy');

const lazyLoad = (image) => {
  const src = image.getAttribute('data-src');
  if (!src) return;
  image.src = src;
  image.classList.remove('lazy');
};

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      lazyLoad(entry.target);
      observer.unobserve(entry.target);
    }
  });
});

lazyImages.forEach((image) => {
  imageObserver.observe(image);
});
