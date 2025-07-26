// app/layout.js
import './globals.css'; // Your global CSS imports
// ... other imports

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Font Awesome CDN (Simplified) */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
          // Remove or simplify integrity, crossorigin, and referrerpolicy for testing
          // integrity="sha512-..."
          // crossorigin="anonymous"
          // referrerpolicy="no-referrer"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}