import type { Metadata } from 'next';
import './globals.css';

import { InputSearchCombobox } from './_components';
import StarWarsProvider from './_providers/StarWarsProvider';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Star Wars',
  description: 'Star Wars',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <StarWarsProvider>
        <body>
          <header className='p-2'>
            <InputSearchCombobox />
          </header>
          <main className='w-full h-full p-2'>
            {children}
            <Toaster richColors />
          </main>
        </body>
      </StarWarsProvider>
    </html>
  );
}
