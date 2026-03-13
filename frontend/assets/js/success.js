(function () {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token') || 'DEMO_TOKEN';
  const successMessage = document.getElementById('successMessage');
  const btnDone = document.getElementById('btnDone');

  document.addEventListener('DOMContentLoaded', () => {
    const detailsRaw = sessionStorage.getItem('eevs_details');
    if (detailsRaw) {
      try {
        const details = JSON.parse(detailsRaw);
        if (details.fullName) {
          successMessage.textContent = `Thank you, ${details.fullName}. Your entry has been recorded.`;
        }
      } catch (e) {
        // ignore parse errors
      }
    }

    if (btnDone) {
      btnDone.addEventListener('click', () => {
        // End of flow: go back to QR screen or close tab
        window.location.href = 'index.html';
      });
    }
  });
})();
