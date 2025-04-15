/**
 * UI Helpers module - handles all UI-related functionality
 */

import { AUTHOR_LINKS } from './config.js';

/**
 * Creates a UI helper object with methods for managing the user interface
 * @param {Object} elements - DOM elements
 * @returns {Object} - UI helper methods
 */
const createUIHelpers = (elements) => {
    return {
        /**
         * Show an element with animation
         * @param {HTMLElement} element - Element to show
         */
        showElement(element) { 
            element.classList.remove('hidden'); 
            // Add a minor animation effect
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, 10);
        },
        
        /**
         * Hide an element with animation
         * @param {HTMLElement} element - Element to hide
         */
        hideElement(element) { 
            element.style.opacity = '0';
            element.style.transform = 'translateY(10px)';
            setTimeout(() => {
                element.classList.add('hidden');
            }, 300);
        },
        
        /**
         * Show error message and auto-hide after delay
         * @param {string} message - Error message to display
         */
        showError(message) {
            elements.errorMessage.textContent = message;
            this.showElement(elements.errorContainer);
            // Auto-hide error after 5 seconds
            setTimeout(() => {
                this.hideElement(elements.errorContainer);
            }, 5000);
        },
        
        /**
         * Clear all UI notifications
         */
        clearUI() {
            this.hideElement(elements.resultContainer);
            this.hideElement(elements.errorContainer);
        },
        
        /**
         * Set button to loading state
         * @param {HTMLElement} button - Button element
         * @param {boolean} isLoading - Whether to show loading state
         * @param {string} originalText - Original button text to restore
         * @param {string} loadingText - Text to show during loading
         */
        setButtonLoading(button, isLoading, originalText, loadingText = 'Processing...') {
            if (isLoading) {
                button.disabled = true;
                button.setAttribute('data-original-text', button.innerHTML);
                button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${loadingText}`;
            } else {
                button.disabled = false;
                button.innerHTML = originalText || button.getAttribute('data-original-text');
            }
        },
        
        /**
         * Create placeholder preview content
         * @returns {string} - HTML for the empty preview state
         */
        getEmptyPreviewHtml() {
            return '<div style="text-align: center; color: #94a3b8; padding: 2rem;"><p>Enter HTML code to see a preview</p></div>';
        },
        
        /**
         * Update the live preview with HTML content
         * @param {string} html - HTML content to preview
         */
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
        
        /**
         * Render author links in the sidebar
         */
        renderAuthorLinks() {
            elements.authorLinks.innerHTML = AUTHOR_LINKS.map(link =>
                `<a href="${link.url}" target="_blank" rel="noopener"><i class="${link.icon}"></i> ${link.label}</a>`
            ).join(' ');
        },
        
        /**
         * Show success animation when PDF is ready
         */
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
};

export default createUIHelpers; 