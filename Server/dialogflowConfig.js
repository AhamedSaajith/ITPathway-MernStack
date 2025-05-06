import dialogflow from '@google-cloud/dialogflow';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const projectId = process.env.DIALOGFLOW_PROJECT_ID;
const keyFilePath = path.join(__dirname, 'dialogflow-credentials.json');

if (!projectId) {
    throw new Error('DIALOGFLOW_PROJECT_ID environment variable is not set');
}

process.env.GOOGLE_APPLICATION_CREDENTIALS = keyFilePath;

const sessionClient = new dialogflow.SessionsClient();

export async function detectIntent(query, sessionId, context = []) {
    if (!query) {
        throw new Error('Query parameter is required');
    }

    const sessionPath = `projects/${projectId}/agent/sessions/${sessionId}`;

    try {
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: query,
                    languageCode: 'en-US',
                },
            },
            queryParams: {
                contexts: context, // Pass previous context
            },
        };

        const responses = await sessionClient.detectIntent(request);
        const result = responses[0].queryResult;

        return {
            reply: result.fulfillmentText || "I didn't understand that.",
            intent: result.intent?.displayName || "Unknown",
            confidence: result.intentDetectionConfidence || 0,
            context: result.outputContexts || [], // Return updated context
        };
    } catch (error) {
        console.error('Error detecting intent:', error);
        throw error;
    }
}
