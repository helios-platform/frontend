// import dotenv from 'dotenv';
// dotenv.config();

async function fetchOpenAIOutput(prompt: string): Promise<any> {
  const endpoint = 'https://api.openai.com/v1/chat/completions';
  const method = 'POST';
  const headers = {
    Authorization: `Bearer`,
    'Content-Type': 'application/json',
  };

  const body = JSON.stringify({
    messages: [
      {
        role: 'system',
        content:
          'You are to take in a table of error data for input. Then provide a precise informative summary of the errors',
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
    max_tokens: 500,
    model: 'gpt-4o',
  });

  try {
    const response = await fetch(endpoint, {
      method,
      headers,
      body,
    });

    // if (!response.ok) {
    // throw new Error(`HTTP error, response status is ${response.status}`);
    // }

    const data = await response.json();
    console.log(data);
    return data.choices[0].message.content;
  } catch (error) {
    console.log(error);
  }
}

export default fetchOpenAIOutput;