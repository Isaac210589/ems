const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { v4: uuidv4 } = require("uuid");
const db = require("./database");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize database and start server
db.init()
  .then(() => {
    console.log("Database initialized successfully");
  })
  .catch((err) => {
    console.error("Database initialization failed:", err);
    process.exit(1);
  });

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "EMS Backend is running" });
});

// CREATE - Add new employee
app.post("/api/employees", async (req, res) => {
  try {
    const { name, email, department, position, salary, hire_date, status } =
      req.body;

    // Validation
    if (
      !name ||
      !email ||
      !department ||
      !position ||
      !salary ||
      !hire_date ||
      !status
    ) {
      return res.status(400).json({
        isOk: false,
        error: "Missing required fields",
      });
    }

    const employeeId = uuidv4();
    const employee = await db.create({
      id: employeeId,
      name,
      email,
      department,
      position,
      salary: Number(salary),
      hire_date,
      status,
    });

    res.status(201).json({
      isOk: true,
      data: employee,
    });
  } catch (error) {
    console.error("Error creating employee:", error);
    res.status(400).json({
      isOk: false,
      error: error.message || "Failed to create employee",
    });
  }
});

// READ - Get all employees
app.get("/api/employees", async (req, res) => {
  try {
    const employees = await db.readAll();
    res.json({
      isOk: true,
      data: employees,
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({
      isOk: false,
      error: "Failed to fetch employees",
    });
  }
});

// READ - Get single employee
app.get("/api/employees/:id", async (req, res) => {
  try {
    const employee = await db.read(req.params.id);

    if (!employee) {
      return res.status(404).json({
        isOk: false,
        error: "Employee not found",
      });
    }

    res.json({
      isOk: true,
      data: employee,
    });
  } catch (error) {
    console.error("Error fetching employee:", error);
    res.status(500).json({
      isOk: false,
      error: "Failed to fetch employee",
    });
  }
});

// UPDATE - Update employee
app.put("/api/employees/:id", async (req, res) => {
  try {
    const { name, email, department, position, salary, hire_date, status } =
      req.body;

    // Validation
    if (
      !name ||
      !email ||
      !department ||
      !position ||
      !salary ||
      !hire_date ||
      !status
    ) {
      return res.status(400).json({
        isOk: false,
        error: "Missing required fields",
      });
    }

    const employee = await db.update(req.params.id, {
      name,
      email,
      department,
      position,
      salary: Number(salary),
      hire_date,
      status,
    });

    res.json({
      isOk: true,
      data: employee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(400).json({
      isOk: false,
      error: error.message || "Failed to update employee",
    });
  }
});

// DELETE - Delete employee
app.delete("/api/employees/:id", async (req, res) => {
  try {
    await db.delete(req.params.id);
    res.json({
      isOk: true,
      message: "Employee deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({
      isOk: false,
      error: "Failed to delete employee",
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({
    isOk: false,
    error: "Internal server error",
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`EMS Backend server running on http://localhost:${PORT}`);
  console.log("Available endpoints:");
  console.log("  GET  /api/health - Health check");
  console.log("  GET  /api/employees - Get all employees");
  console.log("  GET  /api/employees/:id - Get employee by ID");
  console.log("  POST /api/employees - Create new employee");
  console.log("  PUT  /api/employees/:id - Update employee");
  console.log("  DELETE /api/employees/:id - Delete employee");
});

// Handle graceful shutdown
process.on("SIGINT", async () => {
  console.log("\nShutting down gracefully...");
  await db.close();
  process.exit(0);
});
