// main flow
window.onload = () => {
  scrollIntoView(".section-about");
};

// utils
function scrollIntoView(selector) {
  document
    .querySelector(selector)
    .scrollIntoView({ behavior: "smooth", block: "end", inline: "end" });
}
