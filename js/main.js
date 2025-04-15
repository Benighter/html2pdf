import createApp from './app.js';

// Wait for DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', () => {
    // Create and initialize the application
    const app = createApp();
    app.init();
}); 