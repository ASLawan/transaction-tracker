# Transaction Tracking System

## Overview

The **Transaction Tracking System** is a full-stack web application designed to create, manage, and track transactions. The system features a REST API, a scheduler for automated transaction creation, real-time updates via WebSockets, a search functionality, and a frontend web application for users to interact with transactions.

## Features

- **REST API**: Provides endpoints for creating, updating, retrieving, and searching transactions.
- **Automated Scheduler**: Runs every minute to generate mock transactions and updates their status after 10 seconds.
- **Real-time Updates**: Uses WebSockets (`socket.io`) to reflect transaction changes instantly.
- **Search Functionality**: Allows searching transactions by ID, value, sender, or receiver.
- **API Documentation**: Uses Swagger for clear and structured documentation.
- **Testing**: Includes unit and integration tests to ensure functionality and reliability.
- **Deployment**: Uses Docker for easy setup and Heroku (or similar) for deployment.

## Tech Stack

### Backend:

- **Framework**: Express.js (TypeScript)
- **Database**: PostgreSQL (via Sequelize ORM)
- **Scheduler**: Node-Schedule
- **WebSockets**: Socket.io
- **API Documentation**: Swagger
- **Testing**: Jest & Supertest

### Frontend:

- **Framework**: React.js (Vite + TypeScript)
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **API Calls**: Axios
- **WebSockets**: Socket.io Client

### Deployment:

- **Docker Compose**: For easy local and cloud deployment
- **Heroku**: For hosting the backend and frontend

---

## Installation & Setup

### Prerequisites:

- Node.js (v18+)
- PostgreSQL
- Docker (optional, for containerized setup)

### Clone the Repository:

```sh
git clone https://github.com/your-repo/transaction-tracker.git
cd transaction-tracker
```

### Backend Setup:

1. Install dependencies:

```sh
cd backend
npm install
```

2. Set up environment variables:
   Create a `.env` file and configure the database connection:

```sh
DATABASE_URL=postgres://user:password@localhost:5432/transactions_db
PORT=5000
```

3. Run database migrations:

```sh
npx sequelize-cli db:migrate
```

4. Start the backend server:

```sh
npm run dev
```

### Frontend Setup:

1. Install dependencies:

```sh
cd frontend
npm install
```

2. Configure API URL in `.env`:

```sh
VITE_API_URL=http://localhost:5000/api/transactions
```

3. Start the frontend app:

```sh
npm run dev
```

---

## API Endpoints

| Method | Endpoint                                | Description                |
| ------ | --------------------------------------- | -------------------------- |
| POST   | `/api/transactions/create`              | Create a new transaction   |
| PUT    | `/api/transactions/update/:id`          | Update a transaction       |
| GET    | `/api/transactions/getAll`              | Fetch all transactions     |
| GET    | `/api/transactions/getOne/:id`          | Fetch a single transaction |
| GET    | `/api/transactions/getRange/date-range` | Fetch transactions by date |

For full API details, access the Swagger documentation at:

```
http://localhost:5000/api-docs
```

---

## Running the Scheduler

The scheduler is responsible for generating mock transactions and updating them. To start it, run:

```sh
npm run start:scheduler
```

If deploying, ensure the scheduler runs as a separate worker process.

---

## WebSocket Integration

The application uses WebSockets for real-time updates. The WebSocket server runs alongside the backend and listens for transaction updates.

Frontend connects to WebSocket server:

```tsx
import { io } from "socket.io-client";
const socket = io("http://localhost:5000");
```

---

## Testing

To run unit and integration tests:

```sh
npm test
```

---

## Deployment

The project supports **Docker deployment**:

1. Build and start the containers:

```sh
docker-compose up --build
```

2. Access the application at:

```
http://localhost:3000 (Frontend)
http://localhost:5000 (Backend API)
```

For **Heroku Deployment**:

1. Create a Heroku app and add PostgreSQL.
2. Deploy backend and frontend separately.

---

## Contributors

- **Austin S. Lawan** – Full-Stack Developer
- **Other Contributors**

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.
