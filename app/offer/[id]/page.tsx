'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  ExternalLink,
  Star,
  Package,
  TrendingUp,
  ShoppingCart,
  Check,
  AlertCircle,
} from 'lucide-react'
import Loader from '@/components/Loader'
import { Offer } from '@/types/offer'

/**
 * Page de détail d'une offre
 * Affiche toutes les informations détaillées d'une offre spécifique
 * Note: Dans une version production, les données seraient récupérées depuis une API
 */
export default function OfferDetailPage() {
  const params = useParams()
  const router = useRouter()
  const offerId = params.id as string

  const [offer, setOffer] = useState<Offer | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulation de récupération des données de l'offre
    // Dans une version production, cela ferait un appel API à votre backend/n8n
    const fetchOfferDetails = async () => {
      try {
        setLoading(true)

        // POUR LE DÉVELOPPEMENT : Données simulées
        // En production, remplacez par un vrai appel API :
        // const response = await axios.get(`${webhookUrl}/offer/${offerId}`)
        // setOffer(response.data)

        // Simuler un délai réseau
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Exemple de données (à remplacer par de vraies données)
        const mockOffer: Offer = {
          id: offerId,
          title: 'Produit exemple - ' + offerId,
          price: '499.99 €',
          rating: '4.5',
          reviews: 1234,
          source: 'Amazon',
          url: 'https://amazon.fr',
          image: 'https://via.placeholder.com/600x400',
          description:
            'Ceci est une page de détail exemple. En production, les vraies données de l\'offre seraient récupérées depuis votre API n8n en utilisant l\'ID de l\'offre.',
          availability: 'En stock',
          shipping: 'Livraison gratuite',
        }

        setOffer(mockOffer)
      } catch (err) {
        console.error('Erreur lors de la récupération de l\'offre:', err)
        setError('Impossible de charger les détails de l\'offre')
      } finally {
        setLoading(false)
      }
    }

    fetchOfferDetails()
  }, [offerId])

  // État de chargement
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Loader message="Chargement des détails de l'offre..." />
      </div>
    )
  }

  // État d'erreur
  if (error || !offer) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="card p-8 border-2 border-red-500/50 bg-red-900/20">
            <div className="flex items-start space-x-4">
              <AlertCircle className="w-8 h-8 text-red-400 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-red-300 mb-2">
                  Offre introuvable
                </h2>
                <p className="text-gray-300 mb-6">
                  {error || 'Cette offre n\'existe pas ou n\'est plus disponible.'}
                </p>
                <Link href="/" className="btn-primary">
                  <ArrowLeft className="w-4 h-4 inline mr-2" />
                  Retour à la recherche
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

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
    <div className="container mx-auto px-4 py-8">
      {/* Bouton retour */}
      <Link
        href="/"
        className="inline-flex items-center space-x-2 text-brand-light hover:text-brand-copper
                 transition-colors duration-300 mb-8 group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
        <span>Retour aux résultats</span>
      </Link>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Section image */}
        <div className="space-y-4">
          <div className="card p-4">
            <div className="relative w-full aspect-square bg-white/5 rounded-lg overflow-hidden">
              {offer.image ? (
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package size={120} className="text-brand-copper/30" />
                </div>
              )}
            </div>
          </div>

          {/* Badge source */}
          <div className="flex items-center justify-center">
            <span
              className={`${sourceColor} text-white font-bold px-6 py-3 rounded-full shadow-lg text-lg`}
            >
              Disponible sur {offer.source}
            </span>
          </div>
        </div>

        {/* Section informations */}
        <div className="space-y-6">
          {/* Titre */}
          <div>
            <h1 className="text-4xl font-heading font-bold text-white mb-4">
              {offer.title}
            </h1>

            {/* Note et avis */}
            {offer.rating && (
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={
                        i < Math.floor(parseFloat(offer.rating || '0'))
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-600'
                      }
                    />
                  ))}
                  <span className="text-xl font-semibold text-white">
                    {offer.rating}
                  </span>
                </div>
                {offer.reviews && (
                  <span className="text-gray-400">
                    ({offer.reviews.toLocaleString()} avis)
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Prix */}
          <div className="card p-6 bg-gradient-to-br from-brand-copper/20 to-brand-dark/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">Prix</p>
                <p className="text-5xl font-bold text-gradient">{offer.price}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-brand-copper" />
            </div>
            {offer.shipping && (
              <p className="text-green-400 mt-4 flex items-center space-x-2">
                <Check className="w-4 h-4" />
                <span>{offer.shipping}</span>
              </p>
            )}
          </div>

          {/* Disponibilité */}
          {offer.availability && (
            <div className="card p-4">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                <span className="text-green-400 font-semibold">
                  {offer.availability}
                </span>
              </div>
            </div>
          )}

          {/* Description */}
          {offer.description && (
            <div className="card p-6">
              <h2 className="text-xl font-semibold text-white mb-3">
                Description
              </h2>
              <p className="text-gray-300 leading-relaxed">{offer.description}</p>
            </div>
          )}

          {/* Bouton d'achat */}
          <div className="space-y-3">
            <a
              href={offer.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full btn-primary flex items-center justify-center space-x-3 text-lg py-4
                       shadow-copper-lg hover:shadow-copper-lg"
            >
              <ShoppingCart className="w-6 h-6" />
              <span>Voir l'offre sur {offer.source}</span>
              <ExternalLink className="w-5 h-5" />
            </a>

            <p className="text-sm text-gray-400 text-center">
              Vous serez redirigé vers {offer.source} pour finaliser votre achat
            </p>
          </div>

          {/* Informations complémentaires */}
          <div className="card p-6 bg-brand-dark/50">
            <h3 className="text-lg font-semibold text-white mb-4">
              Informations complémentaires
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-brand-copper/20">
                <span className="text-gray-400">Vendeur</span>
                <span className="text-white font-medium">{offer.source}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-brand-copper/20">
                <span className="text-gray-400">ID de l'offre</span>
                <span className="text-white font-mono">{offer.id}</span>
              </div>
              {offer.reviews && (
                <div className="flex justify-between py-2">
                  <span className="text-gray-400">Nombre d'avis</span>
                  <span className="text-white font-medium">
                    {offer.reviews.toLocaleString()}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Note pour les développeurs */}
      <div className="mt-12 p-6 bg-blue-900/20 border border-blue-500/30 rounded-lg">
        <h3 className="text-blue-300 font-semibold mb-2 flex items-center space-x-2">
          <AlertCircle className="w-5 h-5" />
          <span>Note pour les développeurs</span>
        </h3>
        <p className="text-blue-200 text-sm">
          Cette page utilise actuellement des données simulées. Pour la production,
          implémentez un endpoint API dans votre workflow n8n qui retourne les détails
          complets d'une offre en fonction de son ID :
          <code className="block mt-2 p-2 bg-black/30 rounded text-xs">
            GET {'{'}webhookUrl{'}'}/offer/{'{'}id{'}'}
          </code>
        </p>
      </div>
    </div>
  )
}
