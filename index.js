// Script para manejar la expansión de las FAQs
document.addEventListener('DOMContentLoaded', function() {
  const faqItems = document.querySelectorAll('.faq-item');
  
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
      // Cerrar todos los otros items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
        }
      });
      
      // Toggle el item actual
      item.classList.toggle('active');
    });
  });
});

// // Función para observar la visibilidad de las secciones
// const observerOptions = {
//   root: null,
//   rootMargin: '0px',
//   threshold: 0.15
// };
//
// const observer = new IntersectionObserver((entries, observer) => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       entry.target.classList.add('is-visible');
//       // Opcional: Dejar de observar una vez que se ha hecho visible
//       // observer.unobserve(entry.target);
//     }
//   });
// }, observerOptions);
//
// // Observar todas las secciones con la clase 'fade-in-section'
// document.addEventListener('DOMContentLoaded', () => {
//   const sections = document.querySelectorAll('.fade-in-section');
//   sections.forEach(section => {
//     observer.observe(section);
//   });
// });
