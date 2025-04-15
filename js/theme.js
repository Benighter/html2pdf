/**
 * Theme management module - handles theme switching between light and dark modes
 */

/**
 * Creates a theme manager that handles switching between light and dark mode
 * @param {Object} elements - DOM elements
 * @returns {Object} - Theme manager object with init and toggle methods
 */
const createThemeManager = (elements) => {
    return {
        /**
         * Initialize the theme based on localStorage or system preference
         */
        init() {
            if (localStorage.getItem('theme') === 'dark') {
                document.body.setAttribute('data-theme', 'dark');
                elements.themeToggle.checked = true;
            }
            elements.themeToggle.addEventListener('change', this.toggleTheme.bind(this));
        },
        
        /**
         * Toggle between light and dark themes
         */
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
};

export default createThemeManager; 