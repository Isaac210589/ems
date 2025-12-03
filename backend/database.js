const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const DB_PATH = path.join(__dirname, "employees.db");

class Database {
  constructor() {
    this.db = null;
  }

  async init() {
    return new Promise((resolve, reject) => {
      this.db = new sqlite3.Database(DB_PATH, (err) => {
        if (err) {
          reject(err);
        } else {
          this.createTables();
          resolve();
        }
      });
    });
  }

  createTables() {
    this.db.run(`
      CREATE TABLE IF NOT EXISTS employees (
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
    `);
  }

  // Create employee
  async create(employeeData) {
    return new Promise((resolve, reject) => {
      const {
        id,
        name,
        email,
        department,
        position,
        salary,
        hire_date,
        status,
      } = employeeData;

      this.db.run(
        `INSERT INTO employees (id, name, email, department, position, salary, hire_date, status)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, name, email, department, position, salary, hire_date, status],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id, ...employeeData });
          }
        }
      );
    });
  }

  // Read all employees
  async readAll() {
    return new Promise((resolve, reject) => {
      this.db.all(
        `SELECT * FROM employees ORDER BY created_at DESC`,
        (err, rows) => {
          if (err) {
            reject(err);
          } else {
            const employees = rows.map((row) => ({
              __backendId: row.id,
              ...row,
            }));
            resolve(employees);
          }
        }
      );
    });
  }

  // Read single employee
  async read(id) {
    return new Promise((resolve, reject) => {
      this.db.get(`SELECT * FROM employees WHERE id = ?`, [id], (err, row) => {
        if (err) {
          reject(err);
        } else if (row) {
          resolve({
            __backendId: row.id,
            ...row,
          });
        } else {
          resolve(null);
        }
      });
    });
  }

  // Update employee
  async update(id, employeeData) {
    return new Promise((resolve, reject) => {
      const { name, email, department, position, salary, hire_date, status } =
        employeeData;

      this.db.run(
        `UPDATE employees 
         SET name = ?, email = ?, department = ?, position = ?, salary = ?, hire_date = ?, status = ?, updated_at = CURRENT_TIMESTAMP
         WHERE id = ?`,
        [name, email, department, position, salary, hire_date, status, id],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({ id, ...employeeData });
          }
        }
      );
    });
  }

  // Delete employee
  async delete(id) {
    return new Promise((resolve, reject) => {
      this.db.run(`DELETE FROM employees WHERE id = ?`, [id], function (err) {
        if (err) {
          reject(err);
        } else {
          resolve({ success: true, id });
        }
      });
    });
  }

  // Close database connection
  close() {
    return new Promise((resolve, reject) => {
      if (this.db) {
        this.db.close((err) => {
          if (err) reject(err);
          else resolve();
        });
      } else {
        resolve();
      }
    });
  }
}

module.exports = new Database();
