// Form handling and portfolio generation
document.getElementById('portfolioForm').addEventListener('submit', function(e) {
    e.preventDefault();
    generatePortfolio();
});

function addSkill() {
    const container = document.getElementById('skillsContainer');
    const skillDiv = document.createElement('div');
    skillDiv.className = 'skill-input';
    skillDiv.innerHTML = `
        <input type="text" placeholder="Skill name" class="skill">
        <button type="button" onclick="removeSkill(this)" class="remove-btn"><i class="fas fa-times"></i></button>
    `;
    container.appendChild(skillDiv);
}

function removeSkill(button) {
    button.parentElement.remove();
}

function addProject() {
    const container = document.getElementById('projectsContainer');
    const projectDiv = document.createElement('div');
    projectDiv.className = 'project-input';
    projectDiv.innerHTML = `
        <input type="text" placeholder="Project Name" class="project-name">
        <input type="text" placeholder="Project Description" class="project-desc">
        <input type="url" placeholder="Project URL" class="project-url">
        <button type="button" onclick="removeProject(this)" class="remove-btn"><i class="fas fa-times"></i></button>
    `;
    container.appendChild(projectDiv);
}

function removeProject(button) {
    button.parentElement.remove();
}

function generatePortfolio() {
    const formData = collectFormData();
    const portfolioHTML = createPortfolioHTML(formData);
    
    document.getElementById('portfolioPreview').innerHTML = portfolioHTML;
    document.getElementById('previewSection').style.display = 'block';
    
    // Scroll to preview
    document.getElementById('previewSection').scrollIntoView({ behavior: 'smooth' });
}

function collectFormData() {
    const skills = Array.from(document.querySelectorAll('.skill')).map(input => input.value).filter(skill => skill.trim());
    const projects = [];
    
    document.querySelectorAll('.project-input').forEach(projectDiv => {
        const name = projectDiv.querySelector('.project-name').value;
        const desc = projectDiv.querySelector('.project-desc').value;
        const url = projectDiv.querySelector('.project-url').value;
        
        if (name.trim()) {
            projects.push({ name, desc, url });
        }
    });

    return {
        fullName: document.getElementById('fullName').value,
        title: document.getElementById('title').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        location: document.getElementById('location').value,
        about: document.getElementById('about').value,
        github: document.getElementById('github').value,
        linkedin: document.getElementById('linkedin').value,
        twitter: document.getElementById('twitter').value,
        skills: skills,
        projects: projects
    };
}

function createPortfolioHTML(data) {
    const skillsHTML = data.skills.map(skill => 
        `<span class="skill-tag">${skill}</span>`
    ).join('');

    const projectsHTML = data.projects.map(project => `
        <div class="project-card">
            <h3>${project.name}</h3>
            <p>${project.desc}</p>
            ${project.url ? `<a href="${project.url}" target="_blank">View Project →</a>` : ''}
        </div>
    `).join('');

    return `
        <div class="portfolio-content">
            <div class="portfolio-header">
                <h1>${data.fullName}</h1>
                <p>${data.title}</p>
                <div class="contact-info">
                    ${data.email ? `<span><i class="fas fa-envelope"></i> ${data.email}</span>` : ''}
                    ${data.phone ? `<span><i class="fas fa-phone"></i> ${data.phone}</span>` : ''}
                    ${data.location ? `<span><i class="fas fa-map-marker-alt"></i> ${data.location}</span>` : ''}
                </div>
                <div class="social-links">
                    ${data.github ? `<a href="${data.github}" target="_blank"><i class="fab fa-github"></i></a>` : ''}
                    ${data.linkedin ? `<a href="${data.linkedin}" target="_blank"><i class="fab fa-linkedin"></i></a>` : ''}
                    ${data.twitter ? `<a href="${data.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>` : ''}
                </div>
            </div>

            ${data.about ? `
            <div class="section">
                <h2>About Me</h2>
                <p>${data.about}</p>
            </div>
            ` : ''}

            ${data.skills.length > 0 ? `
            <div class="section">
                <h2>Skills</h2>
                <div class="skills-grid">
                    ${skillsHTML}
                </div>
            </div>
            ` : ''}

            ${data.projects.length > 0 ? `
            <div class="section">
                <h2>Projects</h2>
                <div class="projects-grid">
                    ${projectsHTML}
                </div>
            </div>
            ` : ''}
        </div>
    `;
}

function downloadPortfolio() {
    const formData = collectFormData();
    const htmlContent = generateDownloadableHTML(formData);
    
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.fullName.replace(/\s+/g, '_')}_portfolio.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function generateDownloadableHTML(data) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${data.fullName} - Portfolio</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #0e0f0f 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .container {
            max-width: 1000px;
            margin: 0 auto;
            padding: 40px 20px;
        }
        
        .portfolio-content {
            background: white;
            border-radius: 20px;
            padding: 60px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .portfolio-header {
            text-align: center;
            margin-bottom: 60px;
        }
        
        .portfolio-header h1 {
            font-size: 3rem;
            color: #333;
            margin-bottom: 10px;
        }
        
        .portfolio-header p {
            font-size: 1.5rem;
            color: #666;
            margin-bottom: 20px;
        }
        
        .contact-info {
            display: flex;
            justify-content: center;
            gap: 30px;
            margin: 20px 0;
            flex-wrap: wrap;
        }
        
        .contact-info span {
            color: #666;
            font-size: 1.1rem;
        }
        
        .social-links {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin: 30px 0;
        }
        
        .social-links a {
            color: #667eea;
            font-size: 2rem;
            transition: transform 0.3s;
        }
        
        .social-links a:hover {
            transform: scale(1.2);
        }
        
        .section {
            margin: 50px 0;
        }
        
        .section h2 {
            color: #333;
            font-size: 2rem;
            margin-bottom: 20px;
            border-bottom: 3px solid #667eea;
            padding-bottom: 10px;
        }
        
        .skills-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 15px;
        }
        
        .skill-tag {
            background: #667eea;
            color: white;
            padding: 10px 20px;
            border-radius: 25px;
            text-align: center;
            font-weight: 600;
        }
        
        .projects-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 30px;
        }
        
        .project-card {
            border: 1px solid #e1e5e9;
            border-radius: 15px;
            padding: 30px;
            transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .project-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .project-card h3 {
            color: #333;
            font-size: 1.5rem;
            margin-bottom: 15px;
        }
        
        .project-card p {
            color: #666;
            margin-bottom: 20px;
            line-height: 1.6;
        }
        
        .project-card a {
            color: #667eea;
            text-decoration: none;
            font-weight: 600;
        }
        
        .project-card a:hover {
            text-decoration: underline;
        }
        
        @media (max-width: 768px) {
            .container {
                padding: 20px 10px;
            }
            
            .portfolio-content {
                padding: 40px 20px;
            }
            
            .portfolio-header h1 {
                font-size: 2.5rem;
            }
            
            .contact-info {
                flex-direction: column;
                align-items: center;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        ${createPortfolioHTML(data)}
    </div>
</body>
</html>`;
}

function editPortfolio() {
    document.getElementById('previewSection').style.display = 'none';
    document.querySelector('.generator-section').scrollIntoView({ behavior: 'smooth' });
}

// Initialize with one skill and one project
document.addEventListener('DOMContentLoaded', function() {
    // Add initial skill and project if empty
    if (document.querySelectorAll('.skill-input').length === 0) {
        addSkill();
    }
    if (document.querySelectorAll('.project-input').length === 0) {
        addProject();
    }
});
