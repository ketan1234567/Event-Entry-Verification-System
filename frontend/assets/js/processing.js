(function () {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token') || 'DEMO_TOKEN';

  document.addEventListener('DOMContentLoaded', () => {
    // Simulate backend processing delay
    setTimeout(() => {
      window.location.href = `success.html?token=${encodeURIComponent(token)}`;
    }, 2000);
  });
})();
