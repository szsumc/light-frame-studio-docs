(() => {
  const labels = {
    zh: { home: '首页', release: '版本记录', github: 'GitHub', web: 'Web 版工具', docs: '软件说明', license: '许可协议' },
    ja: { home: 'ホーム', release: 'リリース', github: 'GitHub', web: 'Web ツール', docs: 'ソフトウェア説明', license: 'ライセンス' },
    en: { home: 'Home', release: 'Release', github: 'GitHub', web: 'Web Tool', docs: 'App Documentation', license: 'License' }
  };

  function languageFor(button) {
    if (button?.dataset.lang) return button.dataset.lang;
    if (button?.textContent.trim() === '日本語') return 'ja';
    if (button?.textContent.trim() === 'EN') return 'en';
    return 'zh';
  }

  function currentLanguage() {
    return languageFor(document.querySelector('.lang-btn.active'));
  }

  function isCurrentPage(path) {
    const page = location.pathname.split('/').pop() || 'index.html';
    return page === path || (path === 'index.html' && page === '');
  }

  function createLink(href, text, external = false) {
    const link = document.createElement('a');
    link.href = href;
    link.textContent = text;
    if (external) {
      link.target = '_blank';
      link.rel = 'noreferrer';
    }
    return link;
  }

  function render(language) {
    const text = labels[language] || labels.zh;
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
      navLinks.replaceChildren(
        createLink('index.html', text.home),
        createLink('release.html', text.release),
        createLink('https://github.com/szsumc/light-frame-studio/', text.github, true),
        createLink('web.html', text.web)
      );
      [...navLinks.querySelectorAll('a')].forEach((link) => {
        link.classList.toggle('active', isCurrentPage(link.getAttribute('href')));
      });
    }

    const footerLinks = document.querySelector('.footer-links');
    if (footerLinks) {
      footerLinks.replaceChildren(
        createLink('https://github.com/szsumc/light-frame-studio/', text.github, true),
        createLink('index.html', text.docs),
        createLink('web.html', text.web),
        createLink('release.html', text.release),
        createLink('https://polyformproject.org/licenses/noncommercial/1.0.0', text.license, true)
      );
    }
  }

  document.querySelectorAll('.lang-btn').forEach((button) => {
    button.addEventListener('click', () => {
      setTimeout(() => render(languageFor(button)), 0);
    });
  });

  render(currentLanguage());
})();
