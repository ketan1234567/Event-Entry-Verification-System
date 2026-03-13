(function () {
  const form = document.getElementById('employee-form');
  const resultDiv = document.getElementById('employee-result');
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const employeeId = document.getElementById('employeeId').value.trim();
    resultDiv.textContent = 'Verifying...';

    try {
      const res = await fetch('/api/public/employee/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ employeeId, token }),
      });

      const data = await res.json();

      if (!res.ok) {
        resultDiv.textContent = data.error || 'Error verifying employee';
        return;
      }

      resultDiv.textContent = `Hello ${data.employee.first_name} ${data.employee.last_name}`;
    } catch (err) {
      resultDiv.textContent = 'Network error';
    }
  });
})();
