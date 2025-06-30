# Pokedex API

A Pokedex API built with Next.js 15, TypeScript, Prisma, PostgreSQL, and GraphQL using Apollo Server.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (for macOS)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

## Installation and Running

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd pokedex-api
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up PostgreSQL with Docker**
   - Ensure Docker Desktop is running.
   - Verify or create `docker-compose.yml` in the project root:
     ```yaml
     version: '3.8'
     services:
       postgres:
         image: postgres:16
         environment:
           POSTGRES_USER: myuser
           POSTGRES_PASSWORD: mypassword
           POSTGRES_DB: pokedex
         ports:
           - '5432:5432'
         volumes:
           - postgres-data:/var/lib/postgresql/data
         restart: unless-stopped
     volumes:
       postgres-data:
     ```
   - Start the container:
     ```bash
     docker-compose up -d
     ```

4. **Configure Environment Variables**
   - Create or update `.env` in the project root:
     ```env
     DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/pokedex?schema=public"
     ```

5. **Set Up Prisma**
   - Run Prisma migrations:
     ```bash
     npx prisma migrate dev --name init
     ```

6. **Run the Application**
   - Start the Next.js server:
     ```bash
     npm run dev
     ```
   - The API is available at `http://localhost:3000/api/graphql`.

7. **Test the API**
   - Use a GraphQL client (e.g., Apollo Studio) to query `http://localhost:3000/api/graphql`.
   - Example query:
     ```graphql
     query {
       user {
         id
         name
       }
     }
     ```

8. **Stopping the Application**
   - Stop the Next.js server: `Ctrl+C`.
   - Stop the Docker container:
     ```bash
     docker-compose down
     ```

## Troubleshooting
- Ensure Docker Desktop is running.
- Check if port 5432 is free: `lsof -i :5432`.
- Verify `DATABASE_URL` in `.env` matches Docker settings.