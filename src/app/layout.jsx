import './globals.css';

export const metadata = {
  title: 'ETS Dashboard',
  description: 'ETS Dashboard Application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}