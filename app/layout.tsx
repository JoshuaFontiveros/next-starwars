import type { Metadata } from 'next';
import './globals.css';
import { getFilms } from '@/utils/api';
import { InputSearchCombobox } from './_components';
import StarWarsProvider from './_providers/StarWarsProvider';

export const metadata: Metadata = {
  title: 'Star Wars',
  description: 'Star Wars',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const films = await getFilms();
  return (
    <html lang='en'>
      <StarWarsProvider>
        <body>
          <header className='p-2'>
            <InputSearchCombobox data={films} />
          </header>
          <main className='w-full h-full p-2'>{children}</main>
        </body>
      </StarWarsProvider>
    </html>
  );
}
