'use client'

import { useState } from 'react'
import { CheckCircle, Circle, Play, Target, Clock, Zap, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

const beginnerWorkout = [
  {
    day: 'Day 1 - Push',
    exercises: [
      { name: 'Squats', sets: 3, reps: '8-12', rest: '90s', muscle: 'Legs', video: 'https://example.com/squat-video' },
      { name: 'Push-ups', sets: 3, reps: '8-12', rest: '90s', muscle: 'Chest', video: 'https://example.com/pushup-video' },
      { name: 'Bent-over Rows', sets: 3, reps: '8-12', rest: '90s', muscle: 'Back', video: 'https://example.com/row-video' },
      { name: 'Plank', sets: 3, reps: '20-30s', rest: '60s', muscle: 'Core', video: 'https://example.com/plank-video' },
    ]
  },
  {
    day: 'Day 2 - Pull',
    exercises: [
      { name: 'Deadlifts', sets: 3, reps: '8-12', rest: '90s', muscle: 'Back', video: 'https://example.com/deadlift-video' },
      { name: 'Overhead Press', sets: 3, reps: '8-12', rest: '90s', muscle: 'Shoulders', video: 'https://example.com/press-video' },
      { name: 'Pull-ups (assisted)', sets: 3, reps: '6-10', rest: '90s', muscle: 'Back', video: 'https://example.com/pullup-video' },
      { name: 'Lunges', sets: 3, reps: '8-12 per leg', rest: '60s', muscle: 'Legs', video: 'https://example.com/lunge-video' },
    ]
  },
  {
    day: 'Day 3 - Legs',
    exercises: [
      { name: 'Bench Press', sets: 3, reps: '8-12', rest: '90s', muscle: 'Chest', video: 'https://example.com/bench-video' },
      { name: 'Squats', sets: 3, reps: '8-12', rest: '90s', muscle: 'Legs', video: 'https://example.com/squat-video' },
      { name: 'Rows', sets: 3, reps: '8-12', rest: '90s', muscle: 'Back', video: 'https://example.com/row-video' },
      { name: 'Calf Raises', sets: 3, reps: '12-15', rest: '60s', muscle: 'Calves', video: 'https://example.com/calf-video' },
    ]
  }
]

export default function BeginnerTraining() {
  const [completedExercises, setCompletedExercises] = useState<{[key: string]: boolean}>({})
  const [currentDay, setCurrentDay] = useState(0)

  const toggleExercise = (dayIndex: number, exerciseIndex: number) => {
    const key = `${dayIndex}-${exerciseIndex}`
    setCompletedExercises(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const calculateXP = () => {
    const totalExercises = beginnerWorkout.reduce((acc, day) => acc + day.exercises.length, 0)
    const completedCount = Object.values(completedExercises).filter(Boolean).length
    return completedCount * 10
  }

  const weeklyProgress = beginnerWorkout.map((day, index) => {
    const dayExercises = day.exercises.length
    const completedInDay = day.exercises.filter((_, exIndex) => completedExercises[`${index}-${exIndex}`]).length
    return completedInDay === dayExercises
  })

  const totalXP = calculateXP()
  const level = Math.floor(totalXP / 100) + 1

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <header className="bg-gray-900 border border-gray-800 p-4 mb-6 rounded-xl">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Beginner Training</h1>
              <p className="text-sm text-gray-400">Based on scientific research and natural bodybuilding principles by Renato Cariani</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-red-500" />
            <span className="font-semibold text-white">Level {level}</span>
          </div>
        </div>
      </header>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4 text-white">Weekly Progress</h2>
        <div className="flex justify-center gap-4 mb-4">
          {weeklyProgress.map((completed, index) => (
            <div key={index} className={`w-12 h-12 rounded-full border-2 flex items-center justify-center ${
              completed ? 'bg-green-500 border-green-500' : index === currentDay ? 'bg-red-500 border-red-500' : 'border-gray-600'
            }`}>
              {completed ? <CheckCircle className="w-6 h-6 text-white" /> : <span className="text-white font-bold">{index + 1}</span>}
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-red-500 font-bold text-lg">XP Earned: {totalXP}</p>
          <p className="text-sm text-gray-400">Complete all exercises to level up!</p>
        </div>
      </div>

      {beginnerWorkout.map((day, dayIndex) => (
        <div key={dayIndex} className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6 shadow-lg">
          <h3 className="text-xl font-bold mb-4 text-red-500">{day.day}</h3>
          <div className="space-y-4">
            {day.exercises.map((exercise, exerciseIndex) => (
              <div key={exerciseIndex} className="flex items-center justify-between bg-gray-800 p-4 rounded-lg border border-gray-700">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-semibold text-white">{exercise.name}</h4>
                    <span className="text-xs bg-red-600 px-2 py-1 rounded-full text-white">{exercise.muscle}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
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
                  <button className="bg-red-600 hover:bg-red-700 p-2 rounded-full transition-colors">
                    <Play className="w-4 h-4 text-white" />
                  </button>
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