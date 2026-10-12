/* SpaceZ brief: turns three answers into a WhatsApp message. Nothing is sent or stored by this page. */
(function () {
  'use strict';
  var form = document.getElementById('briefForm');
  var out = document.getElementById('briefPreview');
  if (!form || !out) return;
  var PHONE = '61414089988';

  function val(name) {
    var el = form.elements[name];
    if (!el) return '';
    if (el instanceof RadioNodeList) return el.value || '';
    return (el.value || '').trim();
  }
  function message() {
    var type = val('type'), when = val('when'), idea = val('idea'), name = val('name'), biz = val('biz');
    var lines = ['Hi SpaceZ,'];
    lines.push('');
    lines.push('I\'d like ' + (type ? type.charAt(0).toLowerCase() + type.slice(1) : 'something built') + (when ? ', ' + when : '') + '.');
    if (idea) { lines.push(''); lines.push(idea); }
    lines.push('');
    lines.push('Thanks,');
    lines.push((name || 'Your name') + (biz ? ' (' + biz + ')' : ''));
    return lines.join('\n');
  }
  function show() { out.textContent = message(); }
  function err(key, text) { var e = form.querySelector('[data-err="' + key + '"]'); if (e) e.textContent = text || ''; }

  form.addEventListener('input', function (e) { show(); if (e.target.name) err(e.target.name, ''); });
  form.addEventListener('change', function (e) { show(); if (e.target.name) err(e.target.name, ''); });
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var ok = true, first = null;
    if (!val('type')) { err('type', 'Choose what you would like built, or "Something else".'); ok = false; first = first || form.querySelector('[name="type"]'); }
    if (!val('when')) { err('when', 'Choose a timing, or "I\'m flexible".'); ok = false; first = first || form.querySelector('[name="when"]'); }
    if (val('idea').length < 15) { err('idea', 'A sentence or two is enough, at least 15 characters.'); ok = false; first = first || form.elements.idea; }
    if (!val('name')) { err('name', 'Add your name so we know who we are talking to.'); ok = false; first = first || form.elements.name; }
    if (!ok) { if (first) first.focus(); return; }
    window.open('https://wa.me/' + PHONE + '?text=' + encodeURIComponent(message()), '_blank', 'noopener');
  });
  show();
})();
