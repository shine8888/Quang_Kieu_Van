# Nodejs Flight

## Prerequisites

- Node.js 16+
- Yarn or NPM

## Start a Docker container for MySQL

```shell
docker run -d -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=flight --name mysqldb -p 3306:3306 mysql:8.0
```

To stop the docker container, run the command `docker stop mysqldb && docker container prune -f`

## Installation

- Install dependencies

```bash
yarn install
```

Create configuration file from the template

```shell
cp .env.template .env

# Edit configuration to match your local environment and save
nano .env
```

- Start Application

```bash
yarn start
```

The application will start on port **8080**

## Endpoints

| Endpoint      | Method | Parameters         |
| --------------| ------ | -------------------|
| /flights      | POST   | Add a new flight   |
| /flights      | GET    | Get all flights    |
| /flights/:id  | GET    | Get a flight       |
| /flights/:id  | PUT    | Update a flight    |
| /flights/:id  | DELETE | Delete a new flight|

## Note

I used some techniques to keep my BE stable, such as:

1. Cluster: Using native Cluster in Node.js to run multi-threading. In production cases, we can use PM2 to monitor and auto-scale clusters.
2. Reverse-proxy: Using the http-proxy library to create a reverse proxy that forwards requests to the API server running on the app port. In production cases, we can use NGINX setup.
3. Connection Pooling: Using connection pooling to reuse database connections instead of creating a new connection for each request. This can significantly reduce the overhead of creating and tearing down connections. In my app, I use Prisma as the ORM for mysql2, so when creating the connection, I have set the connection_limit=100 for the pooling.
4. Rate-limiter: Using a rate limiter in the app to avoid user spam on our system and also DDoS attacks.
5. Middleware Validation: Using validation for requests before they go to our deeper layer.

## Here are some simple methods that I applied to this assessment. In a production app, we have a lot of ways to scale and keep the server stable, such as: Load balancing, NGINX, CDN, CLUSTER, MESSAGE QUEUE, Using Auto Scale Service of GCP, AWS,... but it depends on your service, area and technology that you are using.

## Thanks for your reading
