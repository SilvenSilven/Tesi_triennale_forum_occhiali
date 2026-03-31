# Fashion Enthusiasts — Forum & Community

Progetto accademico fittizio per una tesi di laurea in Marketing.  
Un forum/community dedicato al mondo della moda, con focus operativo sulla sezione **Occhiali da Sole**.

> **Nota**: tutti i contenuti, brand e prodotti sono fittizi. Nessun brand reale è associato a questa piattaforma.

---

## Panoramica del Progetto.

Fashion Enthusiasts è una piattaforma forum-style che simula una community italiana di appassionati di moda. Il sito:

- Mostra **8 categorie fashion** (Occhiali da Sole, Scarpe, Borse, Abbigliamento, Streetwear, Accessori, Tendenze & Styling, Lusso vs Accessibile)
- Solo la sezione **Occhiali da Sole** è attiva e navigabile
- Le altre sezioni sono visibili ma **non cliccabili** (contrassegnate come "In arrivo")
- Il forum è **attualmente vuoto per design** — pronto per essere popolato in una fase successiva
- I contenuti verranno inseriti automaticamente da un **cron job esterno** che scrive nel database Neon

---

## Stack Tecnologico

| Tecnologia | Scopo |
|---|---|
| **Next.js 16** | Framework React con App Router e SSR |
| **TypeScript** | Type safety |
| **Tailwind CSS 4** | Styling utility-first |
| **Prisma 7** | ORM per PostgreSQL |
| **Neon PostgreSQL** | Database cloud (esterno) |

---

## Variabili d'Ambiente

Copia `.env.example` in `.env` e configura le variabili:

```env
# Connection string per il runtime dell'app (connessione pooled)
DATABASE_URL="postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require"

# Connection string diretta per le migrazioni Prisma (bypassa il connection pooler)
DIRECT_URL="postgresql://USER:PASSWORD@HOST/DATABASE?sslmode=require"
```

### Come ottenere le credenziali Neon

1. Crea un account su [neon.tech](https://neon.tech)
2. Crea un nuovo progetto e un database
3. Copia le connection string dal pannello di controllo Neon
4. **DATABASE_URL**: usa la connection string pooled
5. **DIRECT_URL**: usa la connection string diretta (senza `-pooler`)

> **Importante**: il database Neon deve essere creato manualmente. Questa applicazione NON crea né gestisce il database.

---

## Installazione e Avvio

### Prerequisiti
- Node.js 18+
- npm
- Un database PostgreSQL su Neon (creato esternamente)

### Passi

```bash
# 1. Installa le dipendenze
npm install

# 2. Configura le variabili d'ambiente
cp .env.example .env
# Modifica .env con le tue credenziali Neon

# 3. Genera il client Prisma
npx prisma generate

# 4. Applica lo schema al database Neon
npx prisma db push

# 5. (Opzionale) Inserisci i dati strutturali minimi (categorie + impostazioni forum)
npm run prisma:seed

# 6. Avvia il server di sviluppo
npm run dev
```

Il sito sarà disponibile su `http://localhost:3000`.

### Script disponibili

| Script | Comando | Descrizione |
|---|---|---|
| `dev` | `npm run dev` | Avvia il server di sviluppo |
| `build` | `npm run build` | Build di produzione |
| `start` | `npm run start` | Avvia il server di produzione |
| `prisma:generate` | `npm run prisma:generate` | Genera il client Prisma |
| `prisma:migrate` | `npm run prisma:migrate` | Esegue le migrazioni |
| `prisma:push` | `npm run prisma:push` | Push dello schema al DB |
| `prisma:seed` | `npm run prisma:seed` | Seed dei dati strutturali |
| `prisma:studio` | `npm run prisma:studio` | Apri Prisma Studio |

---

## Struttura del Progetto

```
forum_occhiali/
├── prisma/
│   ├── schema.prisma          # Schema del database
│   └── seed.ts                # Seed strutturale (solo categorie e impostazioni)
├── prisma.config.ts           # Configurazione Prisma per Neon
├── src/
│   ├── app/                   # Pages (App Router)
│   │   ├── page.tsx           # Homepage
│   │   ├── layout.tsx         # Layout globale
│   │   ├── globals.css        # Stili globali
│   │   ├── categorie/         # Directory categorie
│   │   ├── cerca/             # Pagina ricerca
│   │   ├── dashboard/         # Dashboard admin
│   │   └── occhiali-da-sole/  # Sezione attiva
│   │       ├── page.tsx       # Lista discussioni
│   │       ├── thread/[id]/   # Dettaglio discussione
│   │       ├── prodotti/      # Lista e dettaglio prodotti
│   │       ├── brand/         # Lista e dettaglio brand
│   │       └── confronta/     # Area confronto
│   ├── components/
│   │   ├── layout/            # Header, Footer, Breadcrumb
│   │   └── ui/                # Componenti riutilizzabili
│   ├── generated/prisma/      # Client Prisma generato
│   └── lib/                   # Utility e configurazione
│       ├── prisma.ts          # Singleton Prisma client
│       ├── categories.ts      # Definizioni categorie
│       └── utils.ts           # Funzioni helper
├── .env.example               # Template variabili d'ambiente
├── package.json
└── tsconfig.json
```

---

## Pagine e Routing

| Route | Descrizione |
|---|---|
| `/` | Homepage con hero, categorie, widget empty-state |
| `/categorie` | Directory di tutte le categorie (attive e disabilitate) |
| `/occhiali-da-sole` | Categoria attiva: lista discussioni con sorting/filtri |
| `/occhiali-da-sole/thread/[id]` | Dettaglio discussione (template) |
| `/occhiali-da-sole/prodotti` | Catalogo prodotti occhiali da sole |
| `/occhiali-da-sole/prodotti/[id]` | Dettaglio prodotto con recensioni |
| `/occhiali-da-sole/brand` | Lista brand |
| `/occhiali-da-sole/brand/[slug]` | Dettaglio brand |
| `/occhiali-da-sole/confronta` | Area confronto prodotti |
| `/cerca` | Ricerca nel forum |
| `/dashboard` | Dashboard con statistiche |

---

## Categorie Disabilitate

Le categorie non attive (Scarpe, Borse, Abbigliamento, ecc.) sono implementate con:

1. **Campo `status`** nel modello `Category` del database (`ACTIVE`, `DISABLED`, `COMING_SOON`, `ARCHIVED`)
2. **Definizione statica** in `src/lib/categories.ts` per il rendering UI
3. **Componente `CategoryCard`**: controlla lo stato e:
   - Se `ACTIVE`: rendering come link cliccabile (`<Link>`)
   - Se non attivo: rendering come `<div>` con `aria-disabled="true"`, `cursor-not-allowed`, opacità ridotta
4. **Badge visivo** (`StatusBadge`): mostra "Attivo", "In arrivo", "Non disponibile" o "Archiviato"
5. Le categorie disabilitate **non hanno routing** — nessuna pagina esiste per `/scarpe`, `/borse`, ecc.

---

## Preparazione per Contenuti Futuri

L'architettura è progettata per supportare l'inserimento automatico di contenuti:

### Flusso previsto
1. Un **cron job esterno** (non incluso in questo progetto) scrive nel database Neon una volta al giorno
2. Il cron inserisce: thread, post, commenti, prodotti, brand, recensioni
3. Il sito legge dal database e renderizza i contenuti dinamicamente
4. Quando il database è vuoto, il sito mostra **empty-state** eleganti in italiano

### Modelli del database pronti per la popolazione
- **User**: utenti fittizi creati dal cron
- **Thread**: discussioni con titolo, contenuto, autore, categoria
- **Post**: risposte alle discussioni (con nesting tramite `parentId`)
- **Brand**: marchi di occhiali da sole
- **Product**: prodotti con prezzo, brand, categoria
- **Review**: recensioni con valutazione 1-5
- **Tag**: etichette per thread e prodotti
- **ProductPriceHistory**: storico prezzi

### Nessun contenuto è pre-caricato
Il seed (`prisma/seed.ts`) inserisce solo:
- Le 8 categorie del forum con relativo stato (attivo/coming_soon)
- Le impostazioni base del forum (nome, descrizione, lingua)

---

## HTML Scrapeable

Il markup HTML è progettato per facilitare lo scraping futuro con Python:

- Tag semantici: `<article>`, `<section>`, `<time>`, `<nav>`
- Attributi `data-*` su componenti chiave:
  - `data-component` (tipo di componente)
  - `data-category`, `data-thread-slug`, `data-product-slug`, `data-brand-slug`
  - `data-author`, `data-price`, `data-rating`, `data-tag`
  - `data-status`, `data-stat`
- Paginazione con link `rel="prev"` / `rel="next"`
- Breadcrumb con markup Schema.org
- Rendering SSR per accessibilità dei contenuti senza JavaScript

---

## Integrazione con Neon

- L'app si connette a Neon tramite `DATABASE_URL` (variabile d'ambiente)
- La connessione usa `@prisma/adapter-pg` per Prisma 7
- Le migrazioni usano `DIRECT_URL` (connessione diretta, non pooled) tramite `prisma.config.ts`
- Il database **non viene creato** da questa applicazione
- Il database **deve esistere** prima di eseguire `prisma db push`

---

## Licenza

Progetto accademico — solo per uso didattico e di ricerca.
