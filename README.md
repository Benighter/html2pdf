# HTML2PDF Converter

![HTML2PDF](https://img.shields.io/badge/HTML2PDF-v1.0-blue)

A beautiful, modern web application that converts HTML code to PDF documents with live preview.

![HTML2PDF Converter Screenshot](https://via.placeholder.com/800x450/f8fafc/1e293b?text=HTML2PDF+Converter)

## ✨ Features

- **Live Preview**: See your HTML render in real-time as you type
- **One-Click Conversion**: Convert HTML to PDF with a single click
- **Syntax Formatting**: Proper structure for your HTML documents
- **Sample Templates**: Load pre-made HTML samples to get started quickly
- **Dark/Light Mode**: Toggle between themes based on your preference
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful interface with smooth animations

## 🚀 Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, Safari)

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/Benighter/html2pdf.git
   cd html2pdf
   ```

2. Open `index.html` in your browser or use a local server:
   ```bash
   # If you have Python installed
   python -m http.server 5500
   
   # If you have Node.js installed
   npx serve
   ```

3. Access the application at `http://localhost:5500` or the port provided by your server.

## 💻 Usage

1. **Type or paste** your HTML code in the editor
2. **View the live preview** on the right panel
3. **Click "Download PDF"** to convert and download your document
4. Use the **"Load Sample"** button to see an example of properly formatted HTML
5. **Toggle between dark and light mode** using the switch in the sidebar

## 🧰 Tech Stack

- HTML5
- CSS3 (with CSS Variables for theming)
- Vanilla JavaScript
- Font Awesome icons
- Google Fonts

## 📋 Best Practices for HTML Conversion

For optimal PDF conversion results:

- Include complete HTML structure with `<html>`, `<head>`, and `<body>` tags
- Use standard CSS that works across most browsers
- For custom styling, include CSS within `<style>` tags in the `<head>`
- External resources like images should use absolute URLs
- Keep the document structure simple for the best layout results

## 🛠️ Development

This project follows a clean architecture approach:

- `index.html` - Main HTML structure
- `styles.css` - All styling with variables for theming
- `script.js` - Core application functionality

### Code Structure

- **Config & Constants**: Application configuration settings
- **DOM Elements**: References to HTML elements
- **Theme Management**: Dark/light mode functionality
- **UI Helpers**: Functions for UI manipulation
- **HTML Processor**: Validation and formatting of HTML
- **PDF Conversion**: Conversion logic (currently a stub)
- **Main App Controller**: Core application workflow

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/Benighter/html2pdf/issues).

## 👤 Author

Bennet Nkolele
- GitHub: [Benighter](https://github.com/Benighter)
- LinkedIn: [Bennet Nkolele](https://www.linkedin.com/in/bennet-nkolele-321285249/)
- Portfolio: [My Work](https://react-personal-portfolio-alpha.vercel.app/)

## 📄 License

This project is [MIT](LICENSE) licensed.

---

✨ **Built with modern web standards and a focus on user experience** 