/**
 * Main Application Module - coordinates all application functionality
 */

import { sampleHTML, pdfOptions } from './config.js';
import getElements from './dom.js';
import createThemeManager from './theme.js';
import createUIHelpers from './ui.js';
import createHtmlProcessor from './htmlProcessor.js';
import createPdfConverter from './pdfConverter.js';

/**
 * Creates the main application controller
 * @returns {Object} - App controller with init method
 */
const createApp = () => {
    // Get DOM elements
    const elements = getElements();
    
    // Initialize other modules
    const themeManager = createThemeManager(elements);
    const uiHelpers = createUIHelpers(elements);
    const htmlProcessor = createHtmlProcessor();
    const pdfConverter = createPdfConverter(pdfOptions);
    
    return {
        /**
         * Initialize the application
         */
        init() {
            // Initialize theme
            themeManager.init();
            
            // Render author links
            uiHelpers.renderAuthorLinks();
            
            // Initialize event listeners
            this.attachEventListeners();
            
            // Apply initial UI state
            this.initializeUIState();
        },
        
        /**
         * Set initial UI state
         */
        initializeUIState() {
            // Set transitions for smooth animations
            elements.resultContainer.style.transition = 'all 0.3s cubic-bezier(.4,0,.2,1)';
            elements.errorContainer.style.transition = 'all 0.3s cubic-bezier(.4,0,.2,1)';
            
            // Initial preview
            if (elements.htmlInput.value) {
                uiHelpers.updatePreview(elements.htmlInput.value);
            } else {
                uiHelpers.updatePreview(uiHelpers.getEmptyPreviewHtml());
            }
        },
        
        /**
         * Attach event listeners to DOM elements
         */
        attachEventListeners() {
            // Clear button click
            elements.clearBtn.addEventListener('click', () => {
                elements.htmlInput.value = '';
                uiHelpers.clearUI();
                uiHelpers.updatePreview(uiHelpers.getEmptyPreviewHtml());
            });
            
            // Template button click
            elements.templateBtn.addEventListener('click', () => {
                elements.htmlInput.value = sampleHTML;
                uiHelpers.clearUI();
                elements.htmlInput.focus();
                elements.htmlInput.scrollTop = 0;
                uiHelpers.updatePreview(sampleHTML);
            });
            
            // Convert button click
            elements.convertBtn.addEventListener('click', this.handleConversion.bind(this));
            
            // Input change
            elements.htmlInput.addEventListener('input', (e) => {
                const html = e.target.value;
                try {
                    const processed = htmlProcessor.validateAndFormat(html);
                    uiHelpers.updatePreview(processed);
                } catch {
                    uiHelpers.updatePreview(uiHelpers.getEmptyPreviewHtml());
                }
            });
        },
        
        /**
         * Generate a filename for the PDF based on content or timestamp
         * @param {string} html - HTML content
         * @returns {string} - Generated filename
         */
        generateFilename(html) {
            // Try to extract title from HTML
            const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
            let filename = titleMatch ? titleMatch[1].trim() : '';
            
            // If no title found or it's empty, use a timestamp
            if (!filename) {
                const date = new Date();
                filename = `document-${date.getFullYear()}${(date.getMonth() + 1).toString().padStart(2, '0')}${date.getDate().toString().padStart(2, '0')}`;
            }
            
            // Sanitize filename and add extension
            return `${filename.replace(/[^\w\-]/g, '_')}.pdf`;
        },
        
        /**
         * Handle the HTML to PDF conversion process
         */
        async handleConversion() {
            try {
                // Show loading state
                const originalButtonHtml = '<i class="fas fa-file-pdf"></i> Generate PDF';
                uiHelpers.setButtonLoading(elements.convertBtn, true, null, 'Converting...');
                
                // Get and process HTML content
                const htmlCode = elements.htmlInput.value.trim();
                if (!htmlCode) {
                    throw new Error('Please enter some HTML code before generating a PDF');
                }
                
                const processedHtml = htmlProcessor.validateAndFormat(htmlCode);
                console.log('Processing HTML content:', processedHtml.substring(0, 100) + '...');
                
                uiHelpers.clearUI();
                
                console.log('Starting conversion process...');
                
                // Convert HTML to PDF
                const pdfBlob = await pdfConverter.convert(processedHtml);
                
                console.log('Conversion successful, PDF size:', Math.round(pdfBlob.size / 1024), 'KB');
                
                // Check if we received a PDF
                if (pdfBlob.type !== 'application/pdf') {
                    console.warn('Unexpected content type:', pdfBlob.type);
                }
                
                // Create download URL and set download attributes
                const pdfUrl = URL.createObjectURL(pdfBlob);
                elements.downloadBtn.href = pdfUrl;
                elements.downloadBtn.download = this.generateFilename(processedHtml);
                
                console.log('PDF ready for download as:', elements.downloadBtn.download);
                
                // Show success UI
                uiHelpers.showSuccessAnimation();
            } catch (error) {
                console.error('Conversion error:', error);
                uiHelpers.showError(error.message || 'An error occurred while converting HTML to PDF');
            } finally {
                // Reset button state
                uiHelpers.setButtonLoading(elements.convertBtn, false, '<i class="fas fa-file-pdf"></i> Generate PDF');
            }
        }
    };
};

export default createApp; 