(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.getElementById('main-nav');
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav.dataset.open = String(open);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.dataset.open === 'true') {
      nav.dataset.open = 'false';
      toggle.setAttribute('aria-expanded', 'false');
      toggle.focus();
    }
  });
  const tabs = [...document.querySelectorAll('[data-step]')];
  const select = tab => {
    for (const item of tabs) {
      const selected = item === tab;
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
      document.getElementById(item.getAttribute('aria-controls')).hidden = !selected;
    }
  };
  for (const tab of tabs) {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', event => {
      if (!['ArrowLeft','ArrowRight','Home','End'].includes(event.key)) return;
      event.preventDefault();
      let index = tabs.indexOf(tab);
      if (event.key === 'Home') index = 0;
      else if (event.key === 'End') index = tabs.length - 1;
      else index = (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
      select(tabs[index]);
      tabs[index].focus();
    });
  }
  document.querySelectorAll('[data-year]').forEach(element => element.textContent = new Date().getFullYear());
  const form = document.getElementById('enquiry');
  form?.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const vi = form.dataset.language === 'vi';
    const subject = vi ? 'Trao đổi về rtSurvey' : 'rtSurvey enquiry';
    const body = `${vi ? 'Họ tên' : 'Name'}: ${data.get('name')}\nEmail: ${data.get('email')}\n${vi ? 'Tổ chức' : 'Organisation'}: ${data.get('organisation')}\n\n${data.get('message')}`;
    const result = document.getElementById('enquiry-result');
    const note = document.createElement('p');
    note.textContent = form.dataset.prepared;
    const link = document.createElement('a');
    link.href = `mailto:info@rta.vn?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    link.textContent = form.dataset.send + ' →';
    result.replaceChildren(note, link);
  });
})();
