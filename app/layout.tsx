import './globals.css'
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import Providers from './providers';
import NavBar from './components/NavBar';

const roboto = Roboto({ weight: ['300', '400', '700'], subsets: ['latin'], style: ['italic', 'normal'] });

export const metadata: Metadata = {
  title: 'NextBook',
  description: 'Lost for your next read?',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <Providers>
          <div className="bg-gray">
            <NavBar/>
            <main id="main-container" className="items-center p-6 max-w-6xl mx-auto w-screen">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
