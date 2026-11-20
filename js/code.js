const grid = document.querySelector("#project-grid");
const detail = document.querySelector("#project-detail");
const count = document.querySelector("#collection-count");
const detailPosition = document.querySelector("#detail-position");
const suggestionForm = document.querySelector("#suggestionForm");
const themeButton = document.querySelector("#theme-toggle");
let projects = [];
let totalProjects = 0;
let currentProjectIndex = 0;
let darkMode = false;

fetch("js/projects.json")
  .then(response => response.json())
  .then(data => {
    projects = data;
    let cardsHTML = "";
    let cardIndex = 0;

    projects.forEach(project => {
      cardsHTML += `
        <div class="col">
          <a class="project-card" href="#detail" onclick="showProject(${cardIndex})">
            <span class="card-image-wrap">
              <img src="${project.image}" alt="${project.title}" class="img-fluid object-fit-contain">
            </span>
            <span class="project-card-body">
              <span class="card-eyebrow"><span class="card-index">${cardIndex + 1}</span><span class="project-type">${project.type}</span></span>
              <span class="project-card-title">${project.title}</span>
              <span class="project-card-meta"><span>${project.city} / ${project.year}</span><i class="bi bi-arrow-down-right"></i></span>
            </span>
          </a>
        </div>`;
      cardIndex = cardIndex + 1;
    });

    totalProjects = cardIndex;
    grid.innerHTML = cardsHTML;
    count.innerHTML = totalProjects + " projects in the archive";
    document.querySelector("#hero-project-count").innerHTML = totalProjects;
    showProject(0);
  })

  .catch(error => {
    grid.innerHTML = "<p>The JSON file could not be loaded. Open the project with Live Server.</p>";
  });

function showProject(index) {
  const project = projects[index];
  currentProjectIndex = index;
  let photoCreditHTML = "";
  if (project.photographer) {
    let imageCreditLabel = "Photo";
    if (project.imageCreditLabel) {
      imageCreditLabel = project.imageCreditLabel;
    }
    photoCreditHTML = `<p class="photo-credit">${imageCreditLabel}: ${project.photographer}</p>`;
  }

  detail.innerHTML = `
    <div class="row g-0">
      <div class="col-12 col-lg-6 d-flex align-items-center justify-content-center">
        <div class="feature-image-wrap">
          <img src="${project.image}" alt="${project.title}" class="feature-image img-fluid object-fit-contain">
        </div>
      </div>
      <div class="col-12 col-lg-6">
        <div class="feature-copy d-flex flex-column justify-content-center">
          <p class="kicker">${project.type} / ${project.year}</p>
          <h3>${project.title}</h3>
          <p class="feature-location">${project.city}</p>
          ${photoCreditHTML}
          <p class="feature-description">${project.description}</p>
          <p class="project-fact"><strong>Architecture:</strong> ${project.architect}</p>
          <a class="btn btn-primary" href="${project.destination}" target="_blank">Read about the project</a>
          <a class="map-link" href="${project.map}" target="_blank"><i class="bi bi-geo-alt"></i> Open map</a>
        </div>
      </div>
    </div>`;

  detailPosition.innerHTML = (currentProjectIndex + 1) + " / " + totalProjects;
}

function previousProject() {
  let previousIndex = currentProjectIndex - 1;
  if (!currentProjectIndex) {
    previousIndex = totalProjects - 1;
  }
  showProject(previousIndex);
}

function nextProject() {
  let nextIndex = currentProjectIndex + 1;
  if (!projects[nextIndex]) {
    nextIndex = 0;
  }
  showProject(nextIndex);
}

function changeTheme() {
  let previousTheme = darkMode;

  if (!previousTheme) {
    document.querySelector("body").classList.add("theme-dark");
    themeButton.innerHTML = '<i class="bi bi-sun"></i><span>Light mode</span>';
    darkMode = true;
  }

  if (previousTheme) {
    document.querySelector("body").classList.remove("theme-dark");
    themeButton.innerHTML = '<i class="bi bi-moon-stars"></i><span>Dark mode</span>';
    darkMode = false;
  }
}

suggestionForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!suggestionForm.checkValidity()) {
    event.stopPropagation();
    suggestionForm.classList.add("was-validated");
  }

  if (suggestionForm.checkValidity()) {
    suggestionForm.classList.add("was-validated");
    suggestionForm.innerHTML = '<div class="form-success">Thank you for your suggestion!</div>';
  }
});



