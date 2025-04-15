/**
 * Configuration and constants for the HTML2PDF app
 */

// PDF generation options for the HTML2PDF.app API
// See: https://html2pdf.app/documentation/ for all available options
export const pdfOptions = {
    // PDF page size and orientation
    format: 'A4',
    landscape: false,
    
    // Page margins (in mm)
    margin: {
        top: 20,
        right: 10,
        bottom: 20,
        left: 10
    },
    
    // PDF document settings
    printBackground: true,
    scale: 1.0,
    
    // Header and footer (optional)
    displayHeaderFooter: false,
    headerTemplate: '',
    footerTemplate: '',
    
    // Advanced options
    preferCSSPageSize: true
};

// Author links for the sidebar
export const AUTHOR_LINKS = [
    { label: 'GitHub', url: 'https://github.com/Benighter', icon: 'fab fa-github' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/bennet-nkolele-321285249/', icon: 'fab fa-linkedin' },
    { label: 'Portfolio', url: 'https://react-personal-portfolio-alpha.vercel.app/', icon: 'fas fa-globe' }
];

// Sample HTML template that gets loaded when using the "Load Sample" button
export const sampleHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Sample Document</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
        }
        h1 {
            color: #2563eb;
            border-bottom: 2px solid #e2e8f0;
            padding-bottom: 10px;
        }
        .profile {
            display: flex;
            align-items: center;
            gap: 20px;
            margin: 20px 0;
            padding: 15px;
            background-color: #f8fafc;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        .profile-content {
            flex: 1;
        }
        h2 {
            color: #4361ee;
            margin-top: 30px;
        }
        ul {
            list-style-type: square;
            padding-left: 20px;
        }
        li {
            margin-bottom: 8px;
        }
        .btn {
            display: inline-block;
            background-color: #3b82f6;
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            text-decoration: none;
            margin-top: 10px;
            font-weight: 500;
        }
        .btn:hover {
            background-color: #2563eb;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Bennet Nkolele</h1>
        
        <div class="profile">
            <div class="profile-content">
                <p><strong>Full-Stack Developer | Cloud & DevOps Enthusiast | TEFL Certified Instructor</strong></p>
                <p>With expertise in modern web technologies and a passion for creating elegant digital solutions.</p>
            </div>
        </div>
        
        <h2>Contact</h2>
        <p>Phone: +2781XXXXXXX</p>
        <p>Email: example@example.com</p>
        
        <h2>Skills</h2>
        <ul>
            <li>Frontend: React, Vue, TypeScript, JavaScript</li>
            <li>Backend: Node.js, Express, Python, Django</li>
            <li>Cloud: AWS, Azure, Google Cloud</li>
            <li>DevOps: Docker, Kubernetes, CI/CD</li>
            <li>Database: MongoDB, PostgreSQL, Firebase</li>
        </ul>
        
        <h2>Education</h2>
        <p><strong>MSc in Computer Science</strong> - University of the Witwatersrand (Wits)</p>
        <p><strong>Computer Science Programming</strong> - Princeton University (Coursera, 2024)</p>
        
        <a href="#" class="btn">Download Full Resume</a>
    </div>
</body>
</html>`; 