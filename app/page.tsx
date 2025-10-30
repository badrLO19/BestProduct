'use client'

import { useState } from 'react'
import axios from 'axios'
import SearchBar from '@/components/SearchBar'
import OfferCard from '@/components/OfferCard'
import Loader from '@/components/Loader'
import { Offer, SearchStatus, ApiError } from '@/types/offer'
import { AlertCircle, TrendingUp, Sparkles } from 'lucide-react'

/**
 * Page d'accueil de TheBest
 * Permet de rechercher des offres et affiche les résultats
 */
export default function HomePage() {
  const [offers, setOffers] = useState<Offer[]>([])
  const [status, setStatus] = useState<SearchStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')

  // URL du webhook n8n depuis les variables d'environnement
  const webhookUrl = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || ''
  const apiTimeout = Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000

  /**
   * Fonction de recherche d'offres
   * Envoie une requête POST au webhook n8n avec le terme de recherche
   */
  const handleSearch = async (query: string) => {
    setStatus('loading')
    setError(null)
    setSearchQuery(query)
    setOffers([])

    try {
      // Requête POST au webhook n8n
      const response = await axios.post(
        webhookUrl,
        { query },
        {
          timeout: apiTimeout,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )

      // Traitement de la réponse
      // Le webhook peut retourner soit directement un tableau, soit un objet avec une propriété 'offers'
      const data = response.data
      const offersData: Offer[] = Array.isArray(data) ? data : data.offers || []

      setOffers(offersData)
      setStatus('success')

      // Log pour le développement (peut être retiré en production)
      console.log('Résultats de recherche:', offersData.length, 'offres trouvées')
    } catch (err: any) {
      console.error('Erreur lors de la recherche:', err)
      setStatus('error')

      // Gestion des différents types d'erreurs
      if (err.code === 'ECONNABORTED') {
        setError('La recherche a pris trop de temps. Veuillez réessayer.')
      } else if (err.response) {
        setError(
          `Erreur du serveur: ${err.response.status} - ${
            err.response.data?.message || 'Une erreur est survenue'
          }`
        )
      } else if (err.request) {
        setError(
          'Impossible de contacter le serveur. Vérifiez votre connexion internet.'
        )
      } else {
        setError('Une erreur inattendue est survenue. Veuillez réessayer.')
      }
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      {/* En-tête avec titre et description */}
      <div className="text-center mb-12 space-y-4">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Sparkles className="w-12 h-12 text-brand-copper animate-pulse" />
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-white text-shadow">
            Trouvez{' '}
            <span className="text-gradient">
              les meilleures offres
            </span>
          </h1>
          <TrendingUp className="w-12 h-12 text-brand-copper animate-pulse" />
        </div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Comparez instantanément les prix et avis de milliers de produits et services
          en France
        </p>
        <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Analyse en temps réel</span>
          </span>
          <span>•</span>
          <span>Amazon, eBay, AliExpress, Leboncoin...</span>
        </div>
      </div>

      {/* Barre de recherche */}
      <div className="mb-12">
        <SearchBar onSearch={handleSearch} isLoading={status === 'loading'} />
      </div>

      {/* État de chargement */}
      {status === 'loading' && (
        <Loader message="Recherche des meilleures offres..." />
      )}

      {/* État d'erreur */}
      {status === 'error' && error && (
        <div className="max-w-2xl mx-auto">
          <div className="card p-6 border-2 border-red-500/50 bg-red-900/20">
            <div className="flex items-start space-x-4">
              <AlertCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-red-300 mb-2">
                  Erreur lors de la recherche
                </h3>
                <p className="text-gray-300 mb-4">{error}</p>
                <button
                  onClick={() => handleSearch(searchQuery)}
                  className="btn-primary text-sm"
                >
                  Réessayer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Résultats de recherche */}
      {status === 'success' && (
        <div className="space-y-6">
          {/* En-tête des résultats */}
          {offers.length > 0 && (
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-heading font-bold text-white">
                {offers.length} offre{offers.length > 1 ? 's' : ''} trouvée
                {offers.length > 1 ? 's' : ''} pour "{searchQuery}"
              </h2>
              <div className="text-sm text-gray-400">
                Triées par pertinence
              </div>
            </div>
          )}

          {/* Grille d'offres */}
          {offers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {offers.map((offer, index) => (
                <div
                  key={offer.id || index}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <OfferCard offer={offer} />
                </div>
              ))}
            </div>
          ) : (
            // Aucune offre trouvée
            <div className="text-center py-16">
              <div className="card max-w-md mx-auto p-8">
                <div className="w-20 h-20 bg-brand-copper/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertCircle className="w-10 h-10 text-brand-copper" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Aucune offre trouvée
                </h3>
                <p className="text-gray-400 mb-6">
                  Essayez avec des termes de recherche différents ou plus généraux
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="btn-secondary text-sm"
                >
                  Nouvelle recherche
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* État initial (avant recherche) */}
      {status === 'idle' && (
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {/* Caractéristiques */}
            {[
              {
                title: 'Comparaison instantanée',
                description: 'Analysez des centaines d\'offres en quelques secondes',
                icon: '⚡',
              },
              {
                title: 'Meilleurs prix',
                description: 'Trouvez les offres les plus avantageuses du marché',
                icon: '💰',
              },
              {
                title: 'Avis vérifiés',
                description: 'Consultez les notes et avis des autres acheteurs',
                icon: '⭐',
              },
            ].map((feature, index) => (
              <div key={index} className="card p-6">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
