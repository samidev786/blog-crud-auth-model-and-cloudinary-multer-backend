# 🚀 blog-crud-auth-model-and-cloudinary-multer-backend

This project is a backend API for a blog application, featuring robust user authentication, CRUD operations for blog posts, and integration with Cloudinary for image storage.

## ✨ Features

*   **User Authentication:** Secure user registration, login, and password reset with OTP verification.
*   **Blog Post Management:** Full CRUD (Create, Read, Update, Delete) functionality for blog posts.
*   **Image Uploads:** Seamless image uploads for blog posts using Multer and Cloudinary.
*   **Authorization:** Role-based access control (User and Admin roles).
*   **Data Validation:** Input validation for user sign-up using Yup.
*   **Environment Configuration:** Manages sensitive data and configurations using Dotenv.

## 🛠️ Tech Stack

*   **Languages:** JavaScript
*   **Frameworks:** Node.js, Express.js
*   **Database:** MongoDB (with Mongoose ODM)
*   **Authentication:** JSON Web Tokens (JWT), bcrypt
*   **Image Handling:** Multer, Cloudinary
*   **Utilities:** Nodemon, Dotenv, CORS, Nodemailer, Yup, Yup-Password

## 📚 Table of Contents

*   [Features](#features)
*   [Tech Stack](#tech-stack)
*   [Installation](#installation)
*   [Usage](#usage)
*   [Project Structure](#project-structure)
*   [API Reference](#api-reference)
*   [Contributing](#contributing)
*   [License](#license)
*   [Important Links](#important-links)
*   [Footer](#footer)

## 📥 Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/samidev786/blog-crud-auth-model-and-cloudinary-multer-backend.git
    cd blog-crud-auth-model-and-cloudinary-multer-backend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following variables:

    ```env
    MONGO_URL=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret_key
    CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    SMTP_EMAIL=your_email@gmail.com
    SMTP_APP_PASSWORD=your_gmail_app_password
    ```
    *Note: For `SMTP_EMAIL` and `SMTP_APP_PASSWORD`, you will need to set up an App Password in your Gmail settings if you have 2-factor authentication enabled.*

4.  **Start the server:**
    ```bash
    npm start
    ```
    This will run the server using Nodemon for development, typically on port 8000.

## 💡 Usage

This backend API supports the following functionalities:

### Authentication

*   **Sign Up:** Register a new user.
    *   `POST /auth/signup`
    *   **Request Body:** `{ "name": "John Doe", "email": "john.doe@example.com", "password": "SecureP@ss1" }`
*   **Verify OTP:** Verify the OTP sent to the user's email.
    *   `POST /auth/verify-otp`
    *   **Headers:** `Authorization: Bearer <token_from_signup>`
    *   **Request Body:** `{ "otp": "123456" }`
*   **Login:** Authenticate a user.
    *   `POST /auth/login`
    *   **Request Body:** `{ "email": "john.doe@example.com", "password": "SecureP@ss1" }`
*   **Forgot Password:** Initiate the password reset process.
    *   `POST /auth/forgot-password`
    *   **Request Body:** `{ "email": "john.doe@example.com" }`
*   **Reset Password:** Reset the user's password using a token.
    *   `POST /auth/reset-password`
    *   **Headers:** `Authorization: Bearer <reset_token>`
    *   **Request Body:** `{ "password": "NewSecureP@ss2" }`

### User Profile

*   **Get Profile:** Retrieve the logged-in user's profile information.
    *   `GET /user/profile`
    *   **Requires Authentication:** User must be logged in.

### Blog Posts (Requires authentication and user role)

*   **Create Blog:** Create a new blog post.
    *   `POST /blog/create`
    *   **Requires Authentication:** User must be logged in.
    *   **Form Data:** `title`, `description`, `blogImage` (file).
*   **Get All Blogs:** Retrieve all non-deleted blog posts.
    *   `GET /blog/get`
*   **Get Single Blog:** Retrieve a specific blog post by ID.
    *   `GET /blog/get/:id`
*   **Update Blog:** Update an existing blog post.
    *   `PUT /blog/update/:id`
    *   **Requires Authentication:** Only the author can update.
    *   **Request Body:** `{ "title": "Updated Title", "description": "Updated Description" }` (fields are optional).
*   **Delete Blog:** Soft delete a blog post.
    *   `DELETE /blog/delete/:id`
    *   **Requires Authentication:** Only the author can delete.

## 📁 Project Structure

```
blog-crud-auth-model-and-cloudinary-multer-backend/
├── assets/
│   └── images/
├── config/
│   └── mongo-config.js
├── controllers/
│   ├── authController.js
│   ├── blogController.js
│   └── userController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   ├── blog.js
│   └── user.js
├── routers/
│   ├── authRouter.js
│   ├── blogRouter.js
│   ├── mainRouter.js
│   └── userRouter.js
├── services/
│   ├── multer.js
│   └── sendEmail.js
├── validator/
│   └── validateSignup.js
├── .env (example)
├── package.json
└── server.js
```

## 📄 API Reference

This section provides a detailed breakdown of the API endpoints:

### Authentication Endpoints

| Method | Path             | Description                                       |
| :----- | :--------------- | :------------------------------------------------ | 
| POST   | `/auth/signup`   | Registers a new user.                             |
| POST   | `/auth/verify-otp` | Verifies user OTP for registration.              |
| POST   | `/auth/login`    | Logs in an existing user.                         |
| POST   | `/auth/forgot-password` | Initiates password reset process.             |
| POST   | `/auth/reset-password` | Resets user password using a token.             |

### User Endpoints

| Method | Path           | Description                                  |
| :----- | :------------- | :------------------------------------------- |
| GET    | `/user/profile` | Retrieves the logged-in user's profile.      |

### Blog Endpoints

| Method | Path                | Description                                  |
| :----- | :------------------ | :------------------------------------------- |
| POST   | `/blog/create`      | Creates a new blog post.                     |
| GET    | `/blog/get`         | Retrieves all blog posts.                    |
| GET    | `/blog/get/:id`     | Retrieves a single blog post by ID.          |
| PUT    | `/blog/update/:id`  | Updates an existing blog post.               |
| DELETE | `/blog/delete/:id`  | Deletes a blog post (soft delete).           |

*Note: All blog-related endpoints require authentication and a user role.* 

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request or open an Issue.

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

## 📜 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details. (Note: A LICENSE file was not found in the analysis, this is a default assumption).

## 🔗 Important Links

*   **GitHub Repository:** [samidev786/blog-crud-auth-model-and-cloudinary-multer-backend](https://github.com/samidev786/blog-crud-auth-model-and-cloudinary-multer-backend)

## 📝 Footer

© 2023 [samidev786](https://github.com/samidev786). All rights reserved.

Built with ❤️ using Node.js, Express, MongoDB, Cloudinary, and more!

[Fork](https://github.com/samidev786/blog-crud-auth-model-and-cloudinary-multer-backend/fork) | [Star](https://github.com/samidev786/blog-crud-auth-model-and-cloudinary-multer-backend/stargazers) | [Watch](https://github.com/samidev786/blog-crud-auth-model-and-cloudinary-multer-backend/watchers) | [Issues](https://github.com/samidev786/blog-crud-auth-model-and-cloudinary-multer-backend/issues)


---
**<p align="center">Generated by [ReadmeCodeGen](https://www.readmecodegen.com/)</p>**