# Arcade Business Frontend

IF the server is online you can visit at:
https://arcadeclient.onrender.com/

A React-based frontend for an arcade credit system. This project enables arcade owners to sell credits to business clients, who can then generate and manage QR codes for end users to redeem on arcade machines.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Roles](#roles)
- [Installation & Setup](#installation--setup)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

This project simulates a credit system for arcade machines by generating QR codes that users can scan to receive credits. Administrators and business owners have separate dashboards to manage relevant data, while end users simply redeem the QR codes at the arcade machines.

---

## Tech Stack

- **React** – Frontend library
- **Vite** – Build tool for fast project setup and development
- **Tailwind CSS** – Utility-first CSS framework
- **Axios** – HTTP client for API requests
- **JWT** – Token-based authentication for secure API access

---

## Features

1. **Admin Dashboard**

   - View and manage all business owners, end users, and credit transactions.
   - Generate and display QR codes for arcade credits.

2. **Business Owner Dashboard**

   - Manage credits for their business.
   - Track usage and generate new QR codes for end users.
   - Access usage analytics (optional, if implemented).

3. **End User Interface**
   - Redeem QR codes for arcade credits.
   - (Potentially) view personal credit balance and usage history.

---

## Roles

- **Administrator**  
  Full system access: manage user roles, track transactions, generate QR codes.

- **Business Owner**  
  Limited access: manage QR codes and credits within their own business context.

- **End User**  
  Basic usage: view QR codes and redeem credits on arcade machines.

---

## Installation & Setup

1. **Clone or Fork the Repository**
   ```bash
   git clone https://github.com/XxXNe0XxX/ArcadeClient.git
   cd ArcadeClient
   Install Dependencies
   ```

bash
Copy code
npm install
or

bash
Copy code
yarn install
Environment Variables

Create a .env file in the project root (if needed).
Add any environment variables required by your setup (e.g., API base URL, JWT secret, etc.).
Start the Development Server

bash
Copy code
npm run dev
or

bash
Copy code
yarn dev
By default, it should be accessible at http://localhost:5173 (depending on your Vite configuration).

Usage
If the backend server is up and running, you can try the admin panel by visiting the provided URL and logging in with the demo credentials:

Email: admin@gmail.com
Password: admin
Once logged in, explore the dashboards, generate QR codes, and manage arcade credit transactions.

Contributing
Contributions are welcome! If you would like to improve this project:

Fork the repository.
Create a new branch for your feature or bug fix.
Implement your changes and commit.
Open a Pull Request, describing your changes.
Feedback, suggestions, and issue reports are also much appreciated. Please open an issue if you find a bug or have a feature request.

License
This project is available under the MIT License. Feel free to modify and distribute it as you see fit.

Thank you for checking out the Arcade Business Frontend!
If you have any questions, feel free to contact the repository owner or open an issue.

IF the server is online you can visit at:
https://arcadeclient.onrender.com/
