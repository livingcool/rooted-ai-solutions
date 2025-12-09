// AI Token Usage Logging Utilities
// Use these helpers in Supabase Edge Functions to track AI usage

import { SupabaseClient } from 'https://esm.sh/@supabase/supabase-js@2';

/**
 * Log text generation (chat completion) usage
 */
export async function logTextGeneration(
    supabase: SupabaseClient,
    provider: string,
    model: string,
    usage: {
        prompt_tokens?: number;
        completion_tokens?: number;
        total_tokens?: number;
    },
    functionName: string,
    status: 'success' | 'error' = 'success'
) {
    try {
        await supabase.from('ai_usage_logs').insert({
            provider,
            model,
            input_tokens: usage.prompt_tokens || 0,
            output_tokens: usage.completion_tokens || 0,
            total_tokens: usage.total_tokens || 0,
            function_name: functionName,
            status
        });
    } catch (e) {
        console.warn('Failed to log text generation usage:', e);
    }
}

/**
 * Log Whisper transcription usage
 * Since Groq doesn't return token usage for Whisper, we track:
 * - input_tokens: audio duration in seconds
 * - output_tokens: transcription character count
 */
export async function logWhisperTranscription(
    supabase: SupabaseClient,
    model: string,
    audioDurationSeconds: number,
    transcriptionText: string,
    functionName: string,
    status: 'success' | 'error' = 'success'
) {
    try {
        const charCount = transcriptionText.length;
        await supabase.from('ai_usage_logs').insert({
            provider: 'groq',
            model,
            input_tokens: Math.round(audioDurationSeconds),  // Audio duration
            output_tokens: charCount,                         // Transcription length
            total_tokens: Math.round(audioDurationSeconds) + charCount,
            function_name: functionName,
            status,
            metadata: {
                audio_duration_seconds: audioDurationSeconds,
                transcription_characters: charCount,
                type: 'transcription'
            }
        });
    } catch (e) {
        console.warn('Failed to log Whisper usage:', e);
    }
}

/**
 * Estimate audio duration from blob size
 * Assumes 16kHz sample rate, which is standard for Whisper
 */
export function estimateAudioDuration(audioBlob: Blob): number {
    // 16kHz = 16,000 samples/sec, 2 bytes per sample (16-bit)
    // So ~32,000 bytes per second
    const bytesPerSecond = 32000;
    return audioBlob.size / bytesPerSecond;
}

/**
 * Calculate cost for text generation
 */
export function calculateTextCost(
    provider: string,
    inputTokens: number,
    outputTokens: number
): number {
    const PRICING: Record<string, { input: number; output: number }> = {
        'groq': { input: 0.59 / 1000000, output: 0.79 / 1000000 },
        'google': { input: 0.075 / 1000000, output: 0.30 / 1000000 }
    };

    const rates = PRICING[provider] || { input: 0, output: 0 };
    return (inputTokens * rates.input) + (outputTokens * rates.output);
}

/**
 * Calculate cost for Whisper transcription
 * Groq Whisper: $0.111 per hour = $0.00185 per minute = $0.00003083 per second
 */
export function calculateWhisperCost(durationSeconds: number): number {
    const COST_PER_SECOND = 0.00003083;
    return durationSeconds * COST_PER_SECOND;
}
