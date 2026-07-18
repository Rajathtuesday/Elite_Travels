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
