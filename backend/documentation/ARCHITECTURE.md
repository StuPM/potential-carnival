# Media Tracker Architecture

## Backend

```
index.ts            # Main Hono app
dev.ts              # Export for development
├── routes/
│   ├── factory.ts  # Generates shared API routes
│   ├── manga.ts    # Generic routes covering all tables
│   ├── films.ts    # Films-specific functions
│   ├── books.ts    # Books-specific functions
│   ├── manga.ts    # Manga-specific functions
├── stats.ts        # Aggregated stats endpoint
├── auth.ts         # Auth routes
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
| `GET`    | `/`    | Return all records of the factory type                |
| `GET`    | `/:id` | Return a single record                                |
| `POST`   | `/`    | Save a new record                                     |
| `PATCH`  | `/:id` | Edit a history record                                 |
| `DELETE` | `/:id` | Delete a history entry; cascade deletes media if last |

---

### `media.ts`

| Method | Path | Description        |
| ------ | ---- | ------------------ |
| `GET`  | `/`  | Return all records |

---

### `films.ts` — Films (TMDB)

| Method | Path      | Description                        |
| ------ | --------- | ---------------------------------- |
| `GET`  | `/search` | Search the TMDB API by film name   |
| `GET`  | `/:id`    | TBC - Return a film by its TMDB ID |

---

### `manga.ts` — Manga (MangaDex)

| Method | Path      | Description                           |
| ------ | --------- | ------------------------------------- |
| `GET`  | `/search` | Search the MangaDex API by Manga name |
| `POST` | `/`       | Save a new record                     |

---

### `books.ts` — Books (TBC)

- Custom hook `POST` to save to Hardcover API and local DB
- Search for a book
- Custom hook `PATCH /review` to also save the review to Hardcover API

---

### `stats.ts`(TBC)

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
