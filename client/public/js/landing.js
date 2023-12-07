document.addEventListener('DOMContentLoaded', () => {
  const ctaButton = document.getElementById('cta-button');

  // Efecto al pasar el cursor por encima del botón
  ctaButton.addEventListener('mouseover', () => {
    ctaButton.style.transform = 'scale(1.05)';
  });

  // Efecto al quitar el cursor del botón
  ctaButton.addEventListener('mouseout', () => {
    ctaButton.style.transform = 'scale(1)';
  });

  // Efecto al hacer clic en el botón
  ctaButton.addEventListener('click', () => {
    ctaButton.style.transform = 'scale(1.1)';
    setTimeout(() => {
      ctaButton.style.transform = 'scale(1)';
    }, 200);
  });
});
