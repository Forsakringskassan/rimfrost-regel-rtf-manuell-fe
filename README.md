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

**Consumed by:** rimfrost-portal-handlaggare via `mf-manifest.json` at port 3031

### Registration with the Portal

This micro frontend is registered in the portal's `public/route-manifest.json`:

```json
{
  "routes": {
    "rtf-manuell": {
      "scope": "remoteApp",
      "module": "VardAvHusdjur",
      "devEntry": "http://localhost:3031/mf-manifest.json",
      "prodEntry": "https://your-prod-url.example.com/mf-manifest.json"
    }
  }
}
```

Updating this entry is the **only** change needed to register or update the remote — no portal rebuild required in any environment. The portal fetches the manifest at runtime and loads the remote dynamically via `@module-federation/vite`.

In **development**, start this app's dev server and refresh the portal. No changes to `loadRemoteModule.ts`, `federation.d.ts`, or any other portal source file are needed.

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
Run at `http://localhost:3031` with mock data via App.vue

**Integrated Testing:**
Run host frontend which will load this via Module Federation

### Environment Configuration

Config is split between local development and container deployments.

**Local development** — set in `.env`, baked into the bundle at build time:

```env
VITE_BFF_URL=http://localhost:9002
VITE_DEV_HANDLAGGNING_ID=<a handlaggningId from OUL, for standalone dev testing>
```

**Docker (local image testing)** — mount a `runtime-config.js` file:

```js
window._env_ = {
  "RUNTIME_BFF_URL": "http://your-bff-url"
};
```

```bash
docker run -p 8080:8080 \
  -v ./runtime-config.js:/usr/local/apache2/htdocs/runtime-config.js \
  your-image-name
```

**OpenShift (production)** — create a ConfigMap and mount it with `subPath`:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: rtf-manuell-config
data:
  runtime-config.js: |
    window._env_ = {
      "RUNTIME_BFF_URL": "https://your-bff.internal.example.com"
    };
```

```yaml
# In your Deployment:
volumeMounts:
  - name: runtime-config
    mountPath: /usr/local/apache2/htdocs/runtime-config.js
    subPath: runtime-config.js
volumes:
  - name: runtime-config
    configMap:
      name: rtf-manuell-config
```

| Variable | Dev (`.env`) | Container (`runtime-config.js`) | Description |
|---|---|---|---|
| BFF URL | `VITE_BFF_URL` | `RUNTIME_BFF_URL` | Rule BFF base URL |
| Dev handler ID | `VITE_DEV_HANDLAGGNING_ID` | — | Fallback `handlaggningId` for standalone dev testing only |

## Tech Stack

- Vue 3 + TypeScript
- Vite with `@module-federation/vite`
- Pinia for state management
- FKUI design system
- Integrated with Rule BFF for data
