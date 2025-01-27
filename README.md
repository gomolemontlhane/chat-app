# GomoChat Application

A fully functional real-time chat application built using the MERN stack (MongoDB, Express.js, React.js, Node.js) and Socket.IO for seamless live communication. This application offers features such as user authentication, profile management, image uploads within messages, and online user tracking, with a responsive and modern design.

- Click button to test Demo:
  [![Test Demo App](https://img.shields.io/badge/Demo_App-Click_Here-brightgreen)](https://chat-app-tp31.onrender.com)

  [![Flat Button](https://img.shields.io/badge/Flat_Button-Click_me-brightgreen)](https://github.com)

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
cd bankend
npm start
```

- Frontend:

```bash
cd frontend
npm start
```

5. Open your browser and visit http://localhost:5173.

# Testing

## backend testing

- Run:

```bash
cd backend
npm run dev
```

This project includes comprehensive API testing using Postman. For detailed instructions on setting up and running these tests, please refer to the dedicated testing documentation:

[Detailed Postman API Testing Instructions](./test/README.md)

The tests cover key aspects of the application's functionality, including authentication, user management, and message handling. The test suite ensures the robustness and reliability of the backend API.

## frontend testing

- Run:

```bash
cd frontend
npm run dev
```

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

## Team and Roles

**Gomolemo Ntlhane (Backend Developer):**

- Designed and implemented the backend using the MERN stack (MongoDB, Express.js, React, Node.js).
- Developed and tested all backend APIs.
- Designed and managed the MongoDB database.
- Compiled the whole project

**Ncediso Nkambule (Frontend Developer):**

- Developed the user interface using React.js.
- Designed and implemented the user experience (UX).
- Ensured seamless integration with the backend API.

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
