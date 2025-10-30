'use client'

import Link from 'next/link'
import { Calculator, Trophy, Dumbbell, Heart, Sparkles, ArrowRight } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="bg-black/90 backdrop-blur-sm border-b border-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">FitTracker Pro</h1>
              <p className="text-xs text-gray-400">Sua jornada fitness começa aqui</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
              Transforme Seu Corpo
            </h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto leading-relaxed">
              Ferramentas inteligentes para calcular calorias, planejar treinos e acompanhar seu progresso fitness
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Profile Card */}
            <Link
              href="/profile"
              className="group bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-red-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/10"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-yellow-600/10 rounded-2xl flex items-center justify-center group-hover:bg-yellow-600/20 transition-colors">
                  <Trophy className="w-8 h-8 text-yellow-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-white">Seu Perfil</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    Configure suas informações pessoais e calcule sua necessidade calórica diária baseada em sua atividade física
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Calculadora de calorias</span>
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    <span className="text-red-500 font-semibold text-sm">Perfil personalizado</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end">
                <ArrowRight className="w-5 h-5 text-red-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Nutrition Card */}
            <Link
              href="/nutrition"
              className="group bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-green-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/10"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-green-600/10 rounded-2xl flex items-center justify-center group-hover:bg-green-600/20 transition-colors">
                  <Heart className="w-8 h-8 text-green-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-white">Nutrição</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    Receitas saudáveis, planos alimentares personalizados e acompanhamento nutricional inteligente
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Planejamento alimentar</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-green-500 font-semibold text-sm">IA nutricional</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end">
                <ArrowRight className="w-5 h-5 text-green-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            {/* Training Card */}
            <Link
              href="/training"
              className="group bg-gray-900 border border-gray-800 rounded-2xl p-8 hover:border-blue-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/10"
            >
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center group-hover:bg-blue-600/20 transition-colors">
                  <Dumbbell className="w-8 h-8 text-blue-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-3 text-white">Treinos</h3>
                  <p className="text-gray-400 mb-4 leading-relaxed">
                    Programas de treinamento personalizados, exercícios guiados e acompanhamento de progresso
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-500">Treinos inteligentes</span>
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-blue-500 font-semibold text-sm">Adaptação automática</span>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end">
                <ArrowRight className="w-5 h-5 text-blue-500 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-red-600/10 to-red-700/10 border border-red-500/30 rounded-2xl p-8 mb-8">
              <Sparkles className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Pronto para começar?</h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto">
                Configure seu perfil e descubra como a inteligência artificial pode revolucionar sua rotina fitness
              </p>
              <Link
                href="/profile"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 shadow-lg shadow-red-500/25"
              >
                Começar Agora
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}