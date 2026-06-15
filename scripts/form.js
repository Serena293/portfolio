const menuButton = document.getElementById("toggle-btn");
const navigationLinks = document.getElementById("links-nav");
const form = document.getElementById("myForm");
const formStatus = document.getElementById("form-status");

if (menuButton && navigationLinks) {
  menuButton.addEventListener("click", () => {
    const isOpen = navigationLinks.classList.contains("show");
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  });
}

if (form && formStatus) {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const submitButton = form.querySelector('button[type="submit"]');
    const originalContent = submitButton.innerHTML;

    formStatus.className = "form-status";
    formStatus.textContent = "";
    submitButton.disabled = true;
    submitButton.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin" aria-hidden="true"></i>';

    try {
      const response = await fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: {
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Form submission failed");
      }

      form.reset();
      formStatus.className = "form-status is-visible is-success";
      formStatus.textContent = "Thank you. Your message has been sent and I'll reply as soon as possible.";
    } catch (error) {
      formStatus.className = "form-status is-visible is-error";
      formStatus.textContent = "Your message could not be sent. Please try again or contact me directly by email.";
      console.error("Form error:", error);
    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalContent;
    }
  });
}
