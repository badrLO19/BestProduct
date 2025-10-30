'use client'

import { Loader2 } from 'lucide-react'

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  message?: string
}

/**
 * Composant de loader animé
 * Affiche un spinner avec un message optionnel
 */
export default function Loader({ size = 'lg', message = 'Chargement...' }: LoaderProps) {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-10 h-10',
    lg: 'w-16 h-16',
    xl: 'w-24 h-24',
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      {/* Spinner principal */}
      <div className="relative">
        {/* Cercle extérieur tournant */}
        <div className={`${sizeClasses[size]} relative`}>
          <Loader2
            className="w-full h-full text-brand-copper animate-spin-slow"
            strokeWidth={2}
          />
        </div>

        {/* Effet de pulsation */}
        <div
          className={`absolute inset-0 ${sizeClasses[size]}
                    bg-brand-copper/20 rounded-full animate-pulse-slow blur-xl`}
        />
      </div>

      {/* Message de chargement */}
      {message && (
        <div className="text-center space-y-2">
          <p className="text-brand-light text-lg font-medium animate-pulse">
            {message}
          </p>
          <div className="flex space-x-1 justify-center">
            <div className="w-2 h-2 bg-brand-copper rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <div className="w-2 h-2 bg-brand-copper rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <div className="w-2 h-2 bg-brand-copper rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      )}

      {/* Texte secondaire */}
      <p className="text-gray-400 text-sm">
        Analyse des meilleures offres en cours...
      </p>
    </div>
  )
}

/**
 * Composant de loader inline plus petit
 */
export function InlineLoader({ message }: { message?: string }) {
  return (
    <div className="flex items-center space-x-3">
      <Loader2 className="w-5 h-5 text-brand-copper animate-spin" />
      {message && <span className="text-gray-300 text-sm">{message}</span>}
    </div>
  )
}
