import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Certificate Verification',
  description: 'Verify your certificate authenticity',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
