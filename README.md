# SoccerStat

Frontend-приложение для просмотра футбольной статистики.

## Технологии

- Vite
- React
- TypeScript

## Быстрый старт

```bash
npm install
cp .env.example .env
npm run dev
```

## Переменные окружения

- `VITE_API_KEY` — токен для запросов к API football-data.org.
- `VITE_API_URL` — базовый URL API для production-сборки.

В dev-режиме запросы идут через proxy `"/api"` (см. `vite.config.ts`).

## Доступные скрипты

```bash
npm run dev
npm run build
npm run preview
npm run lint
```

## Структура проекта

```text
src/
  app/
  pages/
  features/
  entities/
  shared/
    api/
    lib/
    ui/
    types/
    config/
```
