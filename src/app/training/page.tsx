'use client'

import Link from 'next/link'
import { useState } from 'react'
import { 
  ArrowLeft, 
  Play, 
  Pause, 
  RotateCcw, 
  Plus,
  Clock,
  Target,
  Flame,
  Trophy,
  Calendar,
  TrendingUp,
  Dumbbell,
  Timer,
  CheckCircle2,
  Star,
  Filter,
  Search,
  Users,
  BookOpen,
  Zap,
  Shield,
  Brain,
  Award
} from 'lucide-react'

interface Exercise {
  id: string
  name: string
  sets: number
  reps: string
  rest: number
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado'
  muscleGroup: string
  equipment: string
  calories: number
  technique?: string
  progression?: string
}

interface Workout {
  id: string
  name: string
  duration: number
  difficulty: 'Iniciante' | 'Intermediário' | 'Avançado'
  muscleGroups: string[]
  exercises: Exercise[]
  calories: number
  completed: boolean
  rating: number
  phase: 'Iniciante' | 'Intermediário' | 'Avançado'
  split: string
  focus: string
  principles: string[]
  description: string
}

const workouts: Workout[] = [
  {
    id: '1',
    name: 'Fundação - Corpo Inteiro',
    duration: 45,
    difficulty: 'Iniciante',
    phase: 'Iniciante',
    split: 'Full Body',
    focus: 'Técnica e Coordenação',
    principles: ['Técnica sobre carga', 'Sobrecarga progressiva', 'Recuperação adequada'],
    description: 'Treino focado em ensinar movimentos fundamentais e construir uma base sólida de força.',
    muscleGroups: ['Corpo Inteiro'],
    calories: 280,
    completed: false,
    rating: 5,
    exercises: [
      { 
        id: '1', 
        name: 'Leg Press', 
        sets: 3, 
        reps: '12-15', 
        rest: 90, 
        difficulty: 'Iniciante', 
        muscleGroup: 'Pernas', 
        equipment: 'Máquina', 
        calories: 70,
        technique: 'Movimento controlado, pés na largura dos ombros',
        progression: 'Aumente 5kg quando conseguir 15 reps em todas as séries'
      },
      { 
        id: '2', 
        name: 'Supino Máquina', 
        sets: 3, 
        reps: '10-12', 
        rest: 90, 
        difficulty: 'Iniciante', 
        muscleGroup: 'Peito', 
        equipment: 'Máquina', 
        calories: 60,
        technique: 'Pegada na largura dos ombros, movimento controlado',
        progression: 'Aumente peso quando conseguir 12 reps facilmente'
      },
      { 
        id: '3', 
        name: 'Remada Sentada', 
        sets: 3, 
        reps: '10-12', 
        rest: 90, 
        difficulty: 'Iniciante', 
        muscleGroup: 'Costas', 
        equipment: 'Cabo', 
        calories: 55,
        technique: 'Peito ereto, puxe até o abdômen',
        progression: 'Foque na contração das costas antes de aumentar peso'
      },
      { 
        id: '4', 
        name: 'Desenvolvimento Máquina', 
        sets: 3, 
        reps: '10-12', 
        rest: 90, 
        difficulty: 'Iniciante', 
        muscleGroup: 'Ombros', 
        equipment: 'Máquina', 
        calories: 50,
        technique: 'Movimento vertical controlado, não force além da amplitude natural',
        progression: 'Desenvolva estabilidade antes de aumentar carga'
      },
      { 
        id: '5', 
        name: 'Flexão de Joelhos', 
        sets: 2, 
        reps: '8-12', 
        rest: 60, 
        difficulty: 'Iniciante', 
        muscleGroup: 'Peito', 
        equipment: 'Peso Corporal', 
        calories: 45,
        technique: 'Mantenha corpo alinhado, desça até peito quase tocar o chão',
        progression: 'Evolua para flexão completa quando conseguir 12 reps'
      }
    ]
  },
  {
    id: '2',
    name: 'Push/Pull/Legs - Intermediário',
    duration: 50,
    difficulty: 'Intermediário',
    phase: 'Intermediário',
    split: 'ABC Split (Push/Pull/Legs)',
    focus: 'Quebra de Platôs e Periodização',
    principles: ['Periodização linear', 'Gerenciamento de volume', 'Identificação de pontos fracos'],
    description: 'Programa estruturado com periodização para superar estagnação e promover adaptações contínuas.',
    muscleGroups: ['Peito', 'Ombros', 'Tríceps'],
    calories: 380,
    completed: true,
    rating: 4,
    exercises: [
      { 
        id: '6', 
        name: 'Supino Reto', 
        sets: 4, 
        reps: '6-8', 
        rest: 120, 
        difficulty: 'Intermediário', 
        muscleGroup: 'Peito', 
        equipment: 'Barra', 
        calories: 90,
        technique: 'Pegada 1,5x largura dos ombros, desça controlado até peito',
        progression: 'Semana 1-2: 8 reps, Semana 3-4: 6 reps com mais peso'
      },
      { 
        id: '7', 
        name: 'Desenvolvimento com Halteres', 
        sets: 3, 
        reps: '8-10', 
        rest: 90, 
        difficulty: 'Intermediário', 
        muscleGroup: 'Ombros', 
        equipment: 'Halteres', 
        calories: 75,
        technique: 'Movimento unilateral para corrigir desequilíbrios',
        progression: 'Foque na simetria entre os lados'
      },
      { 
        id: '8', 
        name: 'Supino Inclinado', 
        sets: 3, 
        reps: '8-10', 
        rest: 90, 
        difficulty: 'Intermediário', 
        muscleGroup: 'Peito', 
        equipment: 'Halteres', 
        calories: 80,
        technique: 'Inclinação 30-45°, amplitude completa',
        progression: 'Varie ângulos para estímulo completo'
      },
      { 
        id: '9', 
        name: 'Tríceps Paralelas', 
        sets: 3, 
        reps: '8-12', 
        rest: 90, 
        difficulty: 'Intermediário', 
        muscleGroup: 'Tríceps', 
        equipment: 'Peso Corporal', 
        calories: 70,
        technique: 'Incline-se para frente, desça até sentir alongamento',
        progression: 'Use peso adicional quando conseguir 12 reps'
      },
      { 
        id: '10', 
        name: 'Elevação Lateral', 
        sets: 3, 
        reps: '12-15', 
        rest: 60, 
        difficulty: 'Intermediário', 
        muscleGroup: 'Ombros', 
        equipment: 'Halteres', 
        calories: 65,
        technique: 'Movimento controlado, não balance o corpo',
        progression: 'Foque na conexão mente-músculo'
      }
    ]
  },
  {
    id: '3',
    name: 'Método Conjugado - Avançado',
    duration: 75,
    difficulty: 'Avançado',
    phase: 'Avançado',
    split: 'Especializado (5-6 dias)',
    focus: 'Maximização e Refinamento',
    principles: ['Método Conjugado', 'Técnicas avançadas', 'Atenção aos detalhes'],
    description: 'Sistema avançado que desenvolve múltiplas qualidades físicas simultaneamente com rotação frequente de exercícios.',
    muscleGroups: ['Força Máxima', 'Potência', 'Hipertrofia'],
    calories: 520,
    completed: false,
    rating: 5,
    exercises: [
      { 
        id: '11', 
        name: 'Agachamento com Correntes', 
        sets: 5, 
        reps: '3-5', 
        rest: 180, 
        difficulty: 'Avançado', 
        muscleGroup: 'Pernas', 
        equipment: 'Barra + Correntes', 
        calories: 120,
        technique: 'Resistência variável, explosão na subida',
        progression: 'Rotacione exercícios a cada 2-3 semanas'
      },
      { 
        id: '12', 
        name: 'Supino com Bandas', 
        sets: 4, 
        reps: '4-6', 
        rest: 150, 
        difficulty: 'Avançado', 
        muscleGroup: 'Peito', 
        equipment: 'Barra + Bandas', 
        calories: 100,
        technique: 'Acelere a fase concêntrica, controle a excêntrica',
        progression: 'Varie tensão das bandas semanalmente'
      },
      { 
        id: '13', 
        name: 'Remada Pendlay', 
        sets: 4, 
        reps: '5-7', 
        rest: 120, 
        difficulty: 'Avançado', 
        muscleGroup: 'Costas', 
        equipment: 'Barra', 
        calories: 95,
        technique: 'Pare completamente no chão entre reps',
        progression: 'Foque na explosão desde posição morta'
      },
      { 
        id: '14', 
        name: 'Agachamento Búlgaro c/ Pausa', 
        sets: 3, 
        reps: '6-8', 
        rest: 90, 
        difficulty: 'Avançado', 
        muscleGroup: 'Pernas', 
        equipment: 'Halteres', 
        calories: 85,
        technique: 'Pausa de 2s na posição inferior',
        progression: 'Corrija assimetrias entre pernas'
      },
      { 
        id: '15', 
        name: 'Drop Set - Rosca 21s', 
        sets: 2, 
        reps: '21 (7+7+7)', 
        rest: 120, 
        difficulty: 'Avançado', 
        muscleGroup: 'Bíceps', 
        equipment: 'Barra', 
        calories: 120,
        technique: '7 reps parciais baixo + 7 parciais alto + 7 completas',
        progression: 'Técnica avançada para quebra de platô'
      }
    ]
  },
  {
    id: '4',
    name: 'Upper/Lower - Iniciante',
    duration: 40,
    difficulty: 'Iniciante',
    phase: 'Iniciante',
    split: 'AB Split (Upper/Lower)',
    focus: 'Adaptação Neural e Coordenação',
    principles: ['Frequência alta', 'Movimentos compostos', 'Aprendizado motor'],
    description: 'Divisão simples que permite praticar movimentos fundamentais com alta frequência.',
    muscleGroups: ['Membros Superiores'],
    calories: 260,
    completed: true,
    rating: 4,
    exercises: [
      { 
        id: '16', 
        name: 'Puxada Frontal', 
        sets: 3, 
        reps: '10-12', 
        rest: 90, 
        difficulty: 'Iniciante', 
        muscleGroup: 'Costas', 
        equipment: 'Cabo', 
        calories: 65,
        technique: 'Puxe até a clavícula, contraia as escápulas',
        progression: 'Desenvolva a pegada antes de aumentar peso'
      },
      { 
        id: '17', 
        name: 'Supino Inclinado Máquina', 
        sets: 3, 
        reps: '10-12', 
        rest: 90, 
        difficulty: 'Iniciante', 
        muscleGroup: 'Peito', 
        equipment: 'Máquina', 
        calories: 60,
        technique: 'Trajetória guiada, foque na contração',
        progression: 'Sinta o músculo trabalhando antes de progredir'
      },
      { 
        id: '18', 
        name: 'Rosca Direta', 
        sets: 2, 
        reps: '12-15', 
        rest: 60, 
        difficulty: 'Iniciante', 
        muscleGroup: 'Bíceps', 
        equipment: 'Barra', 
        calories: 45,
        technique: 'Cotovelos fixos, movimento apenas do antebraço',
        progression: 'Priorize forma perfeita'
      },
      { 
        id: '19', 
        name: 'Tríceps Pulley', 
        sets: 2, 
        reps: '12-15', 
        rest: 60, 
        difficulty: 'Iniciante', 
        muscleGroup: 'Tríceps', 
        equipment: 'Cabo', 
        calories: 50,
        technique: 'Cotovelos colados ao corpo',
        progression: 'Sinta a extensão completa'
      },
      { 
        id: '20', 
        name: 'Elevação Frontal', 
        sets: 2, 
        reps: '12-15', 
        rest: 60, 
        difficulty: 'Iniciante', 
        muscleGroup: 'Ombros', 
        equipment: 'Halteres', 
        calories: 40,
        technique: 'Eleve até altura dos ombros, controle a descida',
        progression: 'Coordenação antes de carga'
      }
    ]
  },
  {
    id: '5',
    name: 'Periodização Ondulatória',
    duration: 60,
    difficulty: 'Intermediário',
    phase: 'Intermediário',
    split: 'ABC Split Modificado',
    focus: 'Variação Sistemática de Estímulos',
    principles: ['Periodização ondulatória', 'Semanas de deload', 'Análise de pontos fracos'],
    description: 'Sistema que varia intensidade e volume semanalmente para adaptação contínua.',
    muscleGroups: ['Costas', 'Bíceps', 'Posterior'],
    calories: 420,
    completed: false,
    rating: 5,
    exercises: [
      { 
        id: '21', 
        name: 'Barra Fixa Assistida', 
        sets: 4, 
        reps: '5-8', 
        rest: 120, 
        difficulty: 'Intermediário', 
        muscleGroup: 'Costas', 
        equipment: 'Assistida', 
        calories: 85,
        technique: 'Progressão para barra fixa completa',
        progression: 'Reduza assistência gradualmente'
      },
      { 
        id: '22', 
        name: 'Remada Curvada', 
        sets: 4, 
        reps: '6-10', 
        rest: 90, 
        difficulty: 'Intermediário', 
        muscleGroup: 'Costas', 
        equipment: 'Barra', 
        calories: 95,
        technique: 'Tronco inclinado 45°, puxe até abdômen',
        progression: 'Semana pesada: 6 reps, Semana leve: 10 reps'
      },
      { 
        id: '23', 
        name: 'Rosca Martelo Alternada', 
        sets: 3, 
        reps: '8-12', 
        rest: 75, 
        difficulty: 'Intermediário', 
        muscleGroup: 'Bíceps', 
        equipment: 'Halteres', 
        calories: 70,
        technique: 'Movimento unilateral para correção de assimetrias',
        progression: 'Identifique e corrija lado mais fraco'
      },
      { 
        id: '24', 
        name: 'Face Pull', 
        sets: 3, 
        reps: '15-20', 
        rest: 60, 
        difficulty: 'Intermediário', 
        muscleGroup: 'Ombros', 
        equipment: 'Cabo', 
        calories: 55,
        technique: 'Puxe até face, cotovelos altos',
        progression: 'Exercício corretivo para postura'
      },
      { 
        id: '25', 
        name: 'Encolhimento', 
        sets: 3, 
        reps: '12-15', 
        rest: 60, 
        difficulty: 'Intermediário', 
        muscleGroup: 'Trapézio', 
        equipment: 'Halteres', 
        calories: 115,
        technique: 'Movimento vertical puro, sem rotação',
        progression: 'Foque na contração máxima'
      }
    ]
  },
  {
    id: '6',
    name: 'Especialização em Pontos Fracos',
    duration: 90,
    difficulty: 'Avançado',
    phase: 'Avançado',
    split: 'Especializado por Região',
    focus: 'Correção de Assimetrias e Refinamento',
    principles: ['Individualização extrema', 'Técnicas intensivas', 'Recuperação otimizada'],
    description: 'Programa altamente especializado para atletas avançados focando em pontos específicos de desenvolvimento.',
    muscleGroups: ['Especialização', 'Correção', 'Refinamento'],
    calories: 580,
    completed: false,
    rating: 5,
    exercises: [
      { 
        id: '26', 
        name: 'Agachamento Frontal', 
        sets: 5, 
        reps: '4-6', 
        rest: 180, 
        difficulty: 'Avançado', 
        muscleGroup: 'Quadríceps', 
        equipment: 'Barra', 
        calories: 130,
        technique: 'Enfatiza quadríceps e core, postura ereta',
        progression: 'Rotação com agachamento hack'
      },
      { 
        id: '27', 
        name: 'Rest-Pause Supino', 
        sets: 2, 
        reps: '8+3+2', 
        rest: 180, 
        difficulty: 'Avançado', 
        muscleGroup: 'Peito', 
        equipment: 'Barra', 
        calories: 110,
        technique: '8 reps + 15s pausa + 3 reps + 15s + 2 reps',
        progression: 'Técnica para quebra de platô'
      },
      { 
        id: '28', 
        name: 'Cluster Sets - Desenvolvimento', 
        sets: 4, 
        reps: '3x3 (15s)', 
        rest: 120, 
        difficulty: 'Avançado', 
        muscleGroup: 'Ombros', 
        equipment: 'Halteres', 
        calories: 95,
        technique: '3 reps + 15s + 3 reps + 15s + 3 reps',
        progression: 'Permite usar cargas mais altas'
      },
      { 
        id: '29', 
        name: 'Stiff Unilateral', 
        sets: 3, 
        reps: '8-10', 
        rest: 90, 
        difficulty: 'Avançado', 
        muscleGroup: 'Posterior', 
        equipment: 'Halter', 
        calories: 85,
        technique: 'Uma perna por vez, foco na simetria',
        progression: 'Corrija desequilíbrios entre lados'
      },
      { 
        id: '30', 
        name: 'Mechanical Drop Set', 
        sets: 2, 
        reps: 'Até falha', 
        rest: 150, 
        difficulty: 'Avançado', 
        muscleGroup: 'Bíceps', 
        equipment: 'Cabo', 
        calories: 160,
        technique: 'Rosca cabo alto → meio → baixo sem pausa',
        progression: 'Técnica avançada de intensificação'
      }
    ]
  }
]

export default function TrainingPage() {
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null)
  const [currentExercise, setCurrentExercise] = useState(0)
  const [isWorkoutActive, setIsWorkoutActive] = useState(false)
  const [timer, setTimer] = useState(0)
  const [isResting, setIsResting] = useState(false)
  const [completedSets, setCompletedSets] = useState<{[key: string]: number}>({})
  const [searchTerm, setSearchTerm] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState<string>('all')
  const [phaseFilter, setPhaseFilter] = useState<string>('all')
  const [showWorkoutDetails, setShowWorkoutDetails] = useState<string | null>(null)

  const filteredWorkouts = workouts.filter(workout => {
    const matchesSearch = workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workout.muscleGroups.some(group => group.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         workout.focus.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDifficulty = difficultyFilter === 'all' || workout.difficulty === difficultyFilter
    const matchesPhase = phaseFilter === 'all' || workout.phase === phaseFilter
    return matchesSearch && matchesDifficulty && matchesPhase
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Iniciante': return 'text-green-500 bg-green-500/10 border-green-500/30'
      case 'Intermediário': return 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30'
      case 'Avançado': return 'text-red-500 bg-red-500/10 border-red-500/30'
      default: return 'text-gray-500 bg-gray-500/10 border-gray-500/30'
    }
  }

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case 'Iniciante': return <Shield className="w-4 h-4" />
      case 'Intermediário': return <Brain className="w-4 h-4" />
      case 'Avançado': return <Award className="w-4 h-4" />
      default: return <Dumbbell className="w-4 h-4" />
    }
  }

  const startWorkout = (workout: Workout) => {
    setSelectedWorkout(workout)
    setCurrentExercise(0)
    setIsWorkoutActive(true)
    setCompletedSets({})
  }

  const completeSet = (exerciseId: string) => {
    setCompletedSets(prev => ({
      ...prev,
      [exerciseId]: (prev[exerciseId] || 0) + 1
    }))
  }

  const nextExercise = () => {
    if (selectedWorkout && currentExercise < selectedWorkout.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1)
    }
  }

  const prevExercise = () => {
    if (currentExercise > 0) {
      setCurrentExercise(currentExercise - 1)
    }
  }

  const finishWorkout = () => {
    setSelectedWorkout(null)
    setIsWorkoutActive(false)
    setCurrentExercise(0)
    setCompletedSets({})
  }

  if (selectedWorkout && isWorkoutActive) {
    const currentEx = selectedWorkout.exercises[currentExercise]
    const completedSetsCount = completedSets[currentEx.id] || 0
    const progress = ((currentExercise + 1) / selectedWorkout.exercises.length) * 100

    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Header */}
        <header className="bg-black/90 backdrop-blur-sm border-b border-gray-800 p-4">
          <div className="container mx-auto flex justify-between items-center">
            <button
              onClick={finishWorkout}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              Finalizar Treino
            </button>
            <div className="text-center">
              <h1 className="text-lg font-bold text-white">{selectedWorkout.name}</h1>
              <p className="text-sm text-gray-400">
                Exercício {currentExercise + 1} de {selectedWorkout.exercises.length}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Progresso</p>
              <p className="text-lg font-bold text-blue-500">{Math.round(progress)}%</p>
            </div>
          </div>
        </header>

        {/* Progress Bar */}
        <div className="bg-gray-800 h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <main className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            {/* Current Exercise */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 mb-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">{currentEx.name}</h2>
                <div className="flex items-center justify-center gap-4 text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    {currentEx.muscleGroup}
                  </span>
                  <span className="flex items-center gap-1">
                    <Dumbbell className="w-4 h-4" />
                    {currentEx.equipment}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs border ${getDifficultyColor(currentEx.difficulty)}`}>
                    {currentEx.difficulty}
                  </span>
                </div>
                
                {/* Technique Tips */}
                {currentEx.technique && (
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mb-4">
                    <div className="flex items-start gap-2">
                      <BookOpen className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div className="text-left">
                        <h4 className="text-blue-400 font-semibold mb-1">Técnica</h4>
                        <p className="text-gray-300 text-sm">{currentEx.technique}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Progression Tips */}
                {currentEx.progression && (
                  <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
                    <div className="flex items-start gap-2">
                      <TrendingUp className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <div className="text-left">
                        <h4 className="text-green-400 font-semibold mb-1">Progressão</h4>
                        <p className="text-gray-300 text-sm">{currentEx.progression}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Exercise Stats */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-gray-800 rounded-xl">
                  <p className="text-2xl font-bold text-blue-500">{currentEx.sets}</p>
                  <p className="text-sm text-gray-400">Séries</p>
                </div>
                <div className="text-center p-4 bg-gray-800 rounded-xl">
                  <p className="text-2xl font-bold text-green-500">{currentEx.reps}</p>
                  <p className="text-sm text-gray-400">Repetições</p>
                </div>
                <div className="text-center p-4 bg-gray-800 rounded-xl">
                  <p className="text-2xl font-bold text-yellow-500">{currentEx.rest}s</p>
                  <p className="text-sm text-gray-400">Descanso</p>
                </div>
              </div>

              {/* Sets Progress */}
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-white">Séries Completadas</h3>
                  <span className="text-blue-500 font-bold">
                    {completedSetsCount}/{currentEx.sets}
                  </span>
                </div>
                <div className="flex gap-2">
                  {Array.from({ length: currentEx.sets }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => completeSet(currentEx.id)}
                      className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
                        index < completedSetsCount
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                    >
                      {index < completedSetsCount ? (
                        <CheckCircle2 className="w-5 h-5 mx-auto" />
                      ) : (
                        `Série ${index + 1}`
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Navigation */}
              <div className="flex gap-4">
                <button
                  onClick={prevExercise}
                  disabled={currentExercise === 0}
                  className="flex-1 py-4 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-semibold text-white transition-colors"
                >
                  Anterior
                </button>
                {currentExercise === selectedWorkout.exercises.length - 1 ? (
                  <button
                    onClick={finishWorkout}
                    className="flex-1 py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl font-semibold text-white transition-all"
                  >
                    Finalizar Treino
                  </button>
                ) : (
                  <button
                    onClick={nextExercise}
                    className="flex-1 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-xl font-semibold text-white transition-all"
                  >
                    Próximo
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
      {/* Header */}
      <header className="bg-black/90 backdrop-blur-sm border-b border-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Voltar
          </Link>
          <div className="text-center">
            <h1 className="text-xl font-bold text-white">Programas Científicos</h1>
            <p className="text-sm text-gray-400">Baseados em evidências e periodização</p>
          </div>
          <div className="w-20"></div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Training Phases Overview */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border border-green-500/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Iniciante</h3>
                  <p className="text-sm text-green-400">Fundação Sólida</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                Foco em técnica, coordenação e prevenção de lesões com movimentos fundamentais.
              </p>
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-md">Full Body</span>
                <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-md">3x/semana</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                  <Brain className="w-6 h-6 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Intermediário</h3>
                  <p className="text-sm text-yellow-400">Quebra de Platôs</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                Periodização sistemática e variação de estímulos para adaptação contínua.
              </p>
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-md">Push/Pull/Legs</span>
                <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded-md">4x/semana</span>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-500/10 to-red-600/5 border border-red-500/30 rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Avançado</h3>
                  <p className="text-sm text-red-400">Maximização</p>
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-3">
                Especialização extrema com técnicas avançadas e atenção aos detalhes.
              </p>
              <div className="flex flex-wrap gap-1">
                <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-md">Especializado</span>
                <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs rounded-md">5-6x/semana</span>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600/10 rounded-lg flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">18</p>
                  <p className="text-xs text-gray-400">Treinos este mês</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-600/10 rounded-lg flex items-center justify-center">
                  <Flame className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">4.2k</p>
                  <p className="text-xs text-gray-400">Calorias queimadas</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-600/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">12.5h</p>
                  <p className="text-xs text-gray-400">Tempo total</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-600/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">+22%</p>
                  <p className="text-xs text-gray-400">Progresso</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar treinos, músculos ou foco..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="flex gap-2">
              <select
                value={phaseFilter}
                onChange={(e) => setPhaseFilter(e.target.value)}
                className="px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="all">Todas as fases</option>
                <option value="Iniciante">Iniciante</option>
                <option value="Intermediário">Intermediário</option>
                <option value="Avançado">Avançado</option>
              </select>
              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl text-white focus:border-blue-500 focus:outline-none"
              >
                <option value="all">Todas as dificuldades</option>
                <option value="Iniciante">Iniciante</option>
                <option value="Intermediário">Intermediário</option>
                <option value="Avançado">Avançado</option>
              </select>
            </div>
          </div>

          {/* Workouts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkouts.map((workout) => (
              <div key={workout.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all group">
                {/* Workout Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getDifficultyColor(workout.phase).replace('text-', 'bg-').replace('/10', '/20')}`}>
                      {getPhaseIcon(workout.phase)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{workout.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs border ${getDifficultyColor(workout.difficulty)}`}>
                          {workout.difficulty}
                        </span>
                        {workout.completed && (
                          <CheckCircle2 className="w-4 h-4 text-green-500" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < workout.rating ? 'text-yellow-500 fill-current' : 'text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Phase Info */}
                <div className="mb-4 p-3 bg-gray-800 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-blue-400">{workout.split}</span>
                    <span className="text-xs text-gray-400">{workout.phase}</span>
                  </div>
                  <p className="text-xs text-gray-300 mb-2">{workout.focus}</p>
                  <div className="flex flex-wrap gap-1">
                    {workout.principles.slice(0, 2).map((principle, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded-md"
                      >
                        {principle}
                      </span>
                    ))}
                    {workout.principles.length > 2 && (
                      <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded-md">
                        +{workout.principles.length - 2}
                      </span>
                    )}
                  </div>
                </div>

                {/* Workout Stats */}
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center p-2 bg-gray-800 rounded-lg">
                    <Clock className="w-4 h-4 text-blue-500 mx-auto mb-1" />
                    <p className="text-sm font-semibold text-white">{workout.duration}min</p>
                  </div>
                  <div className="text-center p-2 bg-gray-800 rounded-lg">
                    <Flame className="w-4 h-4 text-orange-500 mx-auto mb-1" />
                    <p className="text-sm font-semibold text-white">{workout.calories}</p>
                  </div>
                  <div className="text-center p-2 bg-gray-800 rounded-lg">
                    <Dumbbell className="w-4 h-4 text-green-500 mx-auto mb-1" />
                    <p className="text-sm font-semibold text-white">{workout.exercises.length}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-400 mb-4 line-clamp-2">{workout.description}</p>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowWorkoutDetails(showWorkoutDetails === workout.id ? null : workout.id)}
                    className="flex-1 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold text-white transition-all text-sm flex items-center justify-center gap-2"
                  >
                    <BookOpen className="w-4 h-4" />
                    Detalhes
                  </button>
                  <button
                    onClick={() => startWorkout(workout)}
                    className="flex-1 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg font-semibold text-white transition-all text-sm flex items-center justify-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    {workout.completed ? 'Repetir' : 'Iniciar'}
                  </button>
                </div>

                {/* Expanded Details */}
                {showWorkoutDetails === workout.id && (
                  <div className="mt-4 p-4 bg-gray-800 rounded-xl">
                    <h4 className="text-white font-semibold mb-3">Exercícios do Treino</h4>
                    <div className="space-y-2">
                      {workout.exercises.map((exercise, index) => (
                        <div key={exercise.id} className="flex justify-between items-center py-2 border-b border-gray-700 last:border-b-0">
                          <div>
                            <p className="text-white text-sm font-medium">{exercise.name}</p>
                            <p className="text-gray-400 text-xs">{exercise.muscleGroup} • {exercise.equipment}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-blue-400 text-sm">{exercise.sets}x{exercise.reps}</p>
                            <p className="text-gray-400 text-xs">{exercise.rest}s rest</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-4 pt-3 border-t border-gray-700">
                      <h5 className="text-white font-medium mb-2">Princípios Aplicados</h5>
                      <div className="flex flex-wrap gap-1">
                        {workout.principles.map((principle, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-md"
                          >
                            {principle}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Scientific Principles Section */}
          <div className="mt-12 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/30 rounded-2xl p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Baseado em Ciência</h3>
              <p className="text-gray-400 max-w-2xl mx-auto">
                Todos os programas seguem princípios científicos comprovados de periodização, 
                progressão e adaptação neuromuscular para resultados otimizados.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Shield className="w-6 h-6 text-green-500" />
                </div>
                <h4 className="text-white font-semibold mb-2">Progressão Segura</h4>
                <p className="text-gray-400 text-sm">
                  Sobrecarga progressiva controlada com foco na técnica e prevenção de lesões.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-blue-500" />
                </div>
                <h4 className="text-white font-semibold mb-2">Periodização</h4>
                <p className="text-gray-400 text-sm">
                  Variação sistemática de volume e intensidade para adaptação contínua.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-yellow-500" />
                </div>
                <h4 className="text-white font-semibold mb-2">Individualização</h4>
                <p className="text-gray-400 text-sm">
                  Programas adaptados ao seu nível de experiência e objetivos específicos.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}