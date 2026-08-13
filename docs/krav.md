# Krav — RTF Manuell Frontend (RTFF)

## Bakgrund och syfte

RTF Manuell Frontend är en mikrofrontend som implementerar handläggarens manuella granskningsformulär för ärendetypen "kontrollera frånvaro från arbete" inom RTF-flödet. För varje ersättningsperiod en kund begärt ersättning för under en period av anställning tar handläggaren ställning till om ersättningen ska godkännas eller avslås, och avslutar därefter uppgiften. Den finns för att en handläggare ska kunna hantera denna specifika uppgiftstyp direkt i handläggarportalen, utan att lämna den.

---

## Intressenter och aktörer

| Aktör | Roll |
|---|---|
| Handläggare | Enda användarrollen; granskar och beslutar om ersättningsperioder |
| Handläggarportalen (värdapplikation) | Laddar in denna mikrofrontend och förmedlar uppgiftens identifierare |
| RTF Manuell BFF | Enda bakomliggande tjänst denna mikrofrontend anropar |

---

## Funktionella krav

### RTFF-FR-01 — Visa ärendeunderlag

- **RTFF-FR-01.1** Vid öppning av uppgiften ska gränssnittet hämta och visa kundens
  anställnings- och ersättningsunderlag för den angivna handläggningen.
- **RTFF-FR-01.2** Gränssnittet ska visa varje ersättningsperiod med tidsintervall och
  omfattning, oavsett tidigare beslutsstatus.
- **RTFF-FR-01.3** Om underlaget inte kan hämtas ska ett tydligt felmeddelande visas istället
  för formuläret.
- **RTFF-FR-01.4** Handläggaren ska kunna öppna en hjälptext som beskriver uppgiftstypen.

### RTFF-FR-02 — Besluta om ersättningsperioder

- **RTFF-FR-02.1** Handläggaren ska för varje ersättningsperiod kunna välja mellan godkänd
  eller avslag.
- **RTFF-FR-02.2** Ett beslut ska krävas för samtliga visade ersättningsperioder innan uppgiften
  kan slutföras.
- **RTFF-FR-02.3** Vid slutförande ska samtliga beslut skickas till bakomliggande tjänst i ett
  och samma anrop.
- **RTFF-FR-02.4** Om slutförandet misslyckas ska handläggaren informeras och uppgiften ska
  förbli öppen för ett nytt försök.
- **RTFF-FR-02.5** Vid lyckat slutförande ska handläggarportalen meddelas att uppgiften är klar,
  så att den kan tas bort från handläggarens uppgiftslista.

---

## Icke-funktionella krav

### RTFF-NFR-01 — Integrerbarhet

- **RTFF-NFR-01.1** Mikrofrontenden ska kunna laddas in dynamiskt i handläggarportalen och ta
  emot uppgiftens identifierare som indata från värdapplikationen.
- **RTFF-NFR-01.2** All backup mot bakomliggande tjänst (t.ex. reservdata vid otillgänglighet)
  ska hanteras av RTF Manuell BFF, inte av denna mikrofrontend.

---

## API-gränssnitt (översikt)

| API | Målgrupp | Specifikationsartefakt |
|---|---|---|
| RTF Manuell BFF REST-API | Denna mikrofrontend | Ingen dedikerad OpenAPI-specifikation för BFF-kontraktet |

---

## Integration med RTF Manuell BFF

Mikrofrontenden talar uteslutande med sin dedikerade BFF. Den har ingen kännedom om
bakomliggande regeltjänst eller ramverk — allt sådant döljs av BFF:n.
