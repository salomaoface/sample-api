# Intructions

## Requirements

- Git
- Docker
- Node
- Curl, insominia or Postman

## With docker running, run the commands below (LINUX ENVIRONMENT or UNIX LIKE OS)

```
git clone ''
cd sample-api
cp .env.example .env
npm install
docker compose up
node ace migration:run
node ace db:seed
npm run dev
```

> [!NOTE]
> Use .curl-sample.txt or .har-sample.json files to test the API

> [!WARNING]
> If you don't want to lose the database data, use 'docker compose stop' instead of 'docker compose down' to stop the container

> [!WARNING]
> Once you have used 'docker compose stop' to persist the database container data, use 'docker compose start' to restart the container.