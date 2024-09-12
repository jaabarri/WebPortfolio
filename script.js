import { skills_data, projects_data } from "./data.js";

const toggle_bar = document.querySelector('.toggle-bar');
const toggle_bar_top = document.querySelector('.toggle-top-bar');
const toggle_bar_bottom = document.querySelector('.toggle-bottom-bar');
const canvas = document.getElementById('circle-gradient');
const tech_skills = document.getElementById('technical-skills')
const soft_skills = document.getElementById('soft-skills');
const projects = document.getElementById('projects-container')


// Toggle for Mobile menu
toggle_bar.addEventListener('click', () => {
    toggle_bar_top.classList.toggle('toggle-top-bar-active');
    toggle_bar_bottom.classList.toggle('toggle-bottom-bar-active');
})


//  ---------- Canvas Circle properties ----------
const ctx = canvas.getContext('2d');

// Gradient properties
let angle = 0;
const gradientRadius = 100;
const circleRadius = 150;
const colorShiftSpeed = 0.01;

function animateGradient() {
    // Clear the canvas before drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate the new center position of the gradient
    const centerX = canvas.width / 2 + Math.sin(angle) * 30;
    const centerY = canvas.height / 2 + Math.cos(angle) * 30;

    // Create a radial gradient
    const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, gradientRadius
    );

    // Dynamic color calculations for blues and whites
    const lightBlue1 = Math.abs(Math.sin(angle * 0.3)) * 100 + 155;  // Light blue range (155-255)
    const lightBlue2 = Math.abs(Math.cos(angle * 0.3)) * 100 + 155;  // Another light blue range

    // Create color variations for the lighter blues
    const color1 = `rgba(0, ${lightBlue1}, 255, 0.8)`;  // Lighter blue with a slight green tint
    const color2 = `rgba(0, ${lightBlue2}, 255, 0.6)`;  // Lighter blue         // White with slight blue

    // Add dynamically generated colors to the gradient
    gradient.addColorStop(0, color1); // Start color (blue tones)
    gradient.addColorStop(1, color2); // End color (light blues and whites)

    // Set the fill style to the gradient
    ctx.fillStyle = gradient;

    // Draw the circle
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, circleRadius, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    // Update angle for animation
    angle += 0.01; // Speed of color change and movement

    // Recursively call this function for continuous animation
    requestAnimationFrame(animateGradient);
}


// Skills Section in the About me section portion
const skills_render = () => {
    let tech_html = ``;
    let soft_html = ``;

    skills_data.forEach(s => {
        if(s.type === 'tech') {
            tech_html += `
            <div class="skill-box">
                ${s.icon}
                <div class='icon-divider'></div>
                <p>${s.skill}</p>
            </div>`;
        } else if(s.type === 'soft'){
            soft_html += `
            <div class="skill-box">
                ${s.icon}
                <div class='icon-divider'></div>
                <p>${s.skill}</p>
            </div>`;
        }
    })

    tech_skills.innerHTML = tech_html;
    soft_skills.innerHTML = soft_html;
}

const projects_render = () => {
    let projects_html = ``;

    projects_data.forEach(p => {
        projects_html += `
        <div class="projects">
            <div>
                <h3 class="sub-headings projects-heading">${p.name}</h3>
                <p class="projects-p">${p.description}</p>
                <a class="project-link" href="${p.url}"><i class="fa-solid fa-arrow-up-right-from-square"></i> Live</a>
            </div>
            <img class="projects-img" src="./assets/${p.img}" alt="${p.alt}">
        </div>`;
    })

    projects.innerHTML = projects_html;

}



// Function calls
animateGradient();
skills_render();
projects_render();
