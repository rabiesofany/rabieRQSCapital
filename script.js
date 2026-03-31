const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.14,
      rootMargin: "0px 0px -6% 0px",
    },
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

// Contact form handler: opens the user's email client via mailto
function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const name = form.elements["name"]?.value || "";
  const email = form.elements["email"]?.value || "";
  const audience = form.elements["audience"]?.value || form.elements["interest"]?.value || "";
  const company = form.elements["company"]?.value || "";
  const message = form.elements["message"]?.value || "";

  const subject = encodeURIComponent(`Website inquiry from ${name || email}`);
  const bodyLines = [];
  if (name) bodyLines.push(`Name: ${name}`);
  if (company) bodyLines.push(`Company: ${company}`);
  if (audience) bodyLines.push(`Interest: ${audience}`);
  if (email) bodyLines.push(`Reply-to: ${email}`);
  if (message) bodyLines.push(`\nMessage:\n${message}`);

  const body = encodeURIComponent(bodyLines.join("\n"));
  const mailto = `mailto:rabie.sofany.rqs@gmail.com?subject=${subject}&body=${body}`;

  window.location.href = mailto;
  return false;
}
