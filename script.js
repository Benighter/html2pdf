// =====================
// CONFIG & CONSTANTS
// =====================
const config = {
    defaultOptions: {
        marginTop: '20mm',
        marginBottom: '20mm',
        marginLeft: '10mm',
        marginRight: '10mm',
        paperSize: 'A4'
    }
};

const AUTHOR_LINKS = [
    { label: 'GitHub', url: 'https://github.com/Benighter', icon: 'fab fa-github' },
    { label: 'LinkedIn', url: 'https://www.linkedin.com/in/bennet-nkolele-321285249/', icon: 'fab fa-linkedin' },
    { label: 'Portfolio', url: 'https://react-personal-portfolio-alpha.vercel.app/', icon: 'fas fa-globe' }
];

// Sample HTML for the load sample button
const sampleHTML = `<!DOCTYPE html>
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

// =====================
// DOM ELEMENTS
// =====================
const elements = {
    htmlInput: document.getElementById('html-input'),
    convertBtn: document.getElementById('convert-btn'),
    clearBtn: document.getElementById('clear-btn'),
    templateBtn: document.getElementById('template-btn'),
    resultContainer: document.getElementById('result-container'),
    downloadBtn: document.getElementById('download-btn'),
    errorContainer: document.getElementById('error-container'),
    errorMessage: document.getElementById('error-message'),
    themeToggle: document.getElementById('theme-toggle'),
    previewContainer: document.getElementById('preview-container'),
    authorLinks: document.getElementById('author-links')
};

// =====================
// THEME MANAGEMENT
// =====================
const themeManager = {
    init() {
        if (localStorage.getItem('theme') === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
            elements.themeToggle.checked = true;
        }
        elements.themeToggle.addEventListener('change', this.toggleTheme);
    },
    toggleTheme() {
        if (elements.themeToggle.checked) {
            document.body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    }
};

// =====================
// UI HELPERS
// =====================
const uiHelpers = {
    showElement(element) { 
        element.classList.remove('hidden'); 
        // Add a minor animation effect
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 10);
    },
    hideElement(element) { 
        element.style.opacity = '0';
        element.style.transform = 'translateY(10px)';
        setTimeout(() => {
            element.classList.add('hidden');
        }, 300);
    },
    showError(message) {
        elements.errorMessage.textContent = message;
        this.showElement(elements.errorContainer);
        // Auto-hide error after 5 seconds
        setTimeout(() => {
            this.hideElement(elements.errorContainer);
        }, 5000);
    },
    clearUI() {
        this.hideElement(elements.resultContainer);
        this.hideElement(elements.errorContainer);
    },
    updatePreview(html) {
        // Live preview in iframe for isolation and CSS support
        const iframe = document.createElement('iframe');
        iframe.setAttribute('title', 'HTML Preview');
        iframe.style.width = '100%';
        iframe.style.height = '100%';
        iframe.style.border = 'none';
        iframe.style.background = 'white';
        // Clear previous preview
        elements.previewContainer.innerHTML = '';
        elements.previewContainer.appendChild(iframe);
        // Write HTML
        setTimeout(() => {
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            doc.open();
            doc.write(html);
            doc.close();
        }, 0);
    },
    renderAuthorLinks() {
        elements.authorLinks.innerHTML = AUTHOR_LINKS.map(link =>
            `<a href="${link.url}" target="_blank" rel="noopener"><i class="${link.icon}"></i> ${link.label}</a>`
        ).join(' ');
    },
    showSuccessAnimation() {
        const resultContainer = elements.resultContainer;
        resultContainer.style.transform = 'scale(0.98)';
        resultContainer.style.opacity = '0';
        
        setTimeout(() => {
            this.showElement(resultContainer);
            setTimeout(() => {
                resultContainer.style.transform = 'scale(1)';
                resultContainer.style.opacity = '1';
            }, 50);
        }, 300);
    }
};

// =====================
// HTML PROCESSOR
// =====================
const htmlProcessor = {
    validate(html) {
        if (!html || html.trim() === '') {
            throw new Error('Please enter some HTML code');
        }
        return html;
    },
    format(html) {
        if (!html.includes('<html') && !html.includes('</html>')) {
            html = `<!DOCTYPE html>\n<html>\n<head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>Generated PDF</title>\n</head>\n<body>\n    ${html}\n</body>\n</html>`;
        }
        return html;
    },
    validateAndFormat(html) {
        return this.format(this.validate(html));
    }
};

// =====================
// PDF CONVERSION (STUB)
// =====================
const pdfConverter = {
    async convert(htmlContent) {
        // Stub: just returns HTML as a blob for now
        const blob = new Blob([htmlContent], { type: 'text/html' });
        return blob;
    }
};

// =====================
// MAIN APP CONTROLLER
// =====================
const app = {
    init() {
        themeManager.init();
        uiHelpers.renderAuthorLinks();
        this.attachEventListeners();
        // Apply initial styling to UI elements
        this.initializeUIState();
    },
    initializeUIState() {
        // Set initial state for elements
        elements.resultContainer.style.transition = 'all 0.3s cubic-bezier(.4,0,.2,1)';
        elements.errorContainer.style.transition = 'all 0.3s cubic-bezier(.4,0,.2,1)';
        
        // Initial preview
        if (elements.htmlInput.value) {
            uiHelpers.updatePreview(elements.htmlInput.value);
        } else {
            uiHelpers.updatePreview('<div style="text-align: center; color: #94a3b8; padding: 2rem;"><p>Enter HTML code to see a preview</p></div>');
        }
    },
    attachEventListeners() {
        elements.clearBtn.addEventListener('click', () => {
            elements.htmlInput.value = '';
            uiHelpers.clearUI();
            uiHelpers.updatePreview('<div style="text-align: center; color: #94a3b8; padding: 2rem;"><p>Enter HTML code to see a preview</p></div>');
        });
        elements.templateBtn.addEventListener('click', () => {
            elements.htmlInput.value = sampleHTML;
            uiHelpers.clearUI();
            elements.htmlInput.focus();
            elements.htmlInput.scrollTop = 0;
            uiHelpers.updatePreview(sampleHTML);
        });
        elements.convertBtn.addEventListener('click', this.handleConversion.bind(this));
        elements.htmlInput.addEventListener('input', (e) => {
            const html = e.target.value;
            try {
                const processed = htmlProcessor.validateAndFormat(html);
                uiHelpers.updatePreview(processed);
            } catch {
                uiHelpers.updatePreview('<div style="text-align: center; color: #94a3b8; padding: 2rem;"><p>Enter valid HTML code to see a preview</p></div>');
            }
        });
    },
    async handleConversion() {
        try {
            const htmlCode = elements.htmlInput.value.trim();
            const processedHtml = htmlProcessor.validateAndFormat(htmlCode);
            uiHelpers.clearUI();
            const htmlBlob = await pdfConverter.convert(processedHtml);
            const htmlUrl = URL.createObjectURL(htmlBlob);
            elements.downloadBtn.href = htmlUrl;
            elements.downloadBtn.download = "converted-document.html";
            uiHelpers.showSuccessAnimation();
        } catch (error) {
            uiHelpers.showError(error.message || 'An error occurred while converting HTML to PDF');
        }
    }
};

document.addEventListener('DOMContentLoaded', () => {
    app.init();
}); 