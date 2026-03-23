// Select all links with hashes, excluding placeholder hrefs
document.querySelectorAll('a[href*="#"]:not([href="#"]):not([href="#0"])')
  .forEach(link => {
    link.addEventListener('click', function (event) {
      // Only handle on-page links
      if (
        location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') &&
        location.hostname === this.hostname
      ) {
        // Find scroll target by id or name
        const hash = this.hash.slice(1);
        const target =
          document.getElementById(hash) ??
          document.querySelector(`[name="${hash}"]`);

        if (target) {
          event.preventDefault();

          target.scrollIntoView({ behavior: 'smooth', block: 'start' });

          // Focus management for accessibility
          const onScrollEnd = () => {
            if (!target.matches(':focus')) {
              target.setAttribute('tabindex', '-1');
            }
            target.focus({ preventScroll: true });
          };

          // scrollend is well-supported in modern browsers; setTimeout as fallback
          if ('onscrollend' in window) {
            window.addEventListener('scrollend', onScrollEnd, { once: true });
          } else {
            setTimeout(onScrollEnd, 1000);
          }
        }
      }
    });
  });
