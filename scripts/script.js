const codeInput = document.querySelector('.code-input');

codeInput.addEventListener('input', () => {
  // plus besoin de reconstruire les spans, on laisse le texte libre
});

function placeCaretAtEnd(el) {
  el.focus();
  if (typeof window.getSelection != "undefined"
    && typeof document.createRange != "undefined") {
    const range = document.createRange();
    range.selectNodeContents(el);
    range.collapse(false);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
}

codeInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    const inputValue = codeInput.innerText.replace(/\s/g, '').toLowerCase();
    if (inputValue !== 'secret') {
      document.body.classList.add('error');
      setTimeout(() => {
        document.body.classList.remove('error');
      }, 1000);
    } else {
      document.body.classList.add('success');

      const searchWrapper = document.querySelector('.search-wrapper');
      const homeSection = document.querySelector('.home');

      codeInput.classList.add('valid-code');

      setTimeout(() => {
        if (searchWrapper) searchWrapper.classList.add('fade-out');
      }, 1200);

      setTimeout(() => {
        if (searchWrapper) searchWrapper.style.display = 'none';
        if (homeSection) homeSection.style.display = 'flex';
      }, 2000);
    }
  }
});

codeInput.addEventListener('keypress', (e) => {
  if (e.key.length === 1 && e.key === e.key.toUpperCase() && e.key !== e.key.toLowerCase()) {
    e.preventDefault();
  }
});
