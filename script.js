/* NAV: offset scrolling for anchor links so sticky header doesn't cover target */
(function () {
  const header = document.querySelector('.navbar');
  const headerOffset = () => (header ? header.offsetHeight + 16 : 88);

  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const hash = this.getAttribute('href');
      if (!hash || hash === '#' || !hash.startsWith('#')) return;
      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      const targetY = target.getBoundingClientRect().top + window.pageYOffset - headerOffset();
      window.scrollTo({ top: targetY, behavior: 'smooth' });
      history.pushState(null, '', hash);
    });
  });

  window.addEventListener('load', function () {
    if (location.hash) {
      const target = document.querySelector(location.hash);
      if (target) {
        const targetY = target.getBoundingClientRect().top + window.pageYOffset - headerOffset();
        window.scrollTo({ top: targetY, behavior: 'instant' });
      }
    }
  });
})();

/* CONTACT FORM - Web3Forms + SweetAlert2 */
document.getElementById("contact-form").addEventListener("submit", async function (e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
    });

    const result = await response.json();

    if (response.ok) {
        Swal.fire({
            icon: "success",
            title: "Message Sent!",
            text: "Thanks for contacting me - I will get back to you soon.",
        });
        form.reset();
    } else {
        Swal.fire({
            icon: "error",
            title: "Error",
            text: result.message || "Something went wrong. Please try again.",
        });
    }
});
