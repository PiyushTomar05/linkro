# Linkro - Recruitment Platform 🚀

Linkro is a modern, full-stack recruitment platform designed to connect recruiters with top talent. Built with the MERN stack, it offers a seamless experience for managing job postings, reviewing applications, and streamlining the hiring process.

## 🌟 Features

*   **Recruiter Dashboard**: A comprehensive dashboard for recruiters to manage job listings and applications.
*   **User Profiles**: Detailed profiles for candidates and recruiters.
*   **Authentication**: Secure login and registration flows using JWT.
*   **Job Management**: Create, update, and manage job postings efficiently.
*   **Responsive Design**: Fully responsive UI built with Tailwind CSS for a premium experience on all devices.
*   **Real-time Updates**: (If applicable) Dynamic interactions for a smooth user experience.

## 🛠️ Tech Stack

**Frontend:**
*   **React (Vite)**: Fast and modern frontend framework.
*   **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
*   **React Router**: For seamless client-side navigation.
*   **Axios**: For handling API requests.
*   **React Hot Toast**: For elegant notifications.

**Backend:**
*   **Node.js & Express.js**: Robust backend runtime and framework.
*   **MongoDB & Mongoose**: Flexible NoSQL database for storing user and job data.
*   **JWT (JSON Web Tokens)**: For secure authentication/authorization.
*   **Multer**: For handling file uploads (resumes, profile pictures).

## 🚀 Getting Started

Follow these steps to set up the project locally.

### Prerequisites

*   [Node.js](https://nodejs.org/) (v16 or higher)
*   [MongoDB](https://www.mongodb.com/) (Local or Atlas connection)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/PiyushTomar05/linkro.git
    cd linkro
    ```

2.  **Install Dependencies**
    We have a convenient script to install dependencies for both the root, client, and server at once:
    ```bash
    npm run install-all
    ```
    *Alternatively, you can install them manually:*
    ```bash
    npm install
    cd client && npm install
    cd ../server && npm install
    ```

3.  **Environment Configuration**
    Create a `.env` file in the `server` directory and add your configuration variables:
    ```env
    PORT=5000
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    ```
    *(Note: Add any other necessary env variables here)*

### Running the Application

To run both the client and server concurrently in development mode:

```bash
npm run dev
```

*   **Frontend**: http://localhost:5173
*   **Backend**: http://localhost:5000 (or your configured port)

## 📂 Project Structure

```
linkro/
├── client/                 # React Frontend
│   ├── src/
│   ├── public/
│   └── ...
├── server/                 # Express Backend
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── ...
│   └── ...
├── package.json            # Root configuration & scripts
└── README.md              # Project documentation
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
