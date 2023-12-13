/* Replace with your SQL commands */
CREATE TABLE users (
    id bigint PRIMARY KEY AUTO_INCREMENT,
    userName varchar(255) NOT NULL,
    password varchar(255) NOT NULL,
    firstName text NOT NULL,
    lastName text NOT NULL,
    email varchar(255) NOT NULL,
    phone text NOT NULL,
    isActive boolean DEFAULT true,
    userRole enum('student', 'instructor') DEFAULT 'student',
    createdAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
CREATE TABLE lessons (
    id CHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    instructor TEXT NOT NULL,
    duration TEXT NOT NULL,
    isActive BOOLEAN DEFAULT true,
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)