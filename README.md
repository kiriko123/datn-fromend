<h1>React + Vite Project</h1>
Prerequisites
Node.js v16.20.0
Getting Started
Install Dependencies:

bash
Sao chép mã
npm install
Start the Development Server:

bash
Sao chép mã
npm run dev
The application will be available at http://localhost:3000/
Ensure the backend is running on http://localhost:8080/
Frontend
Vite: 5.4.1
React: 18.3.1
Redux Toolkit: 1.9.3
Ant Design: 5.4
React Router DOM: 6.9.0
Backend Setup
Database Configuration:

Install and start MySQL.
Create the database:
sql
Sao chép mã
CREATE DATABASE DemoSpringSecurity;
Update application.yml:

Replace the placeholders with your MySQL username and password:

yaml
Sao chép mã
datasource:
  url: jdbc:mysql://localhost:3306/DemoSpringSecurity?useSSL=false&serverTimezone=UTC
  username: YOUR_MYSQL_USERNAME
  password: YOUR_MYSQL_PASSWORD
Ensure MySQL is running before starting the backend.

back-end
java spring boot
jpa
spring-security-oauth2-resource-server - jwt
swagger
mysql
