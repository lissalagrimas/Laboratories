let courses = [
  { code: "IT101", title: "Introduction to Computing", credits: 3, department: "BSIT" },
  { code: "IT201", title: "Database Systems", credits: 4, department: "BSIT" },
  { code: "CHEM101", title: "General Chemistry", credits: 5, department: "BSChemistry" },
  { code: "MATH101", title: "Calculus I", credits: 4, department: "BSMath" },
  { code: "BIO101", title: "General Biology", credits: 3, department: "BSBio" },
  { code: "MBIO101", title: "Marine Ecology", credits: 3, department: "BSMarineBio" }
];

const courseList = document.getElementById("course-list");
const departmentFilter = document.getElementById("department-filter");
const filteredList = document.getElementById("filtered-list");
const programCreditsEl = document.getElementById("program-credits");
const groupedCoursesDiv = document.getElementById("grouped-courses");
const fetchBtn = document.getElementById("fetch-btn");

function renderCourses() {
  courseList.innerHTML = "";

  const grouped = courses.reduce((acc, c) => {
    if (!acc[c.department]) acc[c.department] = [];
    acc[c.department].push(c);
    return acc;
  }, {});

  for (const dept in grouped) {
    const deptHeading = document.createElement("h4");
    deptHeading.textContent = dept;
    courseList.appendChild(deptHeading);

    const ul = document.createElement("ul");
    grouped[dept].forEach(c => {
      const li = document.createElement("li");
      li.textContent = `${c.code} - ${c.title} (${c.credits} credits)`;
      ul.appendChild(li);
    });
    courseList.appendChild(ul);
  }
}

function filterCourses() {
  const dept = departmentFilter.value;
  filteredList.innerHTML = "";

  const filtered = dept === "All" ? courses : courses.filter(c => c.department === dept);

  filtered.forEach(c => {
    const li = document.createElement("li");
    li.textContent = `${c.code} - ${c.title} (${c.credits} credits)`;
    filteredList.appendChild(li);
  });

  const total = filtered.reduce((sum, c) => sum + c.credits, 0);
  programCreditsEl.textContent = total;
}

function groupByCredits() {
  groupedCoursesDiv.innerHTML = "";
  const groups = {
    "1-3 credits": courses.filter(c => c.credits >= 1 && c.credits <= 3),
    "4-5 credits": courses.filter(c => c.credits >= 4 && c.credits <= 5),
    "6+ credits": courses.filter(c => c.credits >= 6)
  };

  for (const [range, list] of Object.entries(groups)) {
    const section = document.createElement("div");
    const title = document.createElement("h4");
    title.textContent = range;
    section.appendChild(title);

    if (list.length === 0) {
      section.appendChild(document.createTextNode("No courses"));
    } else {
      const ul = document.createElement("ul");
      list.forEach(c => {
        const li = document.createElement("li");
        li.textContent = `${c.code} - ${c.title} (${c.credits} credits, ${c.department})`;
        ul.appendChild(li);
      });
      section.appendChild(ul);
    }
    groupedCoursesDiv.appendChild(section);
  }
}

function updateDepartmentOptions() {
  const existing = Array.from(departmentFilter.options).map(opt => opt.value);
  const uniqueDepts = [...new Set(courses.map(c => c.department))];

  uniqueDepts.forEach(dept => {
    if (!existing.includes(dept)) {
      const option = document.createElement("option");
      option.value = dept;
      option.textContent = dept;
      departmentFilter.appendChild(option);
    }
  });
}

function fetchNewCourses() {
  fetchBtn.disabled = true;
  fetchBtn.textContent = "Fetching...";
  setTimeout(() => {
    const newCourses = [
      { code: "IT301", title: "Operating Systems", credits: 4, department: "BSIT" },
      { code: "CHEM201", title: "Organic Chemistry", credits: 4, department: "BSChemistry" },
      { code: "MATH201", title: "Linear Algebra", credits: 3, department: "BSMath" },
      { code: "BIO201", title: "Cell Biology", credits: 4, department: "BSBio" },
      { code: "MBIO201", title: "Marine Botany", credits: 3, department: "BSMarineBio" }
    ];
    courses = courses.concat(newCourses);

    renderCourses();
    updateDepartmentOptions();
    filterCourses();
    groupByCredits();

    fetchBtn.disabled = false;
    fetchBtn.textContent = "Fetch New Courses";
  }, 1500);
}

departmentFilter.addEventListener("change", filterCourses);
fetchBtn.addEventListener("click", fetchNewCourses);

renderCourses();
filterCourses();
groupByCredits();