document.addEventListener('DOMContentLoaded', () => {
  const ctaButton = document.getElementById('cta-button');
  ctaButton.addEventListener('click', () => {
    ctaButton.style.transform = 'scale(1.1)';
    setTimeout(() => {
      ctaButton.style.transform = 'scale(1)';
    }, 200);
  });
});
