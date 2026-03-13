(function () {
  const form = document.getElementById('signInForm');
  const messageDiv = document.getElementById('signInMessage');
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token') || 'DEMO_TOKEN';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    messageDiv.textContent = 'Signing in...';

    const employeeId = document.getElementById('employeeId').value.trim();

    try {
      // Call backend employee verify if available
      const res = await fetch('/api/public/employee/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId, token }),
      });

      const data = await res.json();

      if (!res.ok) {
        messageDiv.textContent = data.error || 'Unable to sign in';
        return;
      }

      // Store basic employee info for later screens
      sessionStorage.setItem('eevs_employee', JSON.stringify(data.employee));

      // Go to details form
      window.location.href = `details-form.html?token=${encodeURIComponent(token)}`;
    } catch (err) {
      messageDiv.textContent = 'Network error. Please try again.';
    }
  });
})();
