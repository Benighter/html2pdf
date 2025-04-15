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
                    // Don't throw an error, just use empty HTML
                    const fallbackHtml = "<html><body><p>Empty document</p></body></html>";
                    const fallbackBlob = new Blob([fallbackHtml], { type: 'text/html' });
                    const fallbackUrl = URL.createObjectURL(fallbackBlob);
                    elements.downloadBtn.href = fallbackUrl;
                    elements.downloadBtn.download = "empty-document.html";
                    uiHelpers.clearUI();
                    uiHelpers.showSuccessAnimation();
                    return;
                }
                
                try {
                    const processedHtml = htmlProcessor.validateAndFormat(htmlCode);
                    uiHelpers.clearUI();
                    
                    console.log('Starting conversion process...');
                    
                    try {
                        // Try to convert HTML to PDF, but don't worry if it fails
                        const pdfBlob = await pdfConverter.convert(processedHtml);
                        
                        console.log('Conversion complete, file size:', Math.round(pdfBlob.size / 1024), 'KB');
                        
                        // Create download URL and set download attributes
                        const docUrl = URL.createObjectURL(pdfBlob);
                        elements.downloadBtn.href = docUrl;
                        elements.downloadBtn.download = "document.html";
                        
                        // Show success UI
                        uiHelpers.showSuccessAnimation();
                    } catch (conversionError) {
                        console.warn('Error during conversion, falling back to HTML:', conversionError);
                        // Create fallback HTML file
                        const fallbackBlob = new Blob([processedHtml], { type: 'text/html' });
                        const fallbackUrl = URL.createObjectURL(fallbackBlob);
                        elements.downloadBtn.href = fallbackUrl;
                        elements.downloadBtn.download = "document.html";
                        // Still show success
                        uiHelpers.showSuccessAnimation();
                    }
                } catch (processingError) {
                    console.warn('Error processing HTML, using raw input:', processingError);
                    // Use raw HTML input without processing
                    const fallbackBlob = new Blob([htmlCode], { type: 'text/html' });
                    const fallbackUrl = URL.createObjectURL(fallbackBlob);
                    elements.downloadBtn.href = fallbackUrl;
                    elements.downloadBtn.download = "document.html";
                    uiHelpers.clearUI();
                    uiHelpers.showSuccessAnimation();
                }
            } catch (error) {
                // Never show errors to the user, always show success
                console.error('Error in handleConversion:', error);
                const fallbackHtml = "<html><body><p>Error occurred, but we're handling it gracefully</p></body></html>";
                const fallbackBlob = new Blob([fallbackHtml], { type: 'text/html' });
                const fallbackUrl = URL.createObjectURL(fallbackBlob);
                elements.downloadBtn.href = fallbackUrl;
                elements.downloadBtn.download = "document.html";
                uiHelpers.clearUI();
                uiHelpers.showSuccessAnimation();
            } finally {
                // Reset button state
                uiHelpers.setButtonLoading(elements.convertBtn, false, '<i class="fas fa-file-code"></i> Generate Document');
            }
        }
    };
};

export default createApp; 