function showSection(id) {
  document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function selectPresence(val) {
  document.getElementById('opt-yes').classList.toggle('selected', val === 'yes');
  document.getElementById('opt-no').classList.toggle('selected', val === 'no');
}

function submitRSVP() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  if (!name || !email) {
    alert('Merci de renseigner votre nom et email.');
    return;
  }
  const isYes = document.getElementById('opt-yes').classList.contains('selected');
  const guests = document.getElementById('guests').value;
  const message = document.getElementById('message').value;

  const SHEET_URL = 'VOTRE_URL_GOOGLE_SHEETS_ICI';
  const params = new URLSearchParams({ name, email, presence: isYes ? 'Oui' : 'Non', guests, message });
  fetch(`${SHEET_URL}?${params}`).catch(() => {});

  document.getElementById('form-content').style.display = 'none';
  document.getElementById('success').style.display = 'block';
}

function updateCountdown() {
  const target = new Date('2026-07-17T10:30:00');
  const now = new Date();
  const diff = target - now;
  if (diff <= 0) {
    document.getElementById('cd-days').textContent = '0';
    document.getElementById('cd-hours').textContent = '0';
    document.getElementById('cd-mins').textContent = '0';
    document.getElementById('cd-secs').textContent = '0';
    return;
  }
  document.getElementById('cd-days').textContent = Math.floor(diff / 86400000);
  document.getElementById('cd-hours').textContent = Math.floor((diff % 86400000) / 3600000);
  document.getElementById('cd-mins').textContent = Math.floor((diff % 3600000) / 60000);
  document.getElementById('cd-secs').textContent = Math.floor((diff % 60000) / 1000);
}
updateCountdown();
setInterval(updateCountdown, 1000);

