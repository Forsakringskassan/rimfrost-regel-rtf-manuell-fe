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

## Kafka-integration

Ingen. Mikrofrontenden har ingen meddelandeintegration.

## Konfiguration

| Egenskap | Beskrivning | Standardvärde |
|---|---|---|
| `VITE_BFF_URL` | BFF-url vid lokal utveckling | `http://localhost:9002` |
| `RUNTIME_BFF_URL` (`window._env_`) | BFF-url vid körning i container | — |
| `VITE_DEV_HANDLAGGNING_ID` | Fallback-id vid fristående utvecklingsläge | — |

## Liveness

Ingen egen hälsokontroll — statisk frontend, hälsa avgörs av webbservern som serverar den.

## Kända begränsningar och framtida arbete

| Begränsning | Föreslagen åtgärd |
|---|---|
| Kontaktperson och telefonnummer visas som fasta platshållarvärden, inte hämtad data | Koppla in riktiga fält eller ta bort platshållarna |
| Avslag skickas alltid utan avslagsanledning — inget textfält finns för att ange en | Lägg till fält om anledning ska kunna anges |
| Ingen automatiserad testtäckning finns i repot | Inför enhetstester |
| Ingen möjlighet att avbryta eller gå tillbaka från formuläret | Bedöm behov tillsammans med värdapplikationens navigering |
