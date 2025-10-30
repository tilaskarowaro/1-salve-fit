import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { prompt } = body

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt é obrigatório' },
        { status: 400 }
      )
    }

    // Configuração para DeepSeek API
    const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY
    const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions'

    if (!DEEPSEEK_API_KEY) {
      return NextResponse.json(
        { error: 'Chave da API DeepSeek não configurada' },
        { status: 500 }
      )
    }

    const response = await fetch(DEEPSEEK_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [
          {
            role: 'system',
            content: 'Você é um nutricionista especializado em cálculo de necessidades calóricas. Forneça respostas precisas, científicas e personalizadas baseadas nos dados fornecidos. Sempre comece sua resposta com o número exato de calorias recomendadas.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
        stream: false
      }),
    })

    if (!response.ok) {
      let errorMessage = 'Erro na consulta à IA'

      try {
        const errorData = await response.json()
        errorMessage = errorData.message || errorMessage
      } catch {
        errorMessage = `Erro ${response.status}: ${response.statusText}`
      }

      console.error('Erro da API DeepSeek:', errorMessage)
      return NextResponse.json(
        { error: errorMessage },
        { status: response.status }
      )
    }

    const data = await response.json()

    // Validar se os dados esperados existem
    if (!data || typeof data !== 'object') {
      return NextResponse.json(
        { error: 'Resposta inválida da IA' },
        { status: 500 }
      )
    }

    if (!data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
      return NextResponse.json(
        { error: 'Resposta da IA não contém choices válidas' },
        { status: 500 }
      )
    }

    if (!data.choices[0].message || !data.choices[0].message.content) {
      return NextResponse.json(
        { error: 'Resposta da IA não contém conteúdo válido' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      response: data.choices[0].message.content,
      usage: data.usage
    })

  } catch (error) {
    console.error('Erro na API de nutrição:', error)
    const errorMessage = error instanceof Error ? error.message : 'Erro interno do servidor'
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    )
  }
}