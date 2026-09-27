// Mock intern data (Project 1 is frontend-only, no backend yet)
let interns = [
  { id: 1, name: "Ayesha Khan", role: "Frontend Intern", email: "ayesha@decodelabs.tech" },
  { id: 2, name: "Bilal Ahmed", role: "Backend Intern", email: "bilal@decodelabs.tech" },
  { id: 3, name: "Sara Malik", role: "UI/UX Intern", email: "sara@decodelabs.tech" },
  { id: 4, name: "Usman Tariq", role: "QA Intern", email: "usman@decodelabs.tech" },
];

const internGrid = document.getElementById("internGrid");
const emptyState = document.getElementById("emptyState");
const searchInput = document.getElementById("searchInput");
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

const modal = document.getElementById("internModal");
const addInternBtn = document.getElementById("addInternBtn");
const cancelBtn = document.getElementById("cancelBtn");
const internForm = document.getElementById("internForm");

function initials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function renderInterns(list) {
  internGrid.innerHTML = "";
  emptyState.hidden = list.length !== 0;

  list.forEach((intern) => {
    const card = document.createElement("div");
    card.className = "intern-card";
    card.innerHTML = `
      <div class="avatar">${initials(intern.name)}</div>
      <h3>${intern.name}</h3>
      <p>${intern.role}</p>
      <p>${intern.email}</p>
    `;
    internGrid.appendChild(card);
  });
}

searchInput.addEventListener("input", () => {
  const term = searchInput.value.toLowerCase();
  const filtered = interns.filter(
    (i) => i.name.toLowerCase().includes(term) || i.role.toLowerCase().includes(term)
  );
  renderInterns(filtered);
});

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
});

addInternBtn.addEventListener("click", () => {
  modal.hidden = false;
});

cancelBtn.addEventListener("click", () => {
  modal.hidden = true;
  internForm.reset();
});

internForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("internName").value.trim();
  const role = document.getElementById("internRole").value.trim();
  const email = document.getElementById("internEmail").value.trim();

  interns.push({ id: Date.now(), name, role, email });
  renderInterns(interns);

  modal.hidden = true;
  internForm.reset();
  searchInput.value = "";
});

renderInterns(interns);
