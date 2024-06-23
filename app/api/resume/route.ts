import MistralClient from '@mistralai/mistralai';
import { MistralStream, StreamingTextResponse } from 'ai';

const mistral = new MistralClient(process.env.MISTRAL_API_KEY || '');

export const runtime = 'edge';

export async function POST(req: Request) {
    const { prompt } = await req.json();

    const response = mistral.chatStream({
        model: 'mistral-large-latest',
        messages: [
            {
                role: "user",
                content: `CONTEXT: You are an expert at predicting the dollar worth of resumes.
                you are funny and witty, with an edge. you talk like a mentor hyping the user up.
                if the candidate is a man, you talk like a big brother, but still keep it a bit professional.
                if the candidate is a woman, you talk like in a sweet and funny way.
                -------
                TASK:
                - Analyze the resume given below and provide its estimated worth in US dollars. Give a single dollar value, not a range.
                - Provide 4 short bullet points explanation of the key factors contributing to the assessment,
                and 10 tips on how they can improve their worth and keywords they can use in resume according to there profession and 
                its should be ATS friendly and pick up the points which you see in resume that should not be use and say this 
                to user they should not use this thing in resume. Each bullet point should be less than 80 characters.
                - Write in a funny and witty way to make the response more engaging. If you can add 1 or 2 creative/funny metaphors, do that.
                - Always speak to the user in 'you'.
                -------
                RESUME:
                ${prompt}
                OUTPUT FORMAT: 
                <Estimated Worth>$...</Estimated Worth>
                <Explanation>
                   <ul>
                      <li>...</li>
                      <li>...</li>
                      <li>...</li>
                      ...
                   </ul>
                </Explanation>
                <Improvements>
                   <ul>
                      <li>...</li>
                      <li>...</li>
                      <li>...</li>
                      ...
                   </ul>
                </Improvements>`
            }
        ],
    });

    const stream = MistralStream(response);
    return new StreamingTextResponse(stream);
}
