# Bodies in Motion — Dance Photography Archive

Dark-mode-first editorial archive for Martin Jaramillo’s dance photography, designed as a movement-based web experience.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Framer Motion
- Fuse.js (fuzzy matching)
- Sharp (image optimization)

## Folder assumptions

The project expects this structure one level above `site/`:

```txt
Terpsichore/
  Lamentation/
  Nobody01100011/
  TableTalk/
  Espinita/
  ...
  site/
```

## Setup

```bash
cd site
npm install
```

## Data pipeline

### 1) Manually curate program metadata

Edit:

- `src/data/program.json`

Each piece includes title, company, credits, notes, day/date, and venue.

### 2) Photo indexing + fuzzy matching

```bash
npm run index-photos
```

Generates:

- `src/data/program.json` (updated with folder match + status + photo paths)
- `src/data/photoIndex.json`
- `src/data/unmatched.json`
- `data/program.json`
- `data/photoIndex.json`
- `data/unmatched.json`
- optimized images in `public/photos/`

Matching strategy:

1. exact title
2. normalized title
3. Fuse.js fuzzy match
4. `src/data/manualMap.json`
5. synthetic fallback piece + warning

Warnings include:

- photo folder with no program match
- program piece with no photo folder

### 3) Full data build

```bash
npm run build-data
```

Runs photo indexing using your curated program data.

## Run website

```bash
npm run dev
```

Then open `http://localhost:3000`.

## Pages

- `/` home
- `/event` event overview + search/filter
- `/day/friday`
- `/day/saturday`
- `/day/sunday`
- `/piece/[slug]`
- `/about`

## Notes

- Any piece is shown in the gallery as soon as photos exist.
- Lightbox supports keyboard navigation and mobile swipe.
- Reduced-motion users get minimal transitions.
