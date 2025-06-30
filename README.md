# Pokedex API

A modern Pokedex API built with Next.js 15, TypeScript, Prisma, PostgreSQL, and GraphQL using Apollo Server. This API provides comprehensive Pokemon data management with authentication and AI capabilities.

## 🚀 Features

- **GraphQL API** with Apollo Server
- **PostgreSQL Database** with Prisma ORM
- **Authentication System** with NextAuth.js
- **Email Integration** with Resend
- **AI Integration** with Groq API
- **Type Safety** with TypeScript
- **Docker Support** for easy development

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or higher)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [npm](https://www.npmjs.com/) or [pnpm](https://pnpm.io/)

## 🛠️ Installation and Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd pokedex-api
```

### 2. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Environment Variables Setup

Create a `.env` file in the project root and configure the following variables:

```env
# Database Configuration
DATABASE_URL="postgresql://myuser:mypassword@localhost:5432/pokedex?schema=public"

# Authentication
AUTH_SECRET="your-auth-secret-key-here"
AUTH_RESEND_KEY="your-resend-api-key-here"

# Application URL
NEXT_PUBLIC_APP_URL="http://localhost:3000"

# AI Integration
GROQ_API_KEY="your-groq-api-key-here"
```

#### Environment Variables Explanation:

- **`DATABASE_URL`**: PostgreSQL connection string for Prisma
- **`AUTH_SECRET`**: Secret key for NextAuth.js session encryption (generate with `openssl rand -base64 32`)
- **`AUTH_RESEND_KEY`**: API key for Resend email service (get from [Resend Dashboard](https://resend.com))
- **`NEXT_PUBLIC_APP_URL`**: Your application's public URL (used for callbacks and redirects)
- **`GROQ_API_KEY`**: API key for Groq AI service (get from [Groq Console](https://console.groq.com))

### 4. Database Setup with Docker

Ensure Docker Desktop is running, then create a `docker-compose.yml` file in the project root:

```yaml
version: '3.8'
services:
  postgres:
    image: postgres:16
    container_name: pokedex-postgres
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

Start the PostgreSQL container:

```bash
docker-compose up -d
```

### 5. Prisma Database Setup

Run the following commands to set up your database:

```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) Seed the database
npx prisma db seed
```

### 6. Start the Development Server

```bash
npm run dev
# or
pnpm dev
```

The application will be available at:
- **API Endpoint**: `http://localhost:3000/api/graphql`
- **GraphQL Playground**: `http://localhost:3000/api/graphql` (in development)

## 🧪 Testing the API

### Using GraphQL Playground

Navigate to `http://localhost:3000/api/graphql` in your browser to access the GraphQL playground.

### Example Queries

```graphql
# Get all Pokemon
query GetAllPokemon {
  pokemon {
    id
    name
    types
    stats {
      hp
      attack
      defense
    }
  }
}

# Get user information
query GetUser {
  user {
    id
    name
    email
  }
}
```

### Using cURL

```bash
curl -X POST http://localhost:3000/api/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "{ user { id name } }"
  }'
```

## 📁 Project Structure

```
pokedex-api/
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── src/
│   ├── pages/
│   │   └── api/
│   │       └── graphql.ts
│   ├── lib/
│   │   ├── prisma.ts
│   │   └── apollo.ts
│   └── types/
├── docker-compose.yml
├── .env
└── README.md
```

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Database
npx prisma studio    # Open Prisma Studio
npx prisma migrate   # Run migrations
npx prisma generate  # Generate Prisma client

# Docker
docker-compose up -d    # Start services
docker-compose down     # Stop services
docker-compose logs     # View logs
```

## 🐛 Troubleshooting

### Common Issues

1. **Port 5432 already in use**
   ```bash
   # Check what's using the port
   lsof -i :5432
   # Kill the process or use a different port
   ```

2. **Docker not running**
   - Ensure Docker Desktop is running
   - Check Docker status: `docker --version`

3. **Database connection issues**
   - Verify `DATABASE_URL` in `.env` matches Docker settings
   - Ensure PostgreSQL container is running: `docker ps`

4. **Prisma issues**
   ```bash
   # Reset database
   npx prisma migrate reset
   
   # Regenerate client
   npx prisma generate
   ```

5. **Environment variables not loading**
   - Ensure `.env` file is in the project root
   - Restart the development server after changes
   - Check for typos in variable names

### Getting Help

If you encounter issues:

1. Check the [Next.js documentation](https://nextjs.org/docs)
2. Review [Prisma documentation](https://www.prisma.io/docs)
3. Check [Apollo Server documentation](https://www.apollographql.com/docs/apollo-server)

## 🚦 Stopping the Application

1. **Stop the Next.js server**: Press `Ctrl+C` in the terminal
2. **Stop Docker containers**:
   ```bash
   docker-compose down
   ```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request