# Real-Time Chat Application

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

1. Clone the repository:git clone <repository_url>
   cd <project_directory>

2. Install dependencies:
   Backend: cd server
   npm install

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
CLOUDINARY_NAME=your-cloudinary-name
CLOUDINARY_API_KEY=your-cloudinary-api-key
CLOUDINARY_API_SECRET=your-cloudinary-api-secret
Frontend (client/.env):REACT_APP_API_URL=http://localhost:5001
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

5. Open your browser and visit http://localhost:3000.

Deployment
The application is designed for seamless deployment:
• Frontend: Deployable on platforms like Netlify or Vercel.
• Backend: Deployable on platforms like Heroku or Render.

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
