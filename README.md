📌 Task Management System — MERN Stack
Magnet Brains MERN Developer Assessment Project

A fully functional Task Management System built using the MERN stack, featuring authentication, task prioritization, pagination, and deployment on Render + Netlify.
The project enables users to create, manage, update, delete, and organize tasks based on priority and status with a clean, responsive UI.

🚀 Live Demo Links
Service	URL
Frontend (Netlify):https://magnetbrainstaskmanager.netlify.app/
Backend (Render):https://magentbrainstest.onrender.com/
GitHub Repository	https://github.com/aadishrivastava/MagentBrainsTest

🧠 Features
Feature	Status
User authentication (JWT + bcrypt)	✔
Task creation with title, description, due date & priority	✔
Edit, delete & view full task details	✔
Pagination & AJAX requests	✔
Status update (Pending / In-progress / Completed)	✔
Priority-based visual task boards	✔
Description preview on dashboard	✔
Color-coded priority lists (High / Medium / Low)	✔
Display logged-in username in Navbar	✔
Protected routes	✔
MongoDB Atlas integration	✔
Frontend + Backend separated	✔
Deployment on Netlify & Render	✔
🛠 Tech Stack

MongoDB Atlas

Express.js

React.js (Vite)

Node.js

Tailwind CSS

Axios

JWT & bcryptjs

Render & Netlify

📁 Project Structure
MagentBrainsTest
│── Backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── package.json
│
│── Frontend
│   └── my-frontend
│       ├── src
│       │   ├── components
│       │   ├── pages
│       │   ├── api.js
│       │   ├── App.jsx
│       │   └── main.jsx
│       ├── index.html
│       ├── tailwind.config.js
│       ├── postcss.config.js
│       └── package.json
│
│── README.md
│── .gitignore

🔧 Installation & Setup
Clone the repository
git clone https://github.com/aadishrivastava/MagentBrainsTest.git
cd MagentBrainsTest

Backend setup
cd Backend
npm install
npm run dev

Frontend setup
cd ../Frontend/my-frontend
npm install
npm run dev

🔐 Environment Variables (Backend/.env)
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_secret_key
JWT_EXPIRES_IN=7d

🌍 Deployment Instructions
Frontend (Netlify)
Setting	Value
Base Directory	Frontend/my-frontend
Build Command	npm run build
Publish Directory	dist
Backend (Render)
Setting	Value
Root Directory	Backend
Build Command	npm install
Start Command	npm start
🧠 Future Enhancements

Drag & Drop Kanban board

Notification/Toast system

Global search & filters for tasks

Admin task assignment

Realtime updates with Socket.IO

🧑‍💻 Author

Aadi Shrivastava
📍 Bhopal, India
📧 Email: aadishrivastava13@gmail.com
🔗 GitHub: https://github.com/aadishrivastava
🔗 LinkedIn: https://www.linkedin.com/in/aadishrivastava

📜 License

This project is licensed under the MIT License – feel free to use and modify for learning or production.

MIT License

Copyright (c) 2025 Aadi [...]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...

⭐ Support

If you find this project valuable,
please star the repository ⭐
It encourages more enhancements and growth!

🎉 Thanks Magnet Brains Team for the opportunity!
