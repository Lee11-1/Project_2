# Project Management System

A web application for managing classes, exams, and user requests.

## Features

- User Authentication (Login/Register)
- Class Management
- Exam Management
- Request System
- Search Functionality
- Admin Dashboard
- Question Set Management
- File Upload System

## Tech Stack

- **Backend:**
  - Node.js
  - Express.js
  - PostgreSQL
  - Express Session
  - Multer (File Upload)
  - Bcryptjs (Password Hashing)

- **Frontend:**
  - HTML
  - CSS
  - JavaScript

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd project_2
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env` file in the root directory with the following variables:
```
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
DB_PORT=your_database_port
SESSION_SECRET=your_session_secret
```

4. Set up the database:
- Create a PostgreSQL database
- Run the database setup scripts in the `database` folder

5. Start the server:
```bash
npm start
```

The application will be available at `http://localhost:8080`

## Project Structure

```
project_2/
├── controllers/     # Business logic
├── database/       # Database scripts
├── public/         # Static files
├── routes/         # API routes
├── server.js       # Main application file
└── package.json    # Project dependencies
```

## API Endpoints

### Authentication
- POST /auth/login
- POST /auth/register

### Classes
- GET /classes
- POST /classes/create
- PUT /classes/update
- DELETE /classes/delete

### Exams
- GET /exams
- POST /exams/create
- PUT /exams/update
- DELETE /exams/delete

### Requests
- GET /requests
- POST /requests/create
- PUT /requests/update
- DELETE /requests/delete

### Search
- GET /search

### Admin
- GET /admin/dashboard
- POST /admin/actions

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Contact

Your Name - your.email@example.com 