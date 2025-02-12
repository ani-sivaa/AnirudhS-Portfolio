export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface ChatResponse {
  session_id: string;
  response: string;
}

export const sendMessage = async (
  message: string, 
  language: string,
  sessionId?: string
): Promise<ChatResponse> => {
  const API_URL = process.env.NODE_ENV === 'production' 
    ? 'https://www.kyounginn.com/api/chat/message/'
    : 'http://localhost:8000/api/chat/message/';

  console.log('API 요청 URL:', API_URL);
  console.log('요청 데이터:', { message, session_id: sessionId, language });
  
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      session_id: sessionId,
      language,
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    console.error('서버 에러:', errorData);
    throw new Error('Failed to send message');
  }

  return response.json();
}; 