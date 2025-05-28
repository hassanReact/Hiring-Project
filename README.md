# 🔐 Full Stack Auth Project

Welcome to your Full Stack Authentication project built with **Node.js (Express)** for the backend and **React (Vite)** for the frontend. This app provides email-based verification, JWT authentication, role selection, and protected routing.

---

## 📁 Project Structure

/backend -> Express.js API
/frontend -> React.js (Vite) Client

---

## ⚙️ Backend Setup (`/backend`)

### ✅ Requirements
- Node.js v16+
- Postgres (running locally with Prisma ORM)

### 📄 .env Configuration

Create a `.env` file in the `backend` directory with the following:

```env
DATABASE_URL=YOUR_DB_NAME
GMAIL_FROM=youremail@gmail.com
GMAIL_APP_PASSWORD=your App Passowrd
JWT_SECRET=any_words
client_uri=http://localhost:5173
NODE_ENV=development

📦 Install Dependencies

cd backend
npm install

🚀 Start the Server

npm run dev

💻 Frontend Setup (/frontend)
📄 .env Configuration
Create a .env file in the frontend directory with the following:

env

VITE_API_URL=http://localhost:4000


📦 Install Dependencies

cd frontend
npm install


🚀 Start the Client
bash
Copy
Edit
npm run dev


✨ Features
📧 Email OTP verification

🔐 JWT Authentication

🔄 Role-based Redirection

🧭 Protected Routing

⚡ Vite for fast frontend builds

🛠️ Tech Stack
Layer	Tech
Frontend	React + Vite
Backend	Node.js + Express
Auth	JWT (JSON Web Tokens)
Database	PostGres
Email	Nodemailer (Gmail App Password)

🙋‍♂️ Author
Hassan Kashif
📫 hassank1751@gmail.com

📝 License
This project is licensed under the MIT License.

Let me know if you’d like to include screenshots, Postman docs, or any contribution guidelines.
