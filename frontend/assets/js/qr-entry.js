(function () {
  const params = new URLSearchParams(window.location.search);
  const qrPayload = params.get('qr');

  function getDeviceFingerprint() {
    const key = 'eevs_device_id';
    let id = localStorage.getItem(key);
    if (!id) {
      id = crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random();
      localStorage.setItem(key, id);
    }
    return id;
  }

  const deviceFingerprint = getDeviceFingerprint();

  function onStart() {
    // TODO: when backend /qr/init exists, call it here with qrPayload + deviceFingerprint.
    const fakeToken = 'DEMO_TOKEN';
    window.location.href = `sign-in.html?token=${encodeURIComponent(fakeToken)}`;
  }

  document.addEventListener('DOMContentLoaded', () => {
    const btn = document.getElementById('btnStart');
    if (btn) {
      btn.addEventListener('click', onStart);
    } else {
      // Fallback: auto-continue if button not found
      onStart();
    }
  });
})();
