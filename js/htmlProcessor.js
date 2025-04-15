/**
 * HTML Processor module - handles HTML validation and formatting
 */

/**
 * Creates an HTML processor with methods for validating and formatting HTML
 * @returns {Object} - HTML processor methods
 */
const createHtmlProcessor = () => {
    return {
        /**
         * Validate HTML content is not empty
         * @param {string} html - HTML content to validate
         * @returns {string} - Validated HTML
         * @throws {Error} - If HTML is empty
         */
        validate(html) {
            if (!html || html.trim() === '') {
                throw new Error('Please enter some HTML code');
            }
            return html;
        },
        
        /**
         * Format HTML content, ensuring it has proper structure
         * @param {string} html - HTML content to format
         * @returns {string} - Formatted HTML with proper structure
         */
        format(html) {
            if (!html.includes('<html') && !html.includes('</html>')) {
                html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Generated PDF</title>
</head>
<body>
    ${html}
</body>
</html>`;
            }
            return html;
        },
        
        /**
         * Validate and format HTML content
         * @param {string} html - HTML content to process
         * @returns {string} - Validated and formatted HTML
         */
        validateAndFormat(html) {
            return this.format(this.validate(html));
        }
    };
};

export default createHtmlProcessor; 