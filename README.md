# Task Management API
A RESTful API for managing tasks, with CRUD operations and report generation functionality.
## Features
- Create, Read, Update, Delete (CRUD) tasks.
- Generate reports using worker threads.
- Error handling and validation for robust functionality.
## Prerequisites
- Node.js (v16 or higher)
- MongoDB Atlas or a local MongoDB instance
- Yarn (v1.22.22 or higher)
## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Ola4987/task-management-api.git
cd task-management-api
yarn install

### Environment Variables
The project includes a `.env` file in the root directory with placeholder values. You must replace these placeholders with your actual credentials to run the project:
MONGODB_URI=mongodb+srv://add-your-username-here:input-your-password-here@cluster.7855d.mongodb.net/?retryWrites=true&w=majority

## installation
git clone https://github.com/Ola4987/task-management-api.git
cd task-management-api
yarn install

## Running the application
start the server : yarn start
The application runs at http://localhost:5000.

#### API Documentation
Base URL
Local: http://localhost:5000
## Endpoints
Tasks
## 1 Get All Tasks
Method: GET
Endpoint: /api/tasks
Description: Retrieve all tasks from the database.
Response:
[
  {
    "id": "1",
    "title": "Complete project",
    "description": "Finish the CRUD task management project",
    "completed": false
  }
]
## 2 Create a New Task

Method: POST
Endpoint: /api/tasks
Description: Create a new task.
Request Body:
{
  "title": "Finish the API documentation",
  "description": "Complete and add API documentation to the README file",
  "completed": false
}
Response:
{
  "id": "2",
  "title": "Finish the API documentation",
  "description": "Complete and add API documentation to the README file",
  "completed": false
}
## 3 Update a Task

Method: PATCH
Endpoint: /api/tasks/:id
Description: Update a specific task by ID.
Request Body (example):

{
  "completed": true
}
Response:

{
  "id": "2",
  "title": "Finish the API documentation",
  "description": "Complete and add API documentation to the README file",
  "completed": true
}
## 4 Delete a Task

Method: DELETE
Endpoint: /api/tasks/:id
Description: Delete a specific task by ID.
Response:

{
  "message": "Task deleted successfully"
}

## 5 Reports
Generate a Report
Method: GET
Endpoint: /reports
Description: Generates a report based on predefined criteria.

Testing the API
To test the API using Postman, refer to the API Endpoints section in this README. Use the provided endpoints and payload examples to configure your requests.

Contribution
Feel free to fork this repository, create a branch, and submit a pull request for any enhancements or fixes.



