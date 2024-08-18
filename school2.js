document.addEventListener('DOMContentLoaded', function() {
    const rootElement = document.getElementById('react-root');
    if (rootElement) {
        createRoot(rootElement).render(<App />);
    }
});