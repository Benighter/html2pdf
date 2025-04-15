/**
 * PDF Converter module - handles conversion of HTML to PDF using HTML2PDF.app API
 */

// API configuration
const API_CONFIG = {
    apiKey: 'sZ7seHtPAfbm9KioGdIFYnoYwJd1mvZ4CD8e6JkIi70jw78k5t9MzX0YjnH4OizD',
    endpoint: 'https://api.html2pdf.app/v1/generate'
};

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
                    const errorText = await response.text();
                    let errorMessage = `API error: ${response.status}`;
                    
                    try {
                        const errorData = JSON.parse(errorText);
                        errorMessage = errorData.message || errorMessage;
                    } catch (e) {
                        // If the error text isn't valid JSON, use it directly
                        if (errorText) {
                            errorMessage = `API error: ${errorText}`;
                        }
                    }
                    
                    console.error('API response error:', errorMessage);
                    throw new Error(errorMessage);
                }
                
                // Get PDF as blob
                const pdfBlob = await response.blob();
                return pdfBlob;
            } catch (error) {
                console.error('PDF conversion error:', error);
                throw new Error(error.message || 'Failed to convert HTML to PDF. Please try again.');
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