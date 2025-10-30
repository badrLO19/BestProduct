import { Metadata } from 'next'
import Link from 'next/link'
import {
  Target,
  Zap,
  Shield,
  TrendingUp,
  Users,
  Globe,
  Sparkles,
  ArrowRight,
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'À propos - TheBest',
  description: 'Découvrez TheBest, votre comparateur intelligent d\'offres en France',
}

/**
 * Page À propos de TheBest
 * Présente la mission, les fonctionnalités et l'équipe
 */
export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* En-tête */}
      <div className="text-center mb-16 space-y-6">
        <div className="flex items-center justify-center space-x-3">
          <Sparkles className="w-10 h-10 text-brand-copper animate-pulse" />
          <h1 className="text-5xl font-heading font-bold text-white text-shadow">
            À propos de <span className="text-gradient">TheBest</span>
          </h1>
        </div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Votre assistant intelligent pour trouver les meilleures offres en France
        </p>
      </div>

      {/* Mission */}
      <section className="mb-16">
        <div className="card p-8 md:p-12">
          <div className="flex items-start space-x-4 mb-6">
            <Target className="w-8 h-8 text-brand-copper flex-shrink-0" />
            <div>
              <h2 className="text-3xl font-heading font-bold text-white mb-4">
                Notre Mission
              </h2>
              <div className="space-y-4 text-gray-300 text-lg">
                <p>
                  <strong className="text-brand-light">TheBest</strong> est né d'une volonté simple :
                  rendre la recherche des meilleures offres plus rapide, plus simple et plus intelligente.
                </p>
                <p>
                  Dans un monde où les options d'achat sont infinies, nous croyons que vous méritez
                  un outil qui fait le travail pour vous. Notre plateforme analyse en temps réel
                  des centaines d'offres provenant des plus grandes marketplaces françaises et
                  internationales pour vous présenter les meilleurs choix selon le prix et les avis clients.
                </p>
                <p>
                  Que vous recherchiez un produit high-tech, un hôtel, un vol ou tout autre service,
                  <strong className="text-brand-light"> TheBest</strong> est votre point de départ.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fonctionnalités */}
      <section className="mb-16">
        <h2 className="text-3xl font-heading font-bold text-white text-center mb-10">
          Comment ça fonctionne ?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: <Zap className="w-8 h-8" />,
              title: 'Recherche ultra-rapide',
              description:
                'Tapez votre recherche et obtenez des résultats en quelques secondes grâce à notre infrastructure optimisée.',
            },
            {
              icon: <Globe className="w-8 h-8" />,
              title: 'Sources multiples',
              description:
                'Nous agrégeons les offres d\'Amazon, eBay, AliExpress, Leboncoin, Darty, Cdiscount et bien d\'autres.',
            },
            {
              icon: <TrendingUp className="w-8 h-8" />,
              title: 'Meilleurs prix',
              description:
                'Nos algorithmes analysent les prix en temps réel pour vous garantir les offres les plus compétitives.',
            },
            {
              icon: <Shield className="w-8 h-8" />,
              title: 'Avis vérifiés',
              description:
                'Consultez les notes et avis authentiques des acheteurs pour faire un choix éclairé.',
            },
            {
              icon: <Users className="w-8 h-8" />,
              title: 'Interface intuitive',
              description:
                'Une expérience utilisateur fluide et moderne conçue pour vous faire gagner du temps.',
            },
            {
              icon: <Sparkles className="w-8 h-8" />,
              title: 'IA intégrée',
              description:
                'Notre système basé sur l\'IA apprend de vos recherches pour améliorer continuellement les résultats.',
            },
          ].map((feature, index) => (
            <div key={index} className="card p-6 group">
              <div className="text-brand-copper mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sources supportées */}
      <section className="mb-16">
        <div className="card p-8">
          <h2 className="text-3xl font-heading font-bold text-white text-center mb-8">
            Sources d'offres
          </h2>
          <p className="text-gray-300 text-center mb-8">
            TheBest compare les offres de dizaines de plateformes pour vous garantir
            le meilleur choix :
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              'Amazon',
              'eBay',
              'AliExpress',
              'Leboncoin',
              'Darty',
              'Cdiscount',
              'Fnac',
              'Booking',
            ].map((source, index) => (
              <div
                key={index}
                className="bg-brand-dark/50 border border-brand-copper/30 rounded-lg p-4 text-center
                         hover:border-brand-copper hover:bg-brand-copper/10 transition-all duration-300"
              >
                <p className="text-brand-light font-semibold">{source}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologie */}
      <section className="mb-16">
        <div className="card p-8 bg-gradient-to-br from-brand-copper/20 to-brand-dark/50">
          <h2 className="text-3xl font-heading font-bold text-white mb-6">
            Technologie
          </h2>
          <div className="space-y-4 text-gray-300">
            <p>
              TheBest est propulsé par une stack technologique moderne et performante :
            </p>
            <ul className="grid md:grid-cols-2 gap-3">
              {[
                'Next.js 14 avec App Router pour une performance optimale',
                'TypeScript pour un code robuste et maintenable',
                'Tailwind CSS pour un design responsive et élégant',
                'n8n pour l\'orchestration des workflows d\'agrégation',
                'Intelligence artificielle pour l\'analyse des offres',
                'Hébergement sur Vercel pour une disponibilité maximale',
              ].map((tech, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <span className="text-brand-copper mt-1">✓</span>
                  <span>{tech}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="text-center">
        <div className="card p-12 bg-gradient-industrial">
          <h2 className="text-3xl font-heading font-bold text-white mb-4">
            Prêt à trouver les meilleures offres ?
          </h2>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Commencez votre recherche maintenant et découvrez comment TheBest peut
            vous faire économiser temps et argent.
          </p>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 btn-primary text-lg px-8 py-4"
          >
            <span>Lancer une recherche</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}
