import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Star Wars',
  description: 'Star Wars',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body>
        <main className='w-full h-full p-2'>{children}</main>
      </body>
    </html>
  );
}
