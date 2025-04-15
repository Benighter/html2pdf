/**
 * DOM elements module - centralizes all DOM element references
 */

// Cache DOM elements to avoid repeated querySelector calls
const getElements = () => {
    return {
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
};

export default getElements; 