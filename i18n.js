/* QLAB BIO — shared i18n switcher
 * Usage:
 *   <element data-i18n data-kr="한글" data-en="English">한글</element>
 *   <element data-i18n data-kr-html="<b>HTML</b> 가능" data-en-html="HTML <b>OK</b>">...</element>
 *   <button id="langToggle"><span data-lang-current>KR</span><span data-lang-other>EN</span></button>
 *   .lang-btn (no id) also works as a toggle.
 */
(function () {
  const STORAGE_KEY = 'qlab.lang';
  const validLang = (l) => (l === 'en' ? 'en' : 'kr');
  let lang = validLang(localStorage.getItem(STORAGE_KEY) || 'kr');

  const applyLang = (l) => {
    lang = validLang(l);
    document.documentElement.setAttribute('lang', lang === 'en' ? 'en' : 'ko');
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const html = el.getAttribute('data-' + lang + '-html');
      const txt = el.getAttribute('data-' + lang);
      if (html != null) el.innerHTML = html;
      else if (txt != null) el.textContent = txt;
    });
    document.querySelectorAll('[data-lang-current]').forEach((s) => {
      s.textContent = lang === 'en' ? 'EN' : 'KR';
    });
    document.querySelectorAll('[data-lang-other]').forEach((s) => {
      s.textContent = lang === 'en' ? 'KR' : 'EN';
    });
    // .lang-btn fallback (used in news/contact common.css pages)
    document.querySelectorAll('.lang-btn').forEach((b) => {
      if (!b.querySelector('[data-lang-current]')) {
        b.textContent = lang === 'en' ? 'EN / KR' : 'KR / EN';
      }
    });
    localStorage.setItem(STORAGE_KEY, lang);
  };

  const toggle = () => applyLang(lang === 'en' ? 'kr' : 'en');

  document.addEventListener('DOMContentLoaded', () => applyLang(lang));
  // Also apply now in case DOMContentLoaded already fired
  applyLang(lang);

  document.addEventListener('click', (e) => {
    const t = e.target.closest('#langToggle, .lang-btn');
    if (t) { e.preventDefault(); toggle(); }
  });
})();
