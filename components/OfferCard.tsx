'use client'

import { Offer } from '@/types/offer'
import Image from 'next/image'
import Link from 'next/link'
import { ExternalLink, Star, Package } from 'lucide-react'

interface OfferCardProps {
  offer: Offer
}

/**
 * Composant de carte d'offre
 * Affiche les informations d'une offre (image, titre, prix, source, note)
 */
export default function OfferCard({ offer }: OfferCardProps) {
  // Mapping des sources vers des couleurs
  const sourceColors: Record<string, string> = {
    Amazon: 'bg-orange-500',
    eBay: 'bg-blue-500',
    AliExpress: 'bg-red-500',
    Leboncoin: 'bg-orange-600',
    Darty: 'bg-red-600',
    Cdiscount: 'bg-purple-600',
  }

  const sourceColor = sourceColors[offer.source] || 'bg-brand-copper'

  return (
    <div className="card p-4 group relative overflow-hidden animate-fadeIn">
      {/* Badge source */}
      <div className="absolute top-4 right-4 z-10">
        <span
          className={`${sourceColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}
        >
          {offer.source}
        </span>
      </div>

      {/* Image du produit */}
      <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-white/5">
        {offer.image ? (
          <Image
            src={offer.image}
            alt={offer.title}
            fill
            className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={(e) => {
              // Fallback en cas d'erreur de chargement d'image
              const target = e.target as HTMLImageElement
              target.style.display = 'none'
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package size={64} className="text-brand-copper/30" />
          </div>
        )}
      </div>

      {/* Titre du produit */}
      <h3 className="text-lg font-semibold text-white mb-2 line-clamp-2 h-14">
        {offer.title}
      </h3>

      {/* Description courte */}
      {offer.description && (
        <p className="text-sm text-gray-400 mb-3 line-clamp-2">
          {offer.description}
        </p>
      )}

      {/* Note et avis */}
      {offer.rating && (
        <div className="flex items-center space-x-2 mb-3">
          <div className="flex items-center space-x-1">
            <Star size={16} className="text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-medium text-white">{offer.rating}</span>
          </div>
          {offer.reviews && (
            <span className="text-xs text-gray-400">
              ({offer.reviews.toLocaleString()} avis)
            </span>
          )}
        </div>
      )}

      {/* Prix */}
      <div className="mb-4">
        <p className="text-3xl font-bold text-gradient">
          {offer.price}
        </p>
        {offer.shipping && (
          <p className="text-xs text-gray-400 mt-1">{offer.shipping}</p>
        )}
      </div>

      {/* Disponibilité */}
      {offer.availability && (
        <p className="text-xs text-green-400 mb-3">
          ✓ {offer.availability}
        </p>
      )}

      {/* Boutons d'action */}
      <div className="flex space-x-2">
        {/* Voir les détails */}
        <Link
          href={`/offer/${offer.id}`}
          className="flex-1 btn-secondary text-center text-sm py-2"
        >
          Détails
        </Link>

        {/* Voir l'offre (lien externe) */}
        <a
          href={offer.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 btn-primary flex items-center justify-center space-x-2 text-sm py-2"
          onClick={(e) => {
            // Analytics ou tracking peuvent être ajoutés ici
            console.log('Offre cliquée:', offer.id, offer.source)
          }}
        >
          <span>Voir l'offre</span>
          <ExternalLink size={16} />
        </a>
      </div>

      {/* Effet de brillance au survol */}
      <div className="metallic-shine absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </div>
  )
}
