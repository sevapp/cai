import { shelly, loadEnvSync } from '../deps.ts';
import { constructCommitMessageQuery } from '../src/queries/generateCommitMessage.ts';



async function generateCommit(changes: string): Promise<string> {
  const apiKey = Deno.env.get("CHATGPT_API_KEY");

  console.log(apiKey);

  const prompt = constructCommitMessageQuery(changes);

  const response = await fetch(
    'https://api.openai.com/v1/chat/completions',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        'model': 'gpt-3.5-turbo',
        'messages': [{ 'role': 'user', 'content': prompt }],
        'max_tokens': 30,
      }),
    },
  );

  const data = await response.json();
  //   console.log(data);
  return data.choices[0].message.content;
}

// основная функция, которая вызывается при запуске скрипта
async function main() {
  loadEnvSync({
    export: true,
    allowEmptyValues: true,
  });

  const changes = (await shelly(`git diff`)).stdout;
  const commitMessage = await generateCommit(changes);
  //   await executeCommand(`git commit -m "${commitMessage}"`);
  console.log(commitMessage);
}

// вызов основной функции
await main();
