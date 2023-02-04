function generateHTML() {
    let html = "";
    for (const employee of employeeInfo) {
        html += `<header>
      <h1>MY TEAM</h1>
  </header>
  <main class="card-container">
      <div class="card">
          <div class="name">
              <p class="card-name">${employee.name}</p>
              <p class="card-title">Manager</p>
          </div>
          <div class="card-body">
              <div class="card-items">
                  <p class="card-1">ID: ${employee.id}</p>
                  <p class="card-2">EMAIL: <a href="">${employee.email}</a> </p>
                  <p class="card-3"></p>
              </div>
          </div>
      </div>
    
  </main>`;
        if (employee instanceof Manager) {
            html += `<p class="card-3">Office Number: ${employee.officeNumber}</p>`;
        } else if (employee instanceof Engineer) {
            html += `<p class="card-3">GitHub: <a href="https://github.com/${employee.github}">${employee.github}</a></p>`;
        } else if (employee instanceof Intern) {
            html += `<p class="card-3">School: ${employee.school}</p>`;
        }

    }
    fs.writeFile("index.html", html, (err) => {
        if (err) throw err;
        console.log("The HTML file has been created.");
    });
}



module.exports = generateHTML;
