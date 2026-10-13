const slides = document.querySelectorAll('.hero-slide');
const dots = document.querySelectorAll('.hero-dot');
let current = 0;

function showSlide(index) {
  if (!slides.length) return;
  current = (index + slides.length) % slides.length;
  slides.forEach((s, i) => s.classList.toggle('active', i === current));
  dots.forEach((d, i) => d.classList.toggle('active', i === current));

  const s = slides[current];
  document.getElementById('heroEyebrow').textContent = s.dataset.eyebrow;
  document.getElementById('heroTitle').innerHTML = s.dataset.title.replace('|', '<br>');
  document.getElementById('heroDescription').textContent = s.dataset.description;
  document.getElementById('heroButton').textContent = s.dataset.button;
}

if (slides.length) {
  document.querySelector('.hero-arrow.prev').onclick = () => showSlide(current - 1);
  document.querySelector('.hero-arrow.next').onclick = () => showSlide(current + 1);
  dots.forEach((dot, i) => dot.onclick = () => showSlide(i));
  setInterval(() => showSlide(current + 1), 4000);
}

const dropdown = document.querySelector('.dropdown');
const toggle = document.querySelector('.dropdown-toggle');
if (dropdown && toggle) {
  toggle.onclick = (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('open');
  };
  document.onclick = () => dropdown.classList.remove('open');
}

const logoutLink = document.getElementById('logoutLink');
if (logoutLink) {
  if (localStorage.getItem('isLoggedIn') !== 'true') location.replace('login.html');

  logoutLink.onclick = (e) => {
    e.preventDefault();
    localStorage.removeItem('isLoggedIn');
    alert('Logged out successfully!');
    location.href = 'login.html';
  };

  const details = {
    HTML: 'HTML stands for HyperText Markup Language. It creates the structure of a web page using headings, paragraphs, images, and links.',
    CSS: 'CSS controls the appearance of web pages, including colors, fonts, spacing, and layout.',
    Bootstrap: 'Bootstrap is a front-end framework for building responsive websites quickly using ready-made components.',
    JavaScript: 'JavaScript makes web pages interactive with button clicks, form validation, and dynamic content.'
  };

  const modal = document.getElementById('courseModalBackdrop');
  const title = document.getElementById('modalCourseTitle');
  const description = document.getElementById('modalCourseDescription');
  const closeModal = () => modal.classList.remove('show');

  document.querySelectorAll('.course-btn').forEach(btn => {
    btn.onclick = () => {
      title.textContent = btn.dataset.course;
      description.textContent = details[btn.dataset.course];
      modal.classList.add('show');
    };
  });

  document.getElementById('modalCloseX').onclick = closeModal;
  document.getElementById('modalCloseButton').onclick = closeModal;
  modal.onclick = (e) => { if (e.target === modal) closeModal(); };
}
