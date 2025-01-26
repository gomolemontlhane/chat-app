# GomoChat Application

A fully functional real-time chat application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and Socket.IO for seamless live communication. This application offers features such as user authentication, profile management, image uploads within messages, and online user tracking, with a responsive and modern design.

<div style="display: flex; gap: 10px;">
  <img src="/frontend/public/GomoChatapp screenshot.png" alt="Demo App" style="width: 45%; height: auto;" />
  <img src="/frontend/public/chatscreen.png" alt="Demo App" style="width: 45%; height: auto;" />
</div>

# Features

- `Real-Time Messaging:` Users can send and receive messages instantly via WebSockets.
- `User Authentication:` Secure signup, login, and logout functionality powered by JWT (JSON Web Tokens).
- `Profile Management:` Users can update their profile details, including uploading profile images.
- `Image Uploads:` Users can upload images directly within chat messages.
- `Online User Tracking:` Displays a list of currently online users for improved engagement.
- `Responsive Design:` Fully adaptable UI for desktops, tablets, and mobile devices.
- `Theme Management:` Users can switch between multiple themes to personalize their experience.
- `Error Handling:` Robust error-handling mechanisms to enhance the user experience.

# Technology Stack

## Frontend

- `React.js:` For building the user interface.
- `Zustand:` Lightweight state management for React.
- `Axios:` HTTP client for API requests.
- `Tailwind CSS & Daisy UI:` For responsive and beautiful styling.

## Backend

- `Node.js:` Server-side JavaScript runtime.
- `Express.js:` Web framework for the backend.
- `Mongoose:` MongoDB object modeling for Node.js.
- `Socket.IO:` Real-time communication between users.
- `Cloudinary:` Image hosting and management.
- `JWT:` Secure token-based authentication.

## Database

- `MongoDB:` NoSQL database for storing user data, messages, and more.

# Setup and Installation

## Prerequisites

- Node.js
- MongoDB
- Cloudinary account for image uploads (optional).

## Steps

1. Clone the repository:

```bash
git clone https://github.com/gomolemontlhane/chat-app
cd chat-app
```

2. Install dependencies:

- Backend:

```bash
cd server
npm install
```

- Frontend:

```bash
cd client
npm install
```

3. Configure environment variables:Create .env files in both the server and client directories with the following:

- Backend `(server/.env)`:

```env
PORT=5001
MONGO_URI=your-mongodb-connection-string
JWT_SECRET=your-jwt-secret
CLOUDINARY_CLOUD_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
NODE_ENV=developmnent
```

- Frontend (client/.env):

```bash
REACT_APP_API_URL=http://localhost:5001
```

4. Start the development servers:

- Backend:

```bash
cd server
npm start
```

- Frontend:

```bash
cd client
npm start
```

5. Open your browser and visit http://localhost:5173.

## Postman API Testing

This section outlines the API testing performed using Postman to verify the backend functionality of the chat application. The tests covered key endpoints, focusing on authentication, user management, and message handling.

### Downloading and Setting up Postman

To begin testing the API, you need to download and install Postman from the official website:
https://www.postman.com/downloads/
Once installed, you can start creating collections and requests to test the API

# Realtime Chat Application with MERN Stack, React.js, and Socket.io

## API Testing with Postman

This section guides you through setting up and running Postman tests for the backend API. These tests verify core functionality, focusing on authentication and user management.

**1. Setting up Postman:**

- **Create a New Collection:** In Postman, create a new collection (e.g., "Chat App API Tests").
- **Create Requests:** Add requests for each endpoint within your collection:

  - **`POST /api/auth/signup`:** Use a JSON body with `email`, `password`, and (if needed) `username`. Example:

    ```json
    {
      "email": "testuser@example.com",
      "password": "securePassword123",
      "username": "TestUser"
    }
    ```

  - **`POST /api/auth/login`:** Use a JSON body with `email` and `password`. Example:

    ```json
    {
      "email": "testuser@example.com",
      "password": "securePassword123"
    }
    ```

  - **`POST /api/auth/logout`:** Requires an `Authorization` header with a Bearer token:

    ```
    Authorization: Bearer YOUR_JWT_TOKEN
    ```

  - **`GET /api/auth/check`:** Requires an `Authorization` header with a Bearer token (same as logout):
    ```
    Authorization: Bearer YOUR_JWT_TOKEN
    ```

- **Add Tests:** For each request, add tests using Postman's scripting capabilities (JavaScript). Example tests:

  ```javascript
  pm.test("Status code is 200", () => {
    pm.response.to.have.status(200);
  });

  pm.test("Response body has a token", () => {
    let jsonData = pm.response.json();
    pm.expect(jsonData).to.have.property("token");
  });
  ```

  Adapt these tests to check for appropriate status codes and data in the response body for each endpoint.

**2. Running the Tests:**

- Save your requests and tests.
- Run each request individually or run the entire collection.

**3. Important Considerations:**

- Replace `YOUR_JWT_TOKEN` with the actual JWT token obtained after a successful login.
- Adjust tests based on your API's responses and error handling.
- The base URL (`http://localhost:5001`) should be updated if your API runs on a different address.

This guide provides a basic framework for testing. Thorough testing should include various scenarios, including edge cases and error conditions. A more comprehensive test suite might be included in a separate file or repository.

**Key Tests Performed:**

This section details the API testing performed using Postman to validate the backend functionality. Tests focused on authentication and user management using the following endpoints:

- **`http://localhost:5001/api/auth/signup` (POST):** This endpoint handles user registration. Postman tests verified successful signup with valid data, handling of missing required fields, and error responses for duplicate emails or invalid input . Assertions checked the HTTP status code (201 for success, 400 for bad requests) and the response body (JWT token presence upon success).

- **`http://localhost:5001/api/auth/login` (POST):** This endpoint manages user login. Postman tests validated successful login with correct credentials and appropriate error handling for incorrect credentials . Assertions checked the HTTP status code (200 for success, 401 for unauthorized) and JWT token presence in the successful response.

- **`http://localhost:5001/api/auth/logout` (POST):** This endpoint handles user logout. Tests verified successful logout and handled potential errors.

- **`http://localhost:5001/api/auth/check` (GET):** This endpoint likely checks authentication status. Tests verified that the endpoint returns appropriate responses (e.g., user data if authenticated, error otherwise) based on the presence or absence of a valid JWT token in the request headers.

**Postman Collection:**

A Postman collection containing all the API tests is available [link to Postman collection if applicable]. This collection can be directly imported into Postman for execution and modification.

# Deployment

The application is designed for seamless deployment:

- Frontend: Deployable on platforms like Netlify or Vercel.
- Backend: Deployable on platforms like Heroku or Render.

# Deployment Steps

1. Set up environment variables on your chosen hosting platform.
2. Build and deploy the frontend:

```bash
cd client
npm run build
```

Deploy the backend using your preferred service, ensuring that the database connection and API routes are configured correctly.

# Folder Structure

```plaintext
Frontend (client/)
client/
├── src/
│ ├── components/ # Reusable UI components
│ ├── pages/ # Pages for the application
│ ├── context/ # Zustand stores and contexts
│ ├── assets/ # Static assets like images
│ ├── services/ # API call functions
│ └── styles/ # Tailwind and custom styles
```

Backend (server/)

```plainttext
server/
├── models/ # MongoDB schemas
├── routes/ # Express.js API routes
├── controllers/ # Route logic and business rules
├── middlewares/ # Authentication and error handling
├── utils/ # Utility functions
└── server.js # Main server entry point
```

# Future Enhancements

- Add typing indicators for real-time feedback.
- Implement read receipts for messages.
- Support for voice and video calls.
- Introduce push notifications for new messages.
- Enhance performance optimization for large-scale use.

# Contributing

Contributions are welcome! Follow these steps to contribute:

1. Fork the repository.
2. Create a feature branch:

```bash
git checkout -b feature-name
```

3. Commit your changes:

```bash
git commit -m "Add feature-name"
```

4. Push to the branch: git push origin feature-name

5. Open a pull request.

# License

This project is licensed under the MIT License.

# Acknowledgements

- React.js
- Node.js
- MongoDB
- Socket.IO
- Tailwind CSS
- Cloudinary

Feel free to ask if you'd like to include additional sections or modify this further!
