# EMS Backend

Node.js backend for the Employment Management System

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm start
```

For development with auto-reload:

```bash
npm run dev
```

The server will run on `http://localhost:3000`

## API Endpoints

### Health Check

- `GET /api/health` - Check if server is running

### Employees

- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get single employee by ID
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

## Request/Response Format

All endpoints return JSON with the following structure:

```json
{
  "isOk": true/false,
  "data": {...} or "error": "message"
}
```

## Employee Data Structure

```json
{
  "name": "string",
  "email": "string",
  "department": "string",
  "position": "string",
  "salary": "number",
  "hire_date": "string (YYYY-MM-DD)",
  "status": "Active|Inactive"
}
```

## Database

Uses SQLite3 with automatic schema creation. Database file: `employees.db`
