# Media Tracker Architecture

## Backend

```
index.ts              # Main Hono app
├── factory.ts        # Generates shared API routes
├── adapters/
│   ├── films.adapter.ts  # Films-specific functions
│   ├── books.adapter.ts  # Books-specific functions (TBC)
│   ├── manga.adapter.ts  # Manga-specific functions (MyAnimeList)
├── stats.ts          # Aggregated stats endpoint
├── auth.ts           # Auth routes
├── middleware/
│   ├── auth.ts       # JWT verification
│   └── rateLimit.ts
├── lib/
│   ├── db.ts         # Database connection (Neon or D1)
│   ├── imdb.ts       # TMDB fetch helper
│   └── openlibrary.ts # Book metadata fetcher
├── types.ts
├── utils.ts
└── tests/
    ├── films.test.ts
    └── books.test.ts
```

---

### `factory.ts` — Shared Routes

| Method   | Path   | Description                                           |
| -------- | ------ | ----------------------------------------------------- |
| `GET`    | `/`    | Return all records                                    |
| `GET`    | `/:id` | Return a single record                                |
| `POST`   | `/`    | Save a new record                                     |
| `PATCH`  | `/:id` | Edit a history record                                 |
| `DELETE` | `/:id` | Delete a history entry; cascade deletes media if last |

---

### `films.adapter.ts` — Films

| Method | Path      | Description                      |
| ------ | --------- | -------------------------------- |
| `GET`  | `/search` | Search the TMDB API by film name |
| `GET`  | `/:id`    | Return a film by its TMDB ID     |

---

### `books.adapter.ts` — Books (TBC)

- Custom hook `POST` to save to Hardcover API and local DB
- Search for a book
- Custom hook `PATCH /review` to also save the review to Hardcover API

---

### `manga.adapter.ts` — Manga (MyAnimeList)

- Fetch manga details from MyAnimeList API
- Custom hook `POST` to save to MyAnimeList and local DB

---

### `stats.ts`

| Method | Path     | Description                                         |
| ------ | -------- | --------------------------------------------------- |
| `GET`  | `/stats` | Films per month, top genres, totals, average rating |

---

### `auth.ts`

| Method | Path              | Description    |
| ------ | ----------------- | -------------- |
| `POST` | `/signup`         | Register       |
| `GET`  | `/reset-password` | Reset password |
| `POST` | `/login`          | Login          |
