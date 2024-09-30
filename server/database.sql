CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,  -- Hashed password
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

);

CREATE TABLE blogs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  image VARCHAR(255),  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  
  user_id INT REFERENCES users(id)  -- Foreign key referencing 'users' table
);
CREATE TABLE roles (
  id SERIAL PRIMARY KEY,
  role VARCHAR(255) NOT NULL
);
CREATE TABLE user_roles (
 user_id INT REFERENCES users(id) ON DELETE CASCADE,
  role_id INT REFERENCES roles(id)
);
CREATE TABLE roles_permission (
  id SERIAL PRIMARY KEY,
  role_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
  permission VARCHAR(50) NOT NULL,
  UNIQUE(role_id, permission)
);

