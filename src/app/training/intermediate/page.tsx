'use client'

import { useState } from 'react'
import { CheckCircle, Circle, Play, Target, Clock, Zap } from 'lucide-react'

const intermediateWorkout = [
  {
    day: 'Push Day',
    exercises: [
      { name: 'Bench Press', sets: 4, reps: '8-10', rest: '120s', muscle: 'Chest', video: 'https://example.com/bench-video' },
      { name: 'Overhead Press', sets: 4, reps: '8-10', rest: '120s', muscle: 'Shoulders', video: 'https://example.com/press-video' },
      { name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', rest: '90s', muscle: 'Chest', video: 'https://example.com/incline-video' },
      { name: 'Tricep Dips', sets: 3, reps: '10-12', rest: '90s', muscle: 'Triceps', video: 'https://example.com/dips-video' },
      { name: 'Lateral Raises', sets: 3, reps: '12-15', rest: '60s', muscle: 'Shoulders', video: 'https://example.com/lateral-video' },
    ]
  },
  {
    day: 'Pull Day',
    exercises: [
      { name: 'Deadlifts', sets: 4, reps: '6-8', rest: '150s', muscle: 'Back', video: 'https://example.com/deadlift-video' },
      { name: 'Pull-ups', sets: 4, reps: '8-10', rest: '120s', muscle: 'Back', video: 'https://example.com/pullup-video' },
      { name: 'Bent-over Rows', sets: 3, reps: '8-10', rest: '90s', muscle: 'Back', video: 'https://example.com/row-video' },
      { name: 'Face Pulls', sets: 3, reps: '12-15', rest: '60s', muscle: 'Rear Delts', video: 'https://example.com/facepull-video' },
      { name: 'Bicep Curls', sets: 3, reps: '10-12', rest: '60s', muscle: 'Biceps', video: 'https://example.com/curl-video' },
    ]
  },
  {
    day: 'Leg Day',
    exercises: [
      { name: 'Squats', sets: 4, reps: '8-10', rest: '120s', muscle: 'Legs', video: 'https://example.com/squat-video' },
      { name: 'Romanian Deadlifts', sets: 4, reps: '8-10', rest: '120s', muscle: 'Hamstrings', video: 'https://example.com/rdl-video' },
      { name: 'Leg Press', sets: 3, reps: '10-12', rest: '90s', muscle: 'Legs', video: 'https://example.com/legpress-video' },
      { name: 'Calf Raises', sets: 3, reps: '15-20', rest: '60s', muscle: 'Calves', video: 'https://example.com/calf-video' },
      { name: 'Leg Curls', sets: 3, reps: '10-12', rest: '60s', muscle: 'Hamstrings', video: 'https://example.com/legcurl-video' },
    ]
  },
  {
    day: 'Rest or Light Cardio',
    exercises: [
      { name: 'Optional: Light cardio or mobility work', sets: 1, reps: '20-30 min', rest: 'N/A', muscle: 'Cardio', video: '' },
    ]
  }
]

export default function IntermediateTraining() {
  const [completedExercises, setCompletedExercises] = useState<{[key: string]: boolean}>({})
  const [currentDay, setCurrentDay] = useState(0)

  const toggleExercise = (dayIndex: number, exerciseIndex: number) => {
    const key = `${dayIndex}-${exerciseIndex}`
    setCompletedExercises(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const calculateXP = () => {
    const totalExercises = intermediateWorkout.reduce((acc, day) => acc + day.exercises.length, 0)
    const completedCount = Object.values(completedExercises).filter(Boolean).length
    return completedCount * 15 // 15 XP per exercise for intermediate
  }

  const weeklyProgress = intermediateWorkout.map((day, index) => {
    const dayExercises = day.exercises.length
    const completedInDay = day.exercises.filter((_, exIndex) => completedExercises[`${index}-${exIndex}`]).length
    return completedInDay === dayExercises
  })

  const totalXP = calculateXP()
  const level = Math.floor(totalXP / 100) + 1

  return (
    <div className="min-h-screen bg-gradient-red text-white p-4">
      <header className="bg-red-900/50 p-4 mb-6 rounded-xl backdrop-blur-sm">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-2xl font-bold">Intermediate Training</h1>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-400" />
            <span className="font-semibold">Level {level}</span>
          </div>
        </div>
        <p className="text-sm text-gray-300">Progressive overload and hypertrophy-focused training inspired by Julio Balestrin</p>
      </header>

      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Weekly Progress</h2>
        <div className="flex justify-center gap-4 mb-4">
          {weeklyProgress.map((completed, index) => (
            <div key={index} className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
              completed ? 'bg-green-500 border-green-500' : index === currentDay ? 'bg-red-500 border-red-500' : 'border-gray-500'
            }`}>
              {completed ? <CheckCircle className="w-6 h-6 text-white" /> : <span className="text-white font-bold">{index + 1}</span>}
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-red-400 font-bold text-lg">XP Earned: {totalXP}</p>
          <p className="text-sm text-gray-300">Complete all exercises to level up!</p>
        </div>
      </div>

      {intermediateWorkout.map((day, dayIndex) => (
        <div key={dayIndex} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 mb-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-red-400">{day.day}</h3>
          <div className="space-y-4">
            {day.exercises.map((exercise, exerciseIndex) => (
              <div key={exerciseIndex} className="flex items-center justify-between bg-black/30 p-4 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold">{exercise.name}</h4>
                    <span className="text-xs bg-red-600 px-2 py-1 rounded-full">{exercise.muscle}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-300">
                    <div className="flex items-center gap-1">
                      <Target className="w-4 h-4" />
                      {exercise.sets} sets × {exercise.reps}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Rest: {exercise.rest}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {exercise.video && (
                    <button className="bg-red-600 hover:bg-red-700 p-2 rounded-full transition-colors">
                      <Play className="w-4 h-4 text-white" />
                    </button>
                  )}
                  <button
                    onClick={() => toggleExercise(dayIndex, exerciseIndex)}
                    className="text-red-500 hover:text-red-400"
                  >
                    {completedExercises[`${dayIndex}-${exerciseIndex}`] ? (
                      <CheckCircle className="w-6 h-6" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="text-center">
        <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
          Complete Week & Level Up
        </button>
      </div>
    </div>
  )
}