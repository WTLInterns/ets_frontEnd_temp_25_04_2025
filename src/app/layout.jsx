import './globals.css';
import ThemeWrapper from '../components/layout/ThemeWrapper';

export const metadata = {
  title: 'ETS Dashboard',
  description: 'ETS Dashboard Application',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeWrapper>
          {children}
        </ThemeWrapper>
      </body>
    </html>
  );
}