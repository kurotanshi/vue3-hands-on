const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

export const callOpenAI = async (message) => {
  try {
    // 準備對話訊息
    const messages = [
      {
        role: 'system',
        content: '#zh-tw 你是一個萬能的助理，可以回答任何問題，請用中文回答。'
      },
      {
        role: 'user',
        content: message
      }
    ];

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
        'Content-Type': 'application/json',        
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages,
        max_tokens: 128,
      })
    });

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('Error:', error);
  }
}