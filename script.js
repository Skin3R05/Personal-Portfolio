/* NAV: offset scrolling for anchor links so sticky header doesn't cover target */
(function () {
  const header = document.querySelector('.navbar');
  const headerOffset = () => (header ? header.offsetHeight + 16 : 88);

  // custom scroll handler for in-page anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const hash = this.getAttribute('href');
      // ignore empty or just '#' or external
      if (!hash || hash === '#' || !hash.startsWith('#')) return;
      const target = document.querySelector(hash);
      if (!target) return;

      e.preventDefault();
      const targetY = target.getBoundingClientRect().top + window.pageYOffset - headerOffset();
      window.scrollTo({ top: targetY, behavior: 'smooth' });

      // update URL without jumping
      history.pushState(null, '', hash);
    });
  });

  // also handle direct loads with hash in URL (page load)
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

/* CONTACT FORM — functional + professional alert */
document.getElementById("contact-form").addEventListener("submit", function(e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    // check empty fields
    if (!name || !email || !message) {
        Swal.fire({
            title: "Incomplete Form",
            text: "Please fill in all fields.",
            icon: "warning",
            confirmButtonText: "Okay"
        });
        return;
    }

    const params = { name, email, message };

    emailjs
        .send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, params)
        .then(() => {
            Swal.fire({
                title: "Message Sent!",
                text: "Thank you for contacting me. I will reply shortly.",
                icon: "success",
                confirmButtonText: "Okay"
            });

            e.target.reset();
        })
        .catch((err) => {
            console.error("EmailJS error:", err);
            Swal.fire({
                title: "Error",
                text: "Something went wrong. Please try again later.",
                icon: "error",
                confirmButtonText: "Okay"
            });
        });
});


