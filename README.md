# Employee Manager App

## Features
- RESTful API for CRUD operations on employees.
- User authentication with signup and login.
- Seeder script to populate dummy data.
- Integrated with MongoDB for persistent storage.

## Project Structure
backend/ ├── models/ │ ├── employee.js │ ├── users.js ├── routes/ │ ├── employeeRoutes.js │ ├── userRoutes.js ├── index.js ├── seeder.js ├── package.json └── README.md frontend/ ├── public/ ├── src/ │ ├── components/ │ │ ├── Header.js │ │ ├── Employees.js │ │ ├── AddEmployee.js │ │ ├── EditEmployee.js │ │ ├── ViewEmployee.js │ ├── App.js ├── index.js ├── package.json └── README.md


## Prerequisites
- Node.js
- npm
- MongoDB
- Docker

## Backend Setup Instructions
### 1. Install Dependencies
Navigate to the `backend` directory and run:
npm install

### 2. Run the Server
Start the backend server:
npm start

### 3. Access API Endpoints
The backend will be accessible at: `http://localhost:8081`

## API Endpoints
### User Endpoints
POST    /api/v1/user/signup   User signup
POST    /api/v1/user/login    User login

### Employee Endpoints
GET     /api/v1/emp/employees         Get all employees
GET     /api/v1/emp/employees/:id     Get an employee by ID
POST    /api/v1/emp/employees         Add a new employee
PUT     /api/v1/emp/employees/:id     Update an employee by ID
DELETE  /api/v1/emp/employees/:id     Delete an employee by ID

## Seeding Dummy Data
Populate the database with dummy data by running:
npm run seed

## Environment Variables
Set up the following environment variables in a `.env` file:
MONGO_URI=mongodb://mongo:27017/comp3123_assignment2 SECRET_KEY=valeria_secret_key


## Technologies Used
- Node.js
- Express
- MongoDB
- Mongoose
- bcrypt
- JSON Web Tokens (JWT)

## Deployment
To deploy the backend, ensure your MongoDB instance is accessible and update the `MONGO_URI` in the environment variables.

## Run the Project with Docker

### Steps
1. Navigate to the project root directory.
2. Run the following command:
docker-compose up --build
3. Access the application:
   - Frontend: `http://localhost:3000`
   - Backend: `http://localhost:8081`





