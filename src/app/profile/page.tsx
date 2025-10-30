'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, User, Activity, Target, Calculator, CheckCircle, AlertCircle } from 'lucide-react'

interface Profile {
  gender: 'male' | 'female' | ''
  age: string
  weight: string
  height: string
  activityLevel: string
  goal: string
  medicalConditions: string
}

const activityLevels = [
  { value: 'sedentary', label: 'Sedentário (pouco ou nenhum exercício)', multiplier: 1.2 },
  { value: 'light', label: 'Leve (exercício leve 1-3 dias/semana)', multiplier: 1.375 },
  { value: 'moderate', label: 'Moderado (exercício moderado 3-5 dias/semana)', multiplier: 1.55 },
  { value: 'active', label: 'Ativo (exercício intenso 6-7 dias/semana)', multiplier: 1.725 },
  { value: 'very_active', label: 'Muito ativo (exercício muito intenso diariamente)', multiplier: 1.9 }
]

const goals = [
  { value: 'lose_weight', label: 'Perder peso', adjustment: -500 },
  { value: 'maintain', label: 'Manter peso', adjustment: 0 },
  { value: 'gain_weight', label: 'Ganhar peso', adjustment: 500 }
]

export default function ProfilePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [profile, setProfile] = useState<Profile>({
    gender: '',
    age: '',
    weight: '',
    height: '',
    activityLevel: '',
    goal: '',
    medicalConditions: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {}

    if (step === 1) {
      if (!profile.gender) newErrors.gender = 'Selecione seu sexo'
      if (!profile.age) newErrors.age = 'Digite sua idade'
      if (!profile.weight) newErrors.weight = 'Digite seu peso'
      if (!profile.height) newErrors.height = 'Digite sua altura'
    }

    if (step === 2) {
      if (!profile.activityLevel) newErrors.activityLevel = 'Selecione seu nível de atividade'
    }

    if (step === 3) {
      if (!profile.goal) newErrors.goal = 'Selecione seu objetivo'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4))
    }
  }

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const calculateBasicCalories = () => {
    if (!profile.gender || !profile.weight || !profile.height || !profile.age || !profile.activityLevel) return null

    const weight = parseFloat(profile.weight)
    const height = parseFloat(profile.height)
    const age = parseInt(profile.age)

    if (isNaN(weight) || isNaN(height) || isNaN(age)) return null

    // Mifflin-St Jeor Equation
    let bmr = 0
    if (profile.gender === 'male') {
      bmr = 10 * weight + 6.25 * height - 5 * age + 5
    } else {
      bmr = 10 * weight + 6.25 * height - 5 * age - 161
    }

    const activityMultiplier = activityLevels.find(a => a.value === profile.activityLevel)?.multiplier || 1.2
    return Math.round(bmr * activityMultiplier)
  }

  const basicCalories = calculateBasicCalories()

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
            step < currentStep ? 'bg-green-500 text-white' :
            step === currentStep ? 'bg-red-500 text-white' :
            'bg-gray-700 text-gray-400'
          }`}>
            {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
          </div>
          {step < 4 && (
            <div className={`w-12 h-1 mx-2 transition-all duration-300 ${
              step < currentStep ? 'bg-green-500' : 'bg-gray-700'
            }`} />
          )}
        </div>
      ))}
    </div>
  )

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <User className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Dados Pessoais</h2>
        <p className="text-gray-400">Conte-nos um pouco sobre você</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Sexo *</label>
          <div className="space-y-2">
            <button
              onClick={() => setProfile({...profile, gender: 'male'})}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-300 ${
                profile.gender === 'male'
                  ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                  : 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600'
              }`}
            >
              <span className="text-2xl mr-3">👨</span> Masculino
            </button>
            <button
              onClick={() => setProfile({...profile, gender: 'female'})}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-300 ${
                profile.gender === 'female'
                  ? 'border-pink-500 bg-pink-500/10 text-pink-400'
                  : 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600'
              }`}
            >
              <span className="text-2xl mr-3">👩</span> Feminino
            </button>
          </div>
          {errors.gender && <p className="text-red-400 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.gender}</p>}
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Idade *</label>
            <input
              type="number"
              value={profile.age}
              onChange={(e) => setProfile({...profile, age: e.target.value})}
              placeholder="Ex: 25"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
            />
            {errors.age && <p className="text-red-400 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.age}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Peso (kg) *</label>
            <input
              type="number"
              value={profile.weight}
              onChange={(e) => setProfile({...profile, weight: e.target.value})}
              placeholder="Ex: 70"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
            />
            {errors.weight && <p className="text-red-400 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.weight}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Altura (cm) *</label>
            <input
              type="number"
              value={profile.height}
              onChange={(e) => setProfile({...profile, height: e.target.value})}
              placeholder="Ex: 175"
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
            />
            {errors.height && <p className="text-red-400 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.height}</p>}
          </div>
        </div>
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Activity className="w-16 h-16 text-blue-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Nível de Atividade</h2>
        <p className="text-gray-400">Como é sua rotina de exercícios?</p>
      </div>

      <div className="space-y-3">
        {activityLevels.map((level) => (
          <button
            key={level.value}
            onClick={() => setProfile({...profile, activityLevel: level.value})}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${
              profile.activityLevel === level.value
                ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                : 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{level.label}</div>
                <div className="text-sm opacity-75">Fator: {level.multiplier}x</div>
              </div>
              {profile.activityLevel === level.value && <CheckCircle className="w-5 h-5 text-blue-500" />}
            </div>
          </button>
        ))}
      </div>
      {errors.activityLevel && <p className="text-red-400 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.activityLevel}</p>}
    </div>
  )

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Target className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Seu Objetivo</h2>
        <p className="text-gray-400">O que você quer alcançar?</p>
      </div>

      <div className="space-y-3">
        {goals.map((goal) => (
          <button
            key={goal.value}
            onClick={() => setProfile({...profile, goal: goal.value})}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${
              profile.goal === goal.value
                ? 'border-green-500 bg-green-500/10 text-green-400'
                : 'border-gray-700 bg-gray-800 text-gray-300 hover:border-gray-600'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold">{goal.label}</div>
                <div className="text-sm opacity-75">
                  {goal.adjustment === 0 ? 'Manutenção' :
                   goal.adjustment > 0 ? `+${goal.adjustment} kcal/dia` :
                   `${goal.adjustment} kcal/dia`}
                </div>
              </div>
              {profile.goal === goal.value && <CheckCircle className="w-5 h-5 text-green-500" />}
            </div>
          </button>
        ))}
      </div>
      {errors.goal && <p className="text-red-400 text-sm mt-1 flex items-center gap-1"><AlertCircle className="w-4 h-4" /> {errors.goal}</p>}

      <div>
        <label className="block text-sm font-medium text-gray-300 mb-2">Condições médicas ou observações (opcional)</label>
        <textarea
          value={profile.medicalConditions}
          onChange={(e) => setProfile({...profile, medicalConditions: e.target.value})}
          placeholder="Ex: alergias, restrições alimentares, condições médicas..."
          rows={3}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20 transition-all duration-300"
        />
      </div>
    </div>
  )

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <Calculator className="w-16 h-16 text-purple-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Seus Resultados</h2>
        <p className="text-gray-400">Cálculo personalizado das suas necessidades calóricas</p>
      </div>

      {basicCalories && (
        <div className="bg-gradient-to-r from-blue-600/20 to-blue-700/20 border border-blue-500/30 rounded-2xl p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Calculator className="w-6 h-6 text-blue-500" />
            <h3 className="text-lg font-semibold text-white">Cálculo Básico</h3>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-blue-400 mb-2">{basicCalories}</div>
            <div className="text-gray-300">calorias por dia</div>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="bg-black/90 backdrop-blur-sm border-b border-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <ArrowLeft className="w-5 h-5 text-gray-400" />
            <span className="text-gray-400">Voltar</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-red-600 to-red-700 rounded-xl flex items-center justify-center">
              <Calculator className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Calculadora de Calorias</h1>
              <p className="text-xs text-gray-400">Passo {currentStep} de 4</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {renderStepIndicator()}

          <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl p-8">
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}
          </div>

          <div className="flex justify-between mt-8">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-3 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold text-white transition-all duration-300"
            >
              Anterior
            </button>

            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 shadow-lg shadow-red-500/25"
              >
                Próximo
              </button>
            ) : (
              <Link
                href="/"
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl font-semibold text-white transition-all duration-300 hover:scale-105 shadow-lg shadow-green-500/25"
              >
                Finalizar
              </Link>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}