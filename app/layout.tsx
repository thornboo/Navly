import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Navly - Modern Navigation Hub',
  description: 'A modern navigation hub for your favorite tools and integrations',
  keywords: ['navigation', 'tools', 'integrations', 'productivity'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">{children}</body>
    </html>
  );
}
