# Employment Management System (EMS) - Complete Documentation

## Table of Contents

1. [System Overview](#system-overview)
2. [Features](#features)
3. [Architecture](#architecture)
4. [Frontend Functionalities](#frontend-functionalities)
5. [Backend API](#backend-api)
6. [Database Schema](#database-schema)
7. [Installation & Setup](#installation--setup)
8. [Usage Guide](#usage-guide)
9. [Technical Stack](#technical-stack)

---

## System Overview

The Employment Management System (EMS) is a web-based application designed to manage employee information efficiently. It provides a user-friendly interface for creating, reading, updating, and deleting employee records. The system uses a modern frontend with a Node.js backend and SQLite database for persistent data storage.

**Company:** KLIC.IT Perfumes & more  
**System Name:** Employment Management System  
**Version:** 1.0.0

---

## Features

### Core Functionalities

#### 1. **Employee Management**

- Add new employees to the system
- View all employees in a comprehensive table
- Edit existing employee information
- Delete employee records with confirmation
- Maximum capacity: 999 employees

#### 2. **Dashboard Statistics**

- **Total Employees**: Displays the total count of all employees in the system
- **Active Employees**: Shows count of employees with "Active" status
- **Total Departments**: Calculates unique departments across all employees

#### 3. **Search & Filter**

- **Search by Name or Email**: Real-time search functionality
- **Department Filter**: Filter employees by their department
- **Status Filter**: Filter employees by Active/Inactive status
- Filters work together for refined searches

#### 4. **Data Persistence**

- All employee data is stored in SQLite database
- Automatic database initialization on backend startup
- Data survives application restarts

#### 5. **User Experience Features**

- Beautiful gradient UI with purple theme (#667eea to #764ba2)
- Modal dialog for adding/editing employees
- Toast notifications for success/error messages
- Loading spinner during save operations
- Confirmation dialog for deletions
- Responsive design with Tailwind CSS
- Smooth animations and transitions

---

## Architecture

### System Architecture Diagram

```
┌─────────────────────────────────────┐
│     Frontend (EMS.html)             │
│   - React-like interactions         │
│   - Tailwind CSS styling            │
│   - Fetch API for HTTP calls        │
└────────────────┬────────────────────┘
                 │ HTTP (REST API)
                 ▼
┌─────────────────────────────────────┐
│   Backend (Node.js/Express)         │
│   - RESTful API endpoints           │
│   - CORS enabled                    │
│   - Request validation              │
└────────────────┬────────────────────┘
                 │ SQL Queries
                 ▼
┌─────────────────────────────────────┐
│   Database (SQLite)                 │
│   - employees.db                    │
│   - Persistent storage              │
└─────────────────────────────────────┘
```

---

## Frontend Functionalities

### 1. Dashboard Display

**Location:** Top section of the page

- Company branding and system title
- Add Employee button (prominent call-to-action)
- Statistics cards showing:
  - Total Employees (blue)
  - Active Employees (green)
  - Total Departments (orange)

### 2. Filter Section

**Location:** Below statistics

- **Search Input**: Search employees by name or email (case-insensitive)
- **Department Dropdown**: Populated dynamically from database
- **Status Dropdown**: Filter by Active or Inactive status
- All filters work simultaneously

### 3. Employee Directory Table

**Columns:**

- Name
- Email
- Department
- Position
- Salary (formatted with thousands separator)
- Status (with color-coded badge)
- Actions (Edit and Delete buttons)

**Features:**

- Rows highlight on hover
- Color-coded status badges (green for Active, gray for Inactive)
- Quick action buttons for each employee

### 4. Add/Edit Employee Modal

**Form Fields:**

- Full Name (text input)
- Email Address (email input with validation)
- Department (text input)
- Position (text input)
- Salary (number input with $1000 increments)
- Hire Date (date picker)
- Status (dropdown: Active/Inactive)

**Modal Actions:**

- Cancel button to close without saving
- Save Employee button (turns to "Update Employee" when editing)
- Loading spinner during submission
- Automatic modal closure on successful save

### 5. User Interactions

#### Adding a New Employee

1. Click "+ Add Employee" button
2. Fill in all required fields
3. Click "Save Employee"
4. Receive success notification
5. Employee appears in table automatically

#### Editing an Employee

1. Click "Edit" button on employee row
2. Modal opens with current employee data
3. Modify desired fields
4. Click "Update Employee"
5. Receive success notification
6. Table updates automatically

#### Deleting an Employee

1. Click "Delete" button on employee row
2. Button changes to "Confirm?" (red background)
3. Click again within 3 seconds to confirm deletion
4. Click elsewhere to cancel (reverts after 3 seconds)
5. Receive success notification
6. Employee removed from table

#### Searching/Filtering

1. Type in search box to find by name or email (real-time)
2. Select a department from dropdown to filter
3. Select a status to show only Active or Inactive
4. All filters work together
5. Empty state message appears if no results

### 6. Notifications (Toast Messages)

- **Success (Green)**: Employee added/updated/deleted
- **Error (Red)**: Invalid input or API errors
- Auto-dismiss after 3 seconds
- Positioned at bottom-right corner

---

## Backend API

### Base URL

```
http://localhost:3000/api
```

### API Endpoints

#### 1. Health Check

```
GET /api/health
```

**Purpose:** Verify server is running
**Response:**

```json
{
  "status": "ok",
  "message": "EMS Backend is running"
}
```

#### 2. Get All Employees

```
GET /api/employees
```

**Purpose:** Retrieve all employees from database
**Response:**

```json
{
  "isOk": true,
  "data": [
    {
      "__backendId": "uuid-string",
      "id": "uuid-string",
      "name": "John Doe",
      "email": "john@example.com",
      "department": "Sales",
      "position": "Manager",
      "salary": 75000,
      "hire_date": "2023-01-15",
      "status": "Active",
      "created_at": "2025-12-03T10:30:00Z",
      "updated_at": "2025-12-03T10:30:00Z"
    }
  ]
}
```

#### 3. Get Single Employee

```
GET /api/employees/:id
```

**Parameters:**

- `id` (string): Employee UUID

**Response:** Single employee object

```json
{
  "isOk": true,
  "data": {
    /* employee object */
  }
}
```

#### 4. Create New Employee

```
POST /api/employees
```

**Headers:** `Content-Type: application/json`

**Request Body:**

```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "department": "HR",
  "position": "Specialist",
  "salary": 65000,
  "hire_date": "2025-12-01",
  "status": "Active"
}
```

**Response:**

```json
{
  "isOk": true,
  "data": {
    /* created employee with auto-generated ID */
  }
}
```

**Status Code:** 201 (Created)

**Validation:**

- All fields required
- Email must be unique
- Returns 400 if validation fails

#### 5. Update Employee

```
PUT /api/employees/:id
```

**Parameters:**

- `id` (string): Employee UUID

**Headers:** `Content-Type: application/json`

**Request Body:** Same as Create (all fields required)

**Response:**

```json
{
  "isOk": true,
  "data": {
    /* updated employee object */
  }
}
```

**Validation:**

- All fields required
- Email uniqueness check (excluding current employee)

#### 6. Delete Employee

```
DELETE /api/employees/:id
```

**Parameters:**

- `id` (string): Employee UUID

**Response:**

```json
{
  "isOk": true,
  "message": "Employee deleted successfully"
}
```

**Status Code:** 200 (OK)

---

## Database Schema

### Employees Table

```sql
CREATE TABLE employees (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  department TEXT NOT NULL,
  position TEXT NOT NULL,
  salary REAL NOT NULL,
  hire_date TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'Active',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
```

### Column Definitions

| Column     | Type     | Description                               |
| ---------- | -------- | ----------------------------------------- |
| id         | TEXT     | Unique identifier (UUID v4) - Primary Key |
| name       | TEXT     | Employee full name (required)             |
| email      | TEXT     | Email address (required, unique)          |
| department | TEXT     | Department name (required)                |
| position   | TEXT     | Job position/title (required)             |
| salary     | REAL     | Annual salary in dollars (required)       |
| hire_date  | TEXT     | Hire date in YYYY-MM-DD format (required) |
| status     | TEXT     | Active or Inactive (default: Active)      |
| created_at | DATETIME | Record creation timestamp                 |
| updated_at | DATETIME | Last update timestamp                     |

**Database File Location:**

```
/Users/mac/Desktop/FINAL P WORK/backend/employees.db
```

---

## Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)
- A modern web browser

### Backend Setup

#### 1. Navigate to Backend Directory

```bash
cd /Users/mac/Desktop/"FINAL P WORK"/backend
```

#### 2. Install Dependencies

```bash
npm install
```

Installed packages:

- **express**: Web framework
- **cors**: Cross-origin resource sharing
- **body-parser**: Request body parsing
- **sqlite3**: Database driver
- **uuid**: Unique ID generation
- **nodemon**: Development auto-restart (dev only)

#### 3. Start the Server

```bash
npm start
```

Server will output:

```
Database initialized successfully
EMS Backend server running on http://localhost:3000
Available endpoints:
  GET  /api/health - Health check
  GET  /api/employees - Get all employees
  GET  /api/employees/:id - Get employee by ID
  POST /api/employees - Create new employee
  PUT  /api/employees/:id - Update employee
  DELETE /api/employees/:id - Delete employee
```

#### For Development with Auto-Reload

```bash
npm run dev
```

### Frontend Setup

#### 1. Open in Browser

Simply open the `EMS.html` file in a web browser:

```
file:///Users/mac/Desktop/FINAL P WORK/EMS.html
```

Or serve with a local server:

```bash
# Using Python 3
python -m http.server 8000

# Using Node.js http-server
npx http-server
```

Then navigate to:

```
http://localhost:8000/EMS.html
```

---

## Usage Guide

### Typical Workflow

#### Step 1: Start the Backend

```bash
cd backend
npm start
```

Wait for "Database initialized successfully" message

#### Step 2: Open Frontend

Open `EMS.html` in browser or local server

#### Step 3: Add Employees

1. Click "+ Add Employee"
2. Fill form with employee data
3. Click "Save Employee"
4. Confirm in table

#### Step 4: Manage Employees

- **Search**: Type name or email in search box
- **Filter**: Use dropdown filters
- **Edit**: Click Edit, modify, click Update
- **Delete**: Click Delete, confirm in popup

#### Step 5: Monitor Statistics

- View dashboard stats updating in real-time
- Check department count changes

### Example Scenarios

#### Scenario 1: Adding a New Sales Manager

1. Click "+ Add Employee"
2. Enter:
   - Name: "Maria Garcia"
   - Email: "maria.garcia@company.com"
   - Department: "Sales"
   - Position: "Sales Manager"
   - Salary: "75000"
   - Hire Date: "2025-12-01"
   - Status: "Active"
3. Click "Save Employee"
4. Success notification appears
5. Employee appears in table

#### Scenario 2: Updating Employee Information

1. Find "Maria Garcia" (use search if needed)
2. Click "Edit" button
3. Change Position to "Senior Sales Manager"
4. Change Salary to "85000"
5. Click "Update Employee"
6. Table refreshes with new information

#### Scenario 3: Filtering by Department

1. Select "Sales" from Department dropdown
2. Only Sales department employees display
3. Statistics update to show only Sales stats
4. Can still search within filtered results

---

## Technical Stack

### Frontend

- **HTML5**: Structure and semantic markup
- **CSS3**: Styling and animations
- **Tailwind CSS**: Utility-first CSS framework
- **Vanilla JavaScript**: Logic and interactions
- **Fetch API**: HTTP requests to backend

### Backend

- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **CORS**: Cross-origin request handling
- **Body Parser**: Request body middleware

### Database

- **SQLite3**: Embedded relational database
- **SQL**: Database queries

### Development Tools

- **npm**: Package manager
- **Nodemon**: Development server auto-reload
- **UUID**: Unique identifier generation

### Browser Compatibility

- Chrome/Chromium
- Firefox
- Safari
- Edge
- Modern mobile browsers

---

## Error Handling

### Common Error Messages

| Error                      | Cause                             | Solution                        |
| -------------------------- | --------------------------------- | ------------------------------- |
| "Failed to load employees" | Backend not running or CORS issue | Start backend on localhost:3000 |
| "Failed to save employee"  | Validation error or server error  | Check console for details       |
| "Missing required fields"  | Empty form field                  | Fill all form fields            |
| "Email already exists"     | Duplicate email                   | Use unique email                |
| "Employee not found"       | Employee doesn't exist            | Refresh and try again           |

### Debugging

#### Check Backend Logs

```bash
# Look for errors in terminal where backend is running
# Check /Users/mac/Desktop/FINAL P WORK/backend/employees.db file permissions
```

#### Check Database

```bash
# Using SQLite3 CLI
sqlite3 backend/employees.db
sqlite> SELECT COUNT(*) FROM employees;
sqlite> SELECT * FROM employees;
```

#### Browser Console

- Press F12 or Right-click → Inspect
- Go to Console tab to see JavaScript errors
- Check Network tab to see API calls

---

## Best Practices

### For System Administrators

1. Regularly backup the `employees.db` file
2. Monitor employee count (max 999)
3. Keep backend running on a stable machine
4. Use HTTPS in production environments

### For Users

1. Use consistent department naming
2. Enter valid email addresses
3. Double-check data before saving
4. Use filters to find employees quickly
5. Confirm deletion carefully (cannot be undone)

### For Developers

1. Always validate input on both frontend and backend
2. Use meaningful commit messages when updating
3. Test CRUD operations thoroughly
4. Monitor database growth
5. Keep dependencies updated
6. Implement authentication before production use

---

## Security Considerations

### Current Limitations

- ⚠️ No authentication/authorization
- ⚠️ No input sanitization for SQL injection
- ⚠️ CORS allows all origins
- ⚠️ No rate limiting
- ⚠️ No HTTPS/SSL

### Recommended for Production

- [ ] Implement user authentication (JWT)
- [ ] Add input validation and sanitization
- [ ] Restrict CORS to specific origins
- [ ] Implement rate limiting
- [ ] Use HTTPS/SSL
- [ ] Add encryption for sensitive data
- [ ] Implement logging and monitoring
- [ ] Use environment variables for configuration

---

## Maintenance & Support

### Regular Maintenance Tasks

- Weekly: Backup database
- Monthly: Review employee count and data quality
- Quarterly: Update dependencies
- Annually: Archive old records

### Common Maintenance Commands

```bash
# Backup database
cp backend/employees.db backend/employees.db.backup

# View database size
ls -lh backend/employees.db

# Clear all employees (dev only)
rm backend/employees.db
```

---

## Contact & Support

For issues or questions regarding the EMS system:

- Repository: https://github.com/Isaac210589/ems
- Check GitHub Issues for known problems
- Review this documentation first

---

## Version History

| Version | Date       | Changes                                   |
| ------- | ---------- | ----------------------------------------- |
| 1.0.0   | 2025-12-03 | Initial release with full CRUD operations |

---

## Glossary

- **CRUD**: Create, Read, Update, Delete operations
- **API**: Application Programming Interface
- **REST**: Representational State Transfer
- **SQLite**: Lightweight SQL database engine
- **UUID**: Universally Unique Identifier
- **CORS**: Cross-Origin Resource Sharing
- **JSON**: JavaScript Object Notation

---

## Appendix

### Sample cURL Commands for Testing API

#### Create Employee

```bash
curl -X POST http://localhost:3000/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "department": "IT",
    "position": "Developer",
    "salary": 80000,
    "hire_date": "2025-12-01",
    "status": "Active"
  }'
```

#### Get All Employees

```bash
curl http://localhost:3000/api/employees
```

#### Update Employee

```bash
curl -X PUT http://localhost:3000/api/employees/{id} \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe Updated",
    "email": "john@example.com",
    "department": "IT",
    "position": "Senior Developer",
    "salary": 95000,
    "hire_date": "2025-12-01",
    "status": "Active"
  }'
```

#### Delete Employee

```bash
curl -X DELETE http://localhost:3000/api/employees/{id}
```

---

**End of Documentation**

_Last Updated: December 3, 2025_
