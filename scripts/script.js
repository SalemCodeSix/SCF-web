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

      // Animation du cadenas image par image
      const lockSequence = document.querySelector('.lock-sequence');
      if (lockSequence) {
        let frame = 0;
        const totalFrames = 108;
        const frameDelay = 10; // millisecondes entre les frames

        const animateLock = setInterval(() => {
          frame++;
          if (frame < totalFrames) {
            const frameNumber = String(frame).padStart(3, '0');
            lockSequence.src = `assets/images/lockanim/lock${frameNumber}.png`;
          } else {
            clearInterval(animateLock);
          }
        }, frameDelay);
      }

      codeInput.classList.add('valid-code');

      setTimeout(() => {
        if (searchWrapper) searchWrapper.classList.add('fade-out');
      }, 1200);

      setTimeout(() => {
        if (searchWrapper) searchWrapper.style.display = 'none';
        if (homeSection) homeSection.style.display = 'flex';

        const typedText = document.querySelector('.typed-text');
        const logo = document.querySelector('.scf-logo');

        const firstMessage = "connexion...";
        const secondMessage = "SECRET CONSULTING FOOD";
        let index = 0;

        function typeText(text, callback) {
          if (index < text.length) {
            typedText.textContent += text.charAt(index);
            index++;
            const delay = 20 + Math.random() * 40;
            setTimeout(() => typeText(text, callback), delay);
          } else if (callback) {
            setTimeout(callback, 1000);
          }
        }

        function eraseText(callback) {
          const current = typedText.textContent;
          if (current.length > 0) {
            typedText.textContent = current.substring(0, current.length - 1);
            setTimeout(() => eraseText(callback), 15);
          } else if (callback) {
            callback();
          }
        }

        setTimeout(() => {
          index = 0;
          typedText.textContent = "";
          typeText(firstMessage, () => {
            eraseText(() => {
              index = 0;
              typeText(secondMessage, () => {
                typedText.setAttribute('data-text', typedText.textContent);
                // Apply glitch effect
                typedText.classList.add('glitch');

                setTimeout(() => {
                  typedText.style.display = "none";

                  const finalLogo = document.querySelector(".scf-logo-final");
                  finalLogo.style.display = "block";
                  finalLogo.style.opacity = 0;
                  finalLogo.style.transition = "opacity 1s ease";
                  setTimeout(() => {
                    finalLogo.style.opacity = 1;

                    // After delay, fade out the logo and show menu (updated timing and transitions)
                    setTimeout(() => {
                      finalLogo.style.transition = "opacity 1.5s ease";
                      finalLogo.style.opacity = 0;

                      setTimeout(() => {
                        finalLogo.style.display = "none";

                        const menu = document.querySelector(".menu-right");
                        menu.style.display = "flex";
                        menu.style.transition = "opacity 1.5s ease, transform 1.5s ease";
                        menu.style.transform = "translateY(10px)";
                        setTimeout(() => {
                          menu.style.opacity = 1;
                          menu.style.transform = "translateY(0)";
                        }, 100);
                      }, 1600);
                    }, 1500);
                  }, 100);
                }, 1000);
              });
            });
          });
        }, 2000);
      }, 2000);
    }
  }
});

codeInput.addEventListener('keypress', (e) => {
  if (e.key.length === 1 && e.key === e.key.toUpperCase() && e.key !== e.key.toLowerCase()) {
    e.preventDefault();
  }
});
