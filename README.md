# SoccerStat

Веб-приложение для просмотра футбольной статистики на базе `football-data.org`.

## Что реализовано

- Список лиг с поиском и пагинацией
- Список команд с поиском и пагинацией
- Календарь матчей лиги
- Календарь матчей команды
- Фильтрация матчей по диапазону дат (`dateFrom` / `dateTo`)
- Локализация времени: преобразование `UTC -> local timezone` пользователя
- Обработка ошибок API:
  - `429` (rate limit)
  - сетевые ошибки
  - пустые состояния (пустой список / ничего не найдено)
- Адаптивная верстка под mobile / tablet / desktop (portrait + landscape)

## Технологический стек

- `React` + `TypeScript`
- `Vite`
- `React Router`
- `ESLint` + `Prettier`
- `CSS Modules`

## Роуты

- `/leagues` — список лиг
- `/leagues/:leagueId/matches` — календарь лиги
- `/teams` — список команд
- `/teams/:teamId/matches` — календарь команды

## Быстрый старт

```bash
npm install
cp .env.example .env
npm run dev
```
## Переменные окружения

- `VITE_API_KEY` — токен API `football-data.org`
- `VITE_API_URL` — base URL API для production-сборки

Пример:

```dotenv
VITE_API_KEY=your_football_data_api_token
VITE_API_URL=https://api.football-data.org/v4
```

В режиме разработки используется прокси `"/api"` через `vite.config.ts`.

## Скрипты

```bash
npm run dev          # запуск dev-сервера
npm run build        # production build
npm run preview      # предпросмотр production build
npm run lint         # проверка ESLint
npm run lint:fix     # автоисправление ESLint
npm run format       # форматирование Prettier
npm run format:check # проверка форматирования
```

## Архитектура (кратко)

```text
src/
  app/                # роутер, layout
  pages/              # страницы
  shared/
    api/              # API-клиент и сервисы
    config/           # env-конфиг
    consts/           # общие константы (page size и т.д.)
    lib/              # утилиты (форматирование дат, ошибки API)
    types/            # TypeScript-типы
    ui/               # переиспользуемые компоненты UI
```

## Особенности API

- Источник данных: `football-data.org/v4`
- Для всех запросов передается заголовок `X-Auth-Token`
- В календарях общее количество записей берется из `resultSet.count` (если доступно), иначе fallback на `matches.length`

## Проверка перед коммитом

```bash
npm run lint
npm run build
```

## Известные ограничения

- У API есть ограничение по частоте запросов (можно получить `429`)
- При частых фильтрациях по датам возможны временные пустые состояния из-за лимитов API
