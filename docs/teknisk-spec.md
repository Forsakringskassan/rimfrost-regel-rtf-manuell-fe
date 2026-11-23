# Teknisk spec — RTF Manuell Frontend (RTFF)

## Översikt

Enskild inbäddad vy (Vue 3 + TypeScript, Pinia), exponerad som en module federation-komponent
till handläggarportalen. Ingen egen routing. All data hämtas via `fetch` mot en dedikerad BFF,
ingen websocket/polling.

## Komponentstruktur

```text
src/
├── App.vue                # Rotkomponent, tar emot handlaggningId som prop
├── components/
│   └── ListaDatum.vue      # Formulär: ett beslut per ersättningsperiod
├── stores/                # Pinia: ärendeunderlag, felstatus, laddningsstatus
└── types.ts                # Domänmodell (Kund, Anstallning, Ersattningar)
```

## API-specifikationer

Ingen dedikerad OpenAPI-specifikation för BFF-kontraktet.

| Metod | Sökväg | Beskrivning |
|---|---|---|
| GET | `/api/task/{handlaggningId}` | Hämta ärendeunderlag |
| GET | `/api/uppgiftsbeskrivning/{uppgiftstyp}` | Hämta hjälptext för uppgiftstypen |
| POST | `/api/{handlaggningId}/patchErsattningar` | Skicka beslut och slutföra uppgiften |

### Authorization

Alla anrop går genom `src/utils/bffFetch.ts`, som lägger på `Authorization` (RTFF-NFR-01.3).
Värdet kommer från propen `authorization` på den exponerade komponenten `VardAvHusdjur.vue`,
som portalen sätter till hela headervärdet (i dag `Bearer <typId>:<varde>`, PORT-FR-03.6).
Mikrofrontenden tolkar inte innehållet. Propen läggs i Pinia-storen innan första anropet.
Portalen monterar om komponenten när handläggaren byts eller loggar ut (PORT-FR-03.7).

Saknas token görs inget anrop. Saknas token, eller svarar BFF:en 401, visas
"Kunde inte identifiera dig som handläggare …" i stället för ärendeunderlaget, och ett
tidigare hämtat underlag rensas ur storen (RTFF-NFR-01.4).

Fristående (`npm run dev`/`preview`) finns ingen portal. Då används `VITE_DEV_AUTHORIZATION`
eller `RUNTIME_DEV_AUTHORIZATION` som token.

## Kafka-integration

Ingen. Mikrofrontenden har ingen meddelandeintegration.

## Konfiguration

| Egenskap | Beskrivning | Standardvärde |
|---|---|---|
| `VITE_BFF_URL` | BFF-url vid lokal utveckling | `http://localhost:9002` |
| `RUNTIME_BFF_URL` (`window.__RTF_MANUELL_FE_ENV__`) | BFF-url vid körning i container | — |
| `VITE_DEV_HANDLAGGNING_ID` | Fallback-id vid fristående utvecklingsläge | — |
| `VITE_DEV_AUTHORIZATION` / `RUNTIME_DEV_AUTHORIZATION` | Token (hela headervärdet) vid fristående utvecklingsläge. Ett tomt runtime-värde betyder ingen token | — |

## Liveness

Ingen egen hälsokontroll — statisk frontend, hälsa avgörs av webbservern som serverar den.

## Kända begränsningar och framtida arbete

| Begränsning | Föreslagen åtgärd |
|---|---|
| Kontaktperson och telefonnummer visas som fasta platshållarvärden, inte hämtad data | Koppla in riktiga fält eller ta bort platshållarna |
| Avslag skickas alltid utan avslagsanledning — inget textfält finns för att ange en | Lägg till fält om anledning ska kunna anges |
| Ingen automatiserad testtäckning finns i repot | Inför enhetstester |
| Ingen möjlighet att avbryta eller gå tillbaka från formuläret | Bedöm behov tillsammans med värdapplikationens navigering |
