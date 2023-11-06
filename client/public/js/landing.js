document.addEventListener('DOMContentLoaded', function() {
  const ctaButton = document.getElementById('cta-button');
  ctaButton.addEventListener('click', function() {
      ctaButton.style.transform = 'scale(1.1)';
      setTimeout(() => {
          ctaButton.style.transform = 'scale(1)';
      }, 200);
  });
});
