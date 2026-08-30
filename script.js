document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.navtoggle');
  var links = document.querySelector('.navlinks');
  if (!toggle || !links) return;
  toggle.addEventListener('click', function () {
    links.classList.toggle('open');
    var icon = toggle.querySelector('i');
    if (icon) icon.className = links.classList.contains('open') ? 'bi bi-x-lg' : 'bi bi-list';
  });
  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { links.classList.remove('open'); });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  var form = document.getElementById('enquiryForm');
  var status = document.getElementById('formStatus');
  if (!form || !status) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var btn = form.querySelector('button[type="submit"]');
    var originalLabel = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Sending...';
    status.className = 'form-status';
    status.textContent = '';

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(Object.fromEntries(new FormData(form)))
    })
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data.success) {
          status.textContent = "Thanks! We've got your details and will call you back shortly.";
          status.classList.add('form-status-ok');
          form.reset();
        } else {
          status.textContent = 'Something went wrong sending that. Please call or WhatsApp us instead.';
          status.classList.add('form-status-error');
        }
      })
      .catch(function () {
        status.textContent = 'Something went wrong sending that. Please call or WhatsApp us instead.';
        status.classList.add('form-status-error');
      })
      .finally(function () {
        btn.disabled = false;
        btn.textContent = originalLabel;
      });
  });
});
