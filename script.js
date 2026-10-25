// ============================================================
// Team content: edit this section to update the site.
// Everything marked "placeholder" should be replaced with real info.
// ============================================================

const TEAM = {
  email: "team@example.com",              // placeholder
  instagram: "https://instagram.com/",    // placeholder
  buildHours: 0,                          // update as the season goes
};

// Leave `photo` empty to show initials instead.
const MEMBERS = [
  { name: "Member Name", role: "Captain / Driver", bio: "Placeholder bio. A sentence about what they do on the team.", photo: "" },
  { name: "Member Name", role: "Lead Builder", bio: "Placeholder bio.", photo: "" },
  { name: "Member Name", role: "Programmer", bio: "Placeholder bio.", photo: "" },
  { name: "Member Name", role: "Engineering Notebook", bio: "Placeholder bio.", photo: "" },
];

const ROBOT_SPECS = [
  ["Drivetrain", "Placeholder: e.g. 6-motor tank drive"],
  ["Intake", "Placeholder"],
  ["Scoring", "Placeholder"],
  ["Sensors", "Placeholder: e.g. inertial sensor, rotation sensors"],
  ["Autonomous", "Placeholder: routines we run"],
  ["Code", "Placeholder: e.g. PROS / VEXcode, C++"],
];

// `done: true` fills in the timeline dot. `award` is optional.
const EVENTS = [
  { date: "TBD", name: "Event name", place: "Location", result: "Placeholder: record / ranking", award: "", done: false },
  { date: "TBD", name: "Event name", place: "Location", result: "", award: "", done: false },
];

// Add `url` to link a sponsor's website.
const SPONSORS = [
  { name: "Your company here", url: "" },
];

// ============================================================
// Rendering: no need to edit below this line.
// ============================================================

const $ = (sel) => document.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const initials = (name) => name.split(/\s+/).map((w) => w[0] || "").join("").slice(0, 2).toUpperCase();

$("#robot-specs").innerHTML = ROBOT_SPECS
  .map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`)
  .join("");

$("#members").innerHTML = MEMBERS.map((m) => `
  <article class="card member">
    <div class="avatar">${m.photo ? `<img src="${esc(m.photo)}" alt="${esc(m.name)}">` : esc(initials(m.name))}</div>
    <h3>${esc(m.name)}</h3>
    <p class="role">${esc(m.role)}</p>
    <p>${esc(m.bio)}</p>
  </article>`).join("");

$("#events").innerHTML = EVENTS.map((e) => `
  <li class="${e.done ? "done" : ""}">
    <span class="date">${esc(e.date)}</span>
    <h3>${esc(e.name)}</h3>
    <p>${esc(e.place)}${e.result ? ` · ${esc(e.result)}` : ""}</p>
    ${e.award ? `<span class="badge">🏆 ${esc(e.award)}</span>` : ""}
  </li>`).join("");

$("#sponsor-list").innerHTML = SPONSORS.map((s) => s.url
  ? `<a class="sponsor" href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.name)}</a>`
  : `<div class="sponsor${s.name === "Your company here" ? " open" : ""}">${esc(s.name)}</div>`).join("");

const email = $("#contact-email");
email.href = `mailto:${TEAM.email}`;
email.textContent = TEAM.email;
$("#contact-insta").href = TEAM.instagram;
$("#year").textContent = new Date().getFullYear();

// Stats count up when they scroll into view.
const stats = {
  "#stat-members": MEMBERS.length,
  "#stat-events": EVENTS.length,
  "#stat-awards": EVENTS.filter((e) => e.award).length,
  "#stat-hours": TEAM.buildHours,
};
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
function countUp(el, target) {
  if (reduceMotion || target === 0) { el.textContent = target; return; }
  const start = performance.now();
  const step = (now) => {
    const t = Math.min((now - start) / 1000, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - t, 3)));
    if (t < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}
const observer = new IntersectionObserver((entries) => {
  if (!entries.some((e) => e.isIntersecting)) return;
  Object.entries(stats).forEach(([sel, n]) => countUp($(sel), n));
  observer.disconnect();
});
observer.observe($(".stats"));

// Mobile menu
const toggle = $(".nav-toggle");
const links = $("#nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
links.addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    links.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }
});
