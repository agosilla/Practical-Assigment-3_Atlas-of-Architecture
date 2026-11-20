const grid = document.querySelector("#project-grid");
const detail = document.querySelector("#project-detail");
const count = document.querySelector("#collection-count");
const detailPosition = document.querySelector("#detail-position");
const suggestionForm = document.querySelector("#suggestionForm");
const thankYou = document.querySelector("#thankYou");
const themeButton = document.querySelector("#theme-toggle");
let projects = [];
let currentProjectIndex = 0;
let darkMode = false;

fetch("js/projects.json")
  .then(response => response.json())
  .then(data => {
    projects = data;
    let cardsHTML = "";

    projects.forEach((project, index) => {
      cardsHTML += `
        <article class="col">
          <button class="project-card" type="button" onclick="showProject(${index})">
            <span class="card-image-wrap">
              <img src="${project.image}" alt="${project.title}" class="img-fluid object-fit-contain">
            </span>
            <span class="project-card-body">
              <span class="card-eyebrow"><span class="card-index">${index + 1}</span><span class="project-type">${project.type}</span></span>
              <span class="project-card-title">${project.title}</span>
              <span class="project-card-meta"><span>${project.city} / ${project.year}</span><i class="bi bi-arrow-up-right" aria-hidden="true"></i></span>
            </span>
          </button>
        </article>`;
    });

    grid.innerHTML = cardsHTML;
    count.innerHTML = projects.length + " projects in the archive";
    document.querySelector("#hero-project-count").innerHTML = projects.length;
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
    photoCreditHTML = `<p class="photo-credit">${project.imageCreditLabel || "Photo"}: ${project.photographer}</p>`;
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
          <a class="map-link" href="${project.map}" target="_blank"><i class="bi bi-geo-alt" aria-hidden="true"></i> Open map</a>
        </div>
      </div>
    </div>`;

  detailPosition.innerHTML = (currentProjectIndex + 1) + " / " + projects.length;
}

function previousProject() {
  if (currentProjectIndex === 0) {
    showProject(projects.length - 1);
  } else {
    showProject(currentProjectIndex - 1);
  }
}

function nextProject() {
  if (currentProjectIndex === projects.length - 1) {
    showProject(0);
  } else {
    showProject(currentProjectIndex + 1);
  }
}

function changeTheme() {
  if (darkMode === false) {
    document.querySelector("body").classList.add("theme-dark");
    themeButton.innerHTML = '<i class="bi bi-sun" aria-hidden="true"></i><span>Light mode</span>';
    darkMode = true;
  } else {
    document.querySelector("body").classList.remove("theme-dark");
    themeButton.innerHTML = '<i class="bi bi-moon-stars" aria-hidden="true"></i><span>Dark mode</span>';
    darkMode = false;
  }
}

suggestionForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (!suggestionForm.checkValidity()) {
    event.stopPropagation();
    suggestionForm.classList.add("was-validated");
    return;
  }

  suggestionForm.classList.add("was-validated");
  suggestionForm.classList.add("d-none");
  thankYou.classList.remove("d-none");
});



