'use client'

import { useState, FormEvent } from 'react'
import { Search } from 'lucide-react'

interface SearchBarProps {
  onSearch: (query: string) => void
  isLoading?: boolean
}

/**
 * Composant de barre de recherche
 * Permet à l'utilisateur de saisir un terme de recherche et de lancer la recherche
 */
export default function SearchBar({ onSearch, isLoading = false }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (query.trim() && !isLoading) {
      onSearch(query.trim())
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative group">
          {/* Icône de recherche */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-copper group-focus-within:text-brand-accent transition-colors duration-300">
            <Search size={24} />
          </div>

          {/* Input de recherche */}
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un produit ou service..."
            disabled={isLoading}
            className="w-full pl-14 pr-32 py-5 text-lg input
                     disabled:opacity-50 disabled:cursor-not-allowed
                     shadow-lg hover:shadow-copper transition-all duration-300"
            autoFocus
          />

          {/* Bouton de recherche */}
          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2
                     btn-primary py-3 px-8
                     disabled:opacity-50 disabled:cursor-not-allowed
                     disabled:hover:scale-100"
          >
            {isLoading ? (
              <span className="flex items-center space-x-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Recherche...</span>
              </span>
            ) : (
              'Rechercher'
            )}
          </button>
        </div>

        {/* Effet de brillance métallique */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-transparent via-brand-copper/10 to-transparent
                      translate-x-[-100%] group-focus-within:translate-x-[100%]
                      transition-transform duration-1000 ease-in-out pointer-events-none" />
      </form>

      {/* Suggestions ou exemples de recherche */}
      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <span className="text-sm text-gray-400">Exemples:</span>
        {['iPhone 15', 'Laptop gaming', 'Hôtel Paris', 'Vol Nice'].map((example) => (
          <button
            key={example}
            onClick={() => !isLoading && setQuery(example)}
            disabled={isLoading}
            className="text-sm px-3 py-1 bg-brand-brown/50 hover:bg-brand-copper/50
                     text-brand-light rounded-full transition-colors duration-300
                     border border-brand-copper/30 hover:border-brand-copper
                     disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {example}
          </button>
        ))}
      </div>
    </div>
  )
}
