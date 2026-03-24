# AI Flow Visualizer (MERN Developer Task)

A full-stack MERN application that empowers users to query AI language models via an interactive, node-based flow interface. Architected with React Flow, Express, MongoDB, and the OpenRouter API.

## 🚀 Features
- **Visual Node Editor:** Modern UI canvas built on top of React Flow.
- **AI Integration:** Live neural text generation via the OpenRouter API infrastructure.
- **Database Persistence:** Save execution prompts and generated AI responses directly to MongoDB.
- **History Archive:** Sliding side-panel to retrieve and view previously saved workflows.
- **Algorithmic Noir Aesthetic:** Ultra-premium, dark-themed UI featuring glassmorphism, responsive hover states, and neon accents.

## 🛠️ Technology Stack
- **Frontend:** React, Vite, React Flow (@xyflow/react), Framer Motion, Lucide React, pure CSS
- **Backend:** Node.js, Express.js, Mongoose, CORS, Axios
- **Database:** MongoDB
- **AI:** OpenRouter API (Supports free-tier open source LLMs)

---

## 🏃‍♂️ How to Run Locally

### Prerequisites
- Node.js (v18+)
- MongoDB (Local instance or MongoDB Atlas cluster)
- An OpenRouter API Key

### 1. Clone the Repository
```bash
git clone https://github.com/manish2kumar/MERN-App.git
cd MERN-App
```

### 2. Backend Initialization
Open a terminal and navigate to the backend directory:
```bash
cd backend
npm install
```

Create a `.env` file in the root of the `backend` folder and add your credentials:
```env
PORT=5001
MONGO_URI=your_mongodb_connection_string_here
OPENROUTER_API_KEY=your_openrouter_api_key_here
```

Start the backend API server:
```bash
npm run dev
# Server will start on http://localhost:5001
```

### 3. Frontend Initialization
Open a **new** terminal window and navigate to the frontend directory:
```bash
cd frontend
npm install
```

Start the Vite development server:
```bash
npm run dev
# Application will be accessible at http://localhost:5173
```

---
