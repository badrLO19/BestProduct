import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'
import Link from 'next/link'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'TheBest - Trouvez les meilleures offres en France',
  description: 'Comparez les prix et les avis de milliers de produits et services en France. Amazon, eBay, AliExpress, Leboncoin et plus encore.',
  keywords: ['comparateur de prix', 'meilleures offres', 'shopping', 'France', 'e-commerce'],
  authors: [{ name: 'TheBest Team' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#b87333',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable}`}>
      <body className="min-h-screen flex flex-col">
        {/* Header / Navigation */}
        <header className="sticky top-0 z-50 backdrop-blur-md bg-brand-dark/80 border-b border-brand-copper/30">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center space-x-2 group">
                <div className="w-10 h-10 bg-gradient-copper rounded-lg flex items-center justify-center shadow-copper group-hover:shadow-copper-lg transition-all duration-300 group-hover:scale-110">
                  <span className="text-2xl font-bold text-white">TB</span>
                </div>
                <span className="text-2xl font-heading font-bold text-gradient">
                  TheBest
                </span>
              </Link>

              {/* Menu de navigation */}
              <div className="flex items-center space-x-6">
                <Link
                  href="/"
                  className="text-gray-300 hover:text-brand-copper transition-colors duration-300 font-medium"
                >
                  Recherche
                </Link>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-brand-copper transition-colors duration-300 font-medium"
                >
                  À propos
                </Link>
              </div>
            </div>
          </nav>
        </header>

        {/* Contenu principal */}
        <main className="flex-1">
          {children}
        </main>

        {/* Footer */}
        <footer className="backdrop-blur-md bg-brand-dark/80 border-t border-brand-copper/30 mt-auto">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-gray-400 text-sm">
                  © {new Date().getFullYear()} TheBest. Tous droits réservés.
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Propulsé par IA et n8n
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-xs text-gray-500">
                  Fait avec ❤️ pour trouver les meilleures offres
                </span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  )
}
