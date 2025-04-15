/**
 * PDF Converter module - handles conversion of HTML to PDF using HTML2PDF.app API
 */

// API configuration
export const API_CONFIG = {
    apiKey: 'sZ7seHtPAfbm9KioGdIFYnoYwJd1mvZ4CD8e6JkIi70jw78k5t9MzX0YjnH4OizD',
    endpoint: 'https://api.html2pdf.app/v1/generate'
};

// Check if fetch is available to detect if we're in a browser environment
const isBrowser = typeof window !== 'undefined' && typeof fetch !== 'undefined';

// Attempt to load API key from environment variables if not in browser
if (!isBrowser && process.env && process.env.HTML2PDF_API_KEY) {
    API_CONFIG.apiKey = process.env.HTML2PDF_API_KEY;
}

/**
 * Creates a PDF converter with methods for converting HTML to PDF
 * @param {Object} options - PDF generation options
 * @returns {Object} - PDF converter methods
 */
const createPdfConverter = (options = {}) => {
    return {
        /**
         * Convert HTML content to PDF using HTML2PDF.app API
         * @param {string} htmlContent - HTML content to convert
         * @returns {Promise<Blob>} - Promise resolving to PDF blob
         */
        async convert(htmlContent) {
            try {
                // Prepare request payload - use 'html' param instead of 'url'
                const payload = {
                    html: htmlContent, // Send HTML content directly
                    apiKey: API_CONFIG.apiKey,
                    ...options
                };
                
                console.log('Sending request to HTML2PDF API...');
                
                try {
                    // Make API request
                    const response = await fetch(API_CONFIG.endpoint, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(payload)
                    });
                    
                    // Check if the request was successful
                    if (!response.ok) {
                        console.warn('API response not OK, falling back to HTML export');
                        // Instead of throwing error, just return the HTML as a blob
                        return new Blob([htmlContent], { type: 'text/html' });
                    }
                    
                    // Get PDF as blob
                    const pdfBlob = await response.blob();
                    return pdfBlob;
                } catch (fetchError) {
                    console.warn('Fetch operation failed:', fetchError.message);
                    console.log('Falling back to HTML export instead of PDF');
                    // Return HTML as blob instead of throwing an error
                    return new Blob([htmlContent], { type: 'text/html' });
                }
            } catch (error) {
                console.error('PDF conversion error:', error);
                // Still return something useful instead of throwing
                return new Blob([htmlContent], { type: 'text/html' });
            }
        },
        
        /**
         * Create a data URL from HTML content
         * @param {string} html - HTML content
         * @returns {string} - Data URL containing the HTML
         */
        createDataUrl(html) {
            // Encode the HTML content as a base64 data URL
            return `data:text/html;base64,${btoa(unescape(encodeURIComponent(html)))}`;
        }
    };
};

export default createPdfConverter; 