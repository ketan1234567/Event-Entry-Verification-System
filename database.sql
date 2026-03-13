-- Database: event_entry

CREATE DATABASE IF NOT EXISTS event_entry
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE event_entry;

-- Table: employees

CREATE TABLE IF NOT EXISTS employees (
  id INT AUTO_INCREMENT PRIMARY KEY,
  employee_id VARCHAR(50) NOT NULL UNIQUE,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  email VARCHAR(150),
  department VARCHAR(100),
  status ENUM('active', 'blocked') NOT NULL DEFAULT 'active',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Table: gates

CREATE TABLE IF NOT EXISTS gates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  gate_code VARCHAR(20) NOT NULL UNIQUE,
  name VARCHAR(100),
  location VARCHAR(255),
  status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Table: events

CREATE TABLE IF NOT EXISTS events (
  id INT AUTO_INCREMENT PRIMARY KEY,
  event_code VARCHAR(50) NOT NULL UNIQUE,
  name VARCHAR(150) NOT NULL,
  start_time DATETIME,
  end_time DATETIME,
  status ENUM('upcoming', 'ongoing', 'ended') NOT NULL DEFAULT 'ongoing',
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Table: entry_tokens

CREATE TABLE IF NOT EXISTS entry_tokens (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  token CHAR(64) NOT NULL UNIQUE,
  employee_id INT NOT NULL,
  event_id INT,
  gate_id INT,
  type ENUM('entry', 'reentry') NOT NULL DEFAULT 'entry',
  status ENUM('active', 'used', 'expired', 'revoked') NOT NULL DEFAULT 'active',
  device_fingerprint VARCHAR(255),
  issued_at DATETIME NOT NULL,
  expires_at DATETIME NOT NULL,
  used_at DATETIME,
  used_ip VARCHAR(45),
  used_user_agent VARCHAR(255),
  CONSTRAINT fk_entry_tokens_employee
    FOREIGN KEY (employee_id) REFERENCES employees(id),
  CONSTRAINT fk_entry_tokens_event
    FOREIGN KEY (event_id) REFERENCES events(id),
  CONSTRAINT fk_entry_tokens_gate
    FOREIGN KEY (gate_id) REFERENCES gates(id),
  INDEX idx_entry_tokens_token (token),
  INDEX idx_entry_tokens_employee (employee_id),
  INDEX idx_entry_tokens_status (status, expires_at)
) ENGINE=InnoDB;

-- Table: entries

CREATE TABLE IF NOT EXISTS entries (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  employee_id INT NOT NULL,
  event_id INT NOT NULL,
  gate_id INT NOT NULL,
  entry_token_id BIGINT NOT NULL,
  entry_type ENUM('entry', 'reentry') NOT NULL DEFAULT 'entry',
  entry_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  device_fingerprint VARCHAR(255),
  ip_address VARCHAR(45),
  user_agent VARCHAR(255),
  CONSTRAINT fk_entries_employee
    FOREIGN KEY (employee_id) REFERENCES employees(id),
  CONSTRAINT fk_entries_event
    FOREIGN KEY (event_id) REFERENCES events(id),
  CONSTRAINT fk_entries_gate
    FOREIGN KEY (gate_id) REFERENCES gates(id),
  CONSTRAINT fk_entries_entry_token
    FOREIGN KEY (entry_token_id) REFERENCES entry_tokens(id),
  INDEX idx_entries_employee_time (employee_id, entry_time),
  INDEX idx_entries_gate_time (gate_id, entry_time)
) ENGINE=InnoDB;

-- Table: admin_users

CREATE TABLE IF NOT EXISTS admin_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role ENUM('admin', 'viewer') NOT NULL DEFAULT 'viewer',
  last_login_at DATETIME,
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- Table: admin_sessions

CREATE TABLE IF NOT EXISTS admin_sessions (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  admin_user_id INT NOT NULL,
  session_token CHAR(64) NOT NULL UNIQUE,
  ip_address VARCHAR(45),
  user_agent VARCHAR(255),
  created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  expires_at DATETIME NOT NULL,
  invalidated_at DATETIME,
  CONSTRAINT fk_admin_sessions_admin_user
    FOREIGN KEY (admin_user_id) REFERENCES admin_users(id)
) ENGINE=InnoDB;

-- Seed example data (optional, remove if not needed)

INSERT INTO events (event_code, name, start_time, end_time)
VALUES ('EVT2026', 'Sample Event', NOW(), DATE_ADD(NOW(), INTERVAL 1 DAY))
ON DUPLICATE KEY UPDATE name = VALUES(name);

INSERT INTO gates (gate_code, name, location)
VALUES 
  ('G1', 'Gate 1', 'Main Entrance'),
  ('G2', 'Gate 2', 'Side Entrance')
ON DUPLICATE KEY UPDATE name = VALUES(name);

