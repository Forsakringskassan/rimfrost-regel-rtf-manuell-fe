# RTF Manual Rule - Micro Frontend

This is a **Micro Frontend** for handling RTF manual rules in the Rimfrost task management system. It's loaded dynamically by the host frontend via Module Federation.

## System Architecture

### Communication Flow

This micro-frontend operates within a larger ecosystem:

```
[Host FE (Portal)] ←→ [Portal BFF] ←→ [Backend Services]
        ↓ (Module Federation)
[Micro FE (This App)] ←→ [Rule BFF] ←→ [Backend Services]
```

**Integration Flow:**

1. **Host Integration**: Loaded by host frontend when user selects RTF manual task
2. **Props Received**: Gets `handlaggningId` and `regeltyp` from host
3. **Data Fetching**: Calls Rule BFF at `/api/regel/rtf-manuell/:handlaggningId`
4. **Fallback Handling**: Rule BFF handles all backend failures with mock data
5. **State Management**: Uses Pinia store for local component state

### Module Federation

**Exposed Components:**

- `./VardAvHusdjur` - Main RTF manual rule component

**Consumed by:** rimfrost-portal-handlaggare via remote entry at port 3031

## Fallback Strategy

**No Frontend Fallbacks:**
This micro-frontend contains NO fallback logic - all data resilience is handled by the Rule BFF:

- ✅ Rule BFF auto-falls back to mock RTF data
- ✅ Development: Seamless offline development
- ✅ Production: Clean error handling
- ❌ No environment variables for mock data in frontend
- ❌ No conditional logic based on data availability

## Development

### Prerequisites

- Node.js 18+
- Rule BFF running on port 9002

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

**Standalone Testing:**
Run at `http://localhost:3032` with mock data via App.vue

**Integrated Testing:**
Run host frontend which will load this via Module Federation

### Environment Variables

```env
# Development (.env)
VITE_BFF_URL=http://localhost:9002
```

In Docker containers, set `RUNTIME_BFF_URL` instead — it is injected into `window._env_` at startup by `env.sh` and takes precedence over the build-time value.

## Docker

```bash
docker build -t rimfrost-rtf-manuell-fe .
docker run -p 8080:8080 \
  -e RUNTIME_BFF_URL=https://rtf-manuell-bff.example.com \
  rimfrost-rtf-manuell-fe
```

| Variable | Purpose |
|---|---|
| `RUNTIME_BFF_URL` | URL of the RTF Manuell BFF, as seen from the **browser** |

## Tech Stack

- Vue 3 + TypeScript
- Vite with Module Federation
- Pinia for state management
- FKUI design system
- Integrated with Rule BFF for data
