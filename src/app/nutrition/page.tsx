'use client'

import { useState } from 'react'
import { Plus, Trash2, Calculator, Flame, ArrowLeft, Clock, Users, Star, ChefHat, Search } from 'lucide-react'
import Link from 'next/link'

const foodDatabase = {
  'Chicken Breast': 165,
  'Rice': 130,
  'Broccoli': 34,
  'Sweet Potato': 86,
  'Eggs': 155,
  'Oats': 379,
  'Banana': 89,
  'Almonds': 579,
  'Salmon': 208,
  'Quinoa': 368,
  'Spinach': 23,
  'Avocado': 160,
  'Greek Yogurt': 59,
  'Beef': 250,
  'Pasta': 157,
  'Tomato': 18,
  'Apple': 52,
  'Milk': 61,
  'Cheese': 402,
  'Bread': 265,
}

const recipes = [
  {
    id: 1,
    name: "Omelete Proteica",
    category: "Café da Manhã",
    time: 10,
    servings: 1,
    calories: 280,
    protein: 24,
    carbs: 4,
    fat: 18,
    difficulty: "Fácil",
    rating: 4.8,
    image: "🍳",
    ingredients: [
      "3 ovos inteiros",
      "50g queijo cottage",
      "1 punhado de espinafre",
      "1 tomate pequeno",
      "Sal e pimenta a gosto",
      "1 colher de chá de azeite"
    ],
    instructions: [
      "Bata os ovos em uma tigela com sal e pimenta",
      "Aqueça o azeite em uma frigideira antiaderente",
      "Despeje os ovos e deixe cozinhar por 2 minutos",
      "Adicione o queijo cottage, espinafre e tomate em uma metade",
      "Dobre a omelete ao meio e sirva imediatamente"
    ]
  },
  {
    id: 2,
    name: "Salada de Quinoa Proteica",
    category: "Almoço",
    time: 25,
    servings: 2,
    calories: 420,
    protein: 18,
    carbs: 45,
    fat: 16,
    difficulty: "Fácil",
    rating: 4.6,
    image: "🥗",
    ingredients: [
      "150g quinoa",
      "200g peito de frango grelhado",
      "1 pepino médio",
      "2 tomates",
      "1/2 abacate",
      "50g rúcula",
      "2 colheres de sopa de azeite",
      "Suco de 1 limão",
      "Sal e ervas finas"
    ],
    instructions: [
      "Cozinhe a quinoa em água fervente por 15 minutos",
      "Grelhe o peito de frango e corte em cubos",
      "Corte o pepino, tomate e abacate em cubos",
      "Misture todos os ingredientes em uma tigela",
      "Tempere com azeite, limão, sal e ervas",
      "Deixe descansar por 10 minutos antes de servir"
    ]
  },
  {
    id: 3,
    name: "Smoothie Verde Detox",
    category: "Lanche",
    time: 5,
    servings: 1,
    calories: 180,
    protein: 8,
    carbs: 28,
    fat: 6,
    difficulty: "Muito Fácil",
    rating: 4.4,
    image: "🥤",
    ingredients: [
      "1 banana madura",
      "1 punhado de espinafre",
      "200ml leite de amêndoas",
      "1 colher de sopa de pasta de amendoim",
      "1 colher de chá de mel",
      "Gelo a gosto"
    ],
    instructions: [
      "Coloque todos os ingredientes no liquidificador",
      "Bata por 1-2 minutos até ficar homogêneo",
      "Adicione gelo se desejar mais gelado",
      "Sirva imediatamente em um copo alto"
    ]
  },
  {
    id: 4,
    name: "Salmão Grelhado com Batata Doce",
    category: "Jantar",
    time: 35,
    servings: 2,
    calories: 450,
    protein: 35,
    carbs: 30,
    fat: 20,
    difficulty: "Médio",
    rating: 4.9,
    image: "🐟",
    ingredients: [
      "2 filés de salmão (150g cada)",
      "2 batatas doces médias",
      "200g brócolis",
      "2 colheres de sopa de azeite",
      "1 limão",
      "Alho, sal e pimenta",
      "Ervas frescas (dill ou salsa)"
    ],
    instructions: [
      "Pré-aqueça o forno a 200°C",
      "Corte as batatas doces em fatias e tempere com azeite",
      "Asse as batatas por 25 minutos",
      "Tempere o salmão com sal, pimenta e limão",
      "Grelhe o salmão por 4-5 minutos de cada lado",
      "Cozinhe o brócolis no vapor por 5 minutos",
      "Sirva tudo junto com ervas frescas"
    ]
  },
  {
    id: 5,
    name: "Overnight Oats Proteico",
    category: "Café da Manhã",
    time: 5,
    servings: 1,
    calories: 320,
    protein: 20,
    carbs: 40,
    fat: 8,
    difficulty: "Muito Fácil",
    rating: 4.7,
    image: "🥣",
    ingredients: [
      "50g aveia em flocos",
      "200ml leite desnatado",
      "1 scoop de whey protein baunilha",
      "1 colher de sopa de chia",
      "1/2 banana",
      "1 colher de chá de mel",
      "Canela em pó"
    ],
    instructions: [
      "Misture aveia, leite, whey protein e chia em um pote",
      "Adicione mel e canela",
      "Mexa bem até ficar homogêneo",
      "Cubra e leve à geladeira por pelo menos 4 horas",
      "Pela manhã, adicione a banana fatiada por cima",
      "Está pronto para consumir!"
    ]
  },
  {
    id: 6,
    name: "Wrap de Frango Fitness",
    category: "Almoço",
    time: 15,
    servings: 1,
    calories: 380,
    protein: 32,
    carbs: 35,
    fat: 12,
    difficulty: "Fácil",
    rating: 4.5,
    image: "🌯",
    ingredients: [
      "1 tortilla integral",
      "150g peito de frango grelhado",
      "2 folhas de alface",
      "1/4 de abacate",
      "2 fatias de tomate",
      "2 colheres de sopa de iogurte grego",
      "Temperos: páprica, alho em pó",
      "Sal e pimenta"
    ],
    instructions: [
      "Tempere o frango com páprica, alho, sal e pimenta",
      "Grelhe o frango até dourar dos dois lados",
      "Corte o frango em tiras",
      "Espalhe o iogurte grego na tortilla",
      "Adicione alface, tomate, abacate e frango",
      "Enrole bem apertado e corte ao meio para servir"
    ]
  }
]

interface FoodItem {
  name: string
  quantity: number
  calories: number
}

export default function NutritionTracker() {
  const [selectedFood, setSelectedFood] = useState('')
  const [quantity, setQuantity] = useState('')
  const [mealItems, setMealItems] = useState<FoodItem[]>([])
  const [activeTab, setActiveTab] = useState('tracker')
  const [selectedCategory, setSelectedCategory] = useState('Todas')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRecipe, setSelectedRecipe] = useState<typeof recipes[0] | null>(null)

  const addFood = () => {
    if (!selectedFood || !quantity) return

    const caloriesPer100g = foodDatabase[selectedFood as keyof typeof foodDatabase]
    const calories = (caloriesPer100g * parseFloat(quantity)) / 100

    const newItem: FoodItem = {
      name: selectedFood,
      quantity: parseFloat(quantity),
      calories: Math.round(calories)
    }

    setMealItems([...mealItems, newItem])
    setSelectedFood('')
    setQuantity('')
  }

  const removeFood = (index: number) => {
    setMealItems(mealItems.filter((_, i) => i !== index))
  }

  const totalCalories = mealItems.reduce((sum, item) => sum + item.calories, 0)

  const categories = ['Todas', 'Café da Manhã', 'Almoço', 'Jantar', 'Lanche']
  
  const filteredRecipes = recipes.filter(recipe => {
    const matchesCategory = selectedCategory === 'Todas' || recipe.category === selectedCategory
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         recipe.ingredients.some(ingredient => 
                           ingredient.toLowerCase().includes(searchTerm.toLowerCase())
                         )
    return matchesCategory && matchesSearch
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Muito Fácil': return 'text-green-500'
      case 'Fácil': return 'text-blue-500'
      case 'Médio': return 'text-yellow-500'
      case 'Difícil': return 'text-red-500'
      default: return 'text-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-4">
      <header className="bg-gray-900 border border-gray-800 p-4 mb-6 rounded-xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Nutrição</h1>
              <p className="text-sm text-gray-400">Rastreie calorias e descubra receitas saudáveis</p>
            </div>
          </div>
          <Calculator className="w-8 h-8 text-green-500" />
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('tracker')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            activeTab === 'tracker'
              ? 'bg-green-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          <Calculator className="w-4 h-4 inline mr-2" />
          Contador de Calorias
        </button>
        <button
          onClick={() => setActiveTab('recipes')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            activeTab === 'recipes'
              ? 'bg-green-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:text-white'
          }`}
        >
          <ChefHat className="w-4 h-4 inline mr-2" />
          Receitas Fitness
        </button>
      </div>

      {activeTab === 'tracker' && (
        <>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 text-white">Adicionar Alimento</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Selecionar Alimento</label>
                <select
                  value={selectedFood}
                  onChange={(e) => setSelectedFood(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500"
                >
                  <option value="" className="bg-gray-800">Escolha um alimento...</option>
                  {Object.keys(foodDatabase).map((food) => (
                    <option key={food} value={food} className="bg-gray-800">{food}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Quantidade (gramas)</label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="100"
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500"
                />
              </div>

              <button
                onClick={addFood}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 w-full justify-center"
              >
                <Plus className="w-4 h-4" />
                Adicionar à Refeição
              </button>
            </div>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 text-white">Sua Refeição</h2>
            {mealItems.length === 0 ? (
              <p className="text-gray-400">Nenhum alimento adicionado ainda</p>
            ) : (
              <div className="space-y-2">
                {mealItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-center bg-gray-800 p-4 rounded-lg border border-gray-700">
                    <div>
                      <span className="font-semibold text-white">{item.name}</span>
                      <span className="text-gray-400 ml-2">({item.quantity}g)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-green-500 font-bold">
                        <Flame className="w-4 h-4" />
                        {item.calories} cal
                      </div>
                      <button
                        onClick={() => removeFood(index)}
                        className="text-red-500 hover:text-red-400 p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold mb-2 text-white">Total de Calorias</h2>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Flame className="w-8 h-8 text-green-500" />
              <p className="text-4xl font-bold text-green-500">{totalCalories} cal</p>
            </div>
            <p className="text-sm text-gray-400">
              Acompanhe sua ingestão diária para atingir seus objetivos fitness!
            </p>
            {totalCalories > 0 && (
              <div className="mt-4 text-sm text-green-500 font-semibold">
                +25 XP ganhos por rastrear sua refeição!
              </div>
            )}
          </div>
        </>
      )}

      {activeTab === 'recipes' && (
        <>
          {selectedRecipe ? (
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-6">
                <button
                  onClick={() => setSelectedRecipe(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedRecipe.name}</h2>
                  <div className="flex items-center gap-4 text-sm text-gray-400 mt-1">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {selectedRecipe.time} min
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {selectedRecipe.servings} porção{selectedRecipe.servings > 1 ? 'ões' : ''}
                    </span>
                    <span className={`font-semibold ${getDifficultyColor(selectedRecipe.difficulty)}`}>
                      {selectedRecipe.difficulty}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {selectedRecipe.rating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Informações Nutricionais</h3>
                  <div className="bg-gray-800 rounded-lg p-4 mb-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-500">{selectedRecipe.calories}</div>
                        <div className="text-sm text-gray-400">Calorias</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-500">{selectedRecipe.protein}g</div>
                        <div className="text-sm text-gray-400">Proteína</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-500">{selectedRecipe.carbs}g</div>
                        <div className="text-sm text-gray-400">Carboidratos</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-red-500">{selectedRecipe.fat}g</div>
                        <div className="text-sm text-gray-400">Gorduras</div>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-4">Ingredientes</h3>
                  <ul className="space-y-2 mb-6">
                    {selectedRecipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center gap-2 text-gray-300">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Modo de Preparo</h3>
                  <ol className="space-y-3">
                    {selectedRecipe.instructions.map((instruction, index) => (
                      <li key={index} className="flex gap-3">
                        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center text-sm font-bold text-white flex-shrink-0 mt-0.5">
                          {index + 1}
                        </div>
                        <p className="text-gray-300 leading-relaxed">{instruction}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Search and Filters */}
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 mb-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="relative">
                      <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Buscar receitas ou ingredientes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-3 py-2 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedCategory === category
                            ? 'bg-green-600 text-white'
                            : 'bg-gray-800 text-gray-400 hover:text-white'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Recipes Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRecipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    onClick={() => setSelectedRecipe(recipe)}
                    className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-green-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{recipe.image}</div>
                      <h3 className="text-lg font-bold text-white mb-1">{recipe.name}</h3>
                      <span className="text-sm text-green-500 font-medium">{recipe.category}</span>
                    </div>

                    <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {recipe.time} min
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        {recipe.servings}
                      </span>
                      <span className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500" />
                        {recipe.rating}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center text-xs">
                      <div>
                        <div className="font-bold text-green-500">{recipe.calories}</div>
                        <div className="text-gray-500">cal</div>
                      </div>
                      <div>
                        <div className="font-bold text-blue-500">{recipe.protein}g</div>
                        <div className="text-gray-500">prot</div>
                      </div>
                      <div>
                        <div className={`font-bold ${getDifficultyColor(recipe.difficulty)}`}>
                          {recipe.difficulty}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredRecipes.length === 0 && (
                <div className="text-center py-12">
                  <ChefHat className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-400 mb-2">Nenhuma receita encontrada</h3>
                  <p className="text-gray-500">Tente ajustar os filtros ou termo de busca</p>
                </div>
              )}
            </>
          )}
        </>
      )}
    </div>
  )
}