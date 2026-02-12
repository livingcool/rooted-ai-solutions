# 🤖 AI Token Usage Tracking - Complete Overview

## Summary of All AI Models in Use

### ✅ Models Currently Tracked

| Service | Model | Purpose | Tracked | Function(s) |
|---------|-------|---------|---------|-------------|
| **Groq (Text Generation)** | `qwen/qwen3-32b` | Resume analysis, interview analysis, technical analysis | ✅ Yes | analyze-application, analyze-interview, analyze-technical-submission |
| **Groq (Text Generation)** | `qwen-2.5-72b-instruct` | Alternative text model | ✅ Yes | (various) |
| **Groq (Text Generation)** | `llama-3.3-70b-versatile` | Job description enhancement, rejection emails | ✅ Yes | enhance-job-description, generate-rejection |
| **Groq (Text Generation)** | `llama-3.2-90b-vision-preview` | Vision-based analysis (deprecated) | ✅ Yes | conduct-ai-interview |
| **Groq (Transcription)** | `whisper-large-v3` | Audio transcription (interviews, technical demos) | ⚠️ Partial | analyze-interview, analyze-technical-submission, conduct-ai-interview |
| **Groq (Transcription)** | `whisper-large-v3-turbo` | Faster transcription | ⚠️ Partial | assess-interview |

### ❌ Services NOT Currently Used
- **Text-to-Speech (TTS)**: Not implemented yet
- **Image Generation**: Not implemented
- **Embeddings**: Not implemented

---

## 📊 Token Usage Tracking Status by Function

### ✅ **Fully Tracked Functions** (Text Generation)

1. **analyze-application** (Resume Analysis)
   - Model: `qwen/qwen3-32b`
   - Logs: ✅ Input tokens, ✅ Output tokens, ✅ Total

2. **analyze-interview** (Communication Round)
   - Model: `qwen/qwen3-32b`
   - Logs: ✅ Input tokens, ✅ Output tokens, ✅ Total

3. **analyze-technical-submission** (Technical Round)
   - Model: `qwen/qwen3-32b`
   - Logs: ✅ Input tokens, ✅ Output tokens, ✅ Total

4. **analyze-final-interview** (Final Round)
   - Model: `qwen/qwen3-32b`
   - Logs: ✅ Input tokens, ✅ Output tokens, ✅ Total

5. **conduct-ai-interview** (Live AI Interview)
   - Models: `llama-3.2-90b-vision-preview` + `whisper-large-v3`
   - Logs: ✅ Text generation tracked, ⚠️ Whisper not tracked

6. **enhance-job-description** (Job Enhancement)
   - Model: `llama-3.3-70b-versatile`
   - Logs: ✅ Input tokens, ✅ Output tokens, ✅ Total

7. **generate-rejection** (Rejection Email)
   - Model: `llama-3.3-70b-versatile`
   - Logs: ✅ Input tokens, ✅ Output tokens, ✅ Total

8. **generate-technical-projects** (Project Generation)
   - Model: `llama-3.3-70b-versatile`
   - Logs: ✅ Input tokens, ✅ Output tokens, ✅ Total

9. **generate-hiring-report** (Report Generation)
   - Model: `llama-3.3-70b-versatile`
   - Logs: ✅ Input tokens, ✅ Output tokens, ✅ Total

10. **assess-interview** (Old Interview Assessment)
    - Model: `llama-3.3-70b-versatile` + `whisper-large-v3-turbo`
    - Logs: ✅ Text tracked, ⚠️ Whisper not tracked

---

## ⚠️ **Whisper Transcription - Not Fully Tracked**

### Problem:
Groq's Whisper API **does NOT return token usage** in the response. It only provides:
```json
{
  "text": "transcribed text...",
  "duration": 12.5  // ← Only metadata available
}
```

### What Can Be Tracked:
- ✅ **Audio duration** (seconds)
- ✅ **Number of API calls**
- ❌ **Tokens used** (not provided by Groq)

### Groq Whisper Limits:
- **Model**: `whisper-large-v3-turbo`
- **Limit**: 28,800 seconds/day (8 hours)
- **Pricing**: $0.111 per hour = $0.00185/minute

### Current Logging Approach:
Functions calling Whisper **should log**:
- `provider`: "groq"
- `model`: "whisper-large-v3" or "whisper-large-v3-turbo"
- `input_tokens`: `<audio_duration_seconds>` (stored as "tokens" for compatibility)
- `output_tokens`: `<character_count_of_transcription>`
- `function_name`: e.g., "analyze-interview"

**Status**: ❌ Not consistently logged across all functions

---

## 💰 Cost Estimation

### Current Pricing (Groq - Free Tier Limits)

#### Text Generation Models:
| Model | Rate Limit (Tokens/Day) | Pricing (Free) |
|-------|-------------------------|----------------|
| `qwen/qwen3-32b` | 500,000 | FREE (with limits) |
| `llama-3.3-70b-versatile` | 6,000 tokens/min | FREE (with limits) |
| `llama-3.2-90b-vision` | 6,000 tokens/min | FREE (with limits) |

#### Transcription:
| Model | Rate Limit | Pricing |
|-------|-----------|---------|
| `whisper-large-v3` | 15 req/min | FREE |
| `whisper-large-v3-turbo` | 28,800 sec/day | FREE |

**Note**: Groq's free tier is generous but has daily limits. Exceeding limits may require paid plan.

---

## 📈 Current Dashboard Features

The **TokenUsageStats** component displays:

✅ **Total tokens used** (input + output)
✅ **Cost estimation** (based on pricing model)
✅ **Provider filtering** (Groq/Google)
✅ **Model breakdown** (per model usage)
✅ **Real-time updates** (via Supabase realtime)
✅ **Groq daily limits display** for:
   - `qwen/qwen3-32b`: 500K tokens/day
   - `whisper-large-v3-turb`: 28,800 sec/day

❌ **NOT showing**:
- Whisper transcription metrics (duration, API calls)
- Per-function breakdown
- Historical trends/charts

---

## 🎯 Recommended Improvements

### 1. **Add Whisper Tracking**
Create a separate logger for transcription:
```typescript
await supabaseAdmin.from('ai_usage_logs').insert({
    provider: 'groq',
    model: 'whisper-large-v3',
    input_tokens: audioDurationSeconds,  // Use seconds as "tokens"
    output_tokens: transcription.length,  // Character count
    total_tokens: audioDurationSeconds + transcription.length,
    function_name: 'analyze-interview',
    status: 'success'
});
```

### 2. **Add Per-Function Dashboard**
Show token usage grouped by function name:
- Resume Analysis: X tokens
- Communication Round: Y tokens
- Technical Round: Z tokens

### 3. **Add Historical Charts**
- Daily token usage over time
- Cost trends
- Model usage distribution

### 4. **Add Alerts**
- Warning when approaching daily limits (80%, 90%)
- Email notification when limit exceeded

### 5. **Add Cost Breakdown**
- Cost per candidate
- Cost per hiring funnel stage
- Monthly burn rate projection

---

## 🚀 Quick Implementation: Add Whisper Logging

To add Whisper logging to all transcription calls, use this pattern:

```typescript
// After successful transcription
if (transJson.text) {
    const audioDuration = videoBlob.size / 16000; // Estimate (adjust as needed)
    try {
        await supabaseAdmin.from('ai_usage_logs').insert({
            provider: 'groq',
            model: 'whisper-large-v3',
            input_tokens: Math.round(audioDuration),  // Audio duration in seconds
            output_tokens: transJson.text.length,     // Transcription length
            total_tokens: Math.round(audioDuration) + transJson.text.length,
            function_name: 'analyze-interview',
            status: 'success'
        });
    } catch (e) {
        console.warn('Failed to log Whisper usage:', e);
    }
}
```

---

## 📊 Database Schema (ai_usage_logs)

```sql
CREATE TABLE ai_usage_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    provider TEXT NOT NULL,           -- 'groq', 'google', etc.
    model TEXT NOT NULL,               -- 'qwen/qwen3-32b', 'whisper-large-v3', etc.
    input_tokens INTEGER NOT NULL,     -- Input tokens (or audio seconds for Whisper)
    output_tokens INTEGER NOT NULL,    -- Output tokens (or transcription chars)
    total_tokens INTEGER NOT NULL,     -- Sum of above
    function_name TEXT NOT NULL,       -- Edge function name
    status TEXT NOT NULL               -- 'success' or 'error'
);
```

---

## 🎓 Summary

**You are currently tracking:**
- ✅ All text generation models (10+ functions)
- ✅ Token counts (input/output/total)
- ✅ Cost estimation
- ✅ Real-time dashboard

**Missing tracking:**
- ❌ Whisper transcription metrics (audio duration, total time used toward daily limit)
- ❌ Per-function analytics
- ❌ Historical trends

**Would you like me to:**
1. Add comprehensive Whisper logging to all functions?
2. Enhance the dashboard with charts and per-function breakdown?
3. Add daily limit warnings/alerts?
4. Create a detailed cost analysis report?

Let me know which improvements you'd like me to implement! 🚀
