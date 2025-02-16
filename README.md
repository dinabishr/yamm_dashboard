![localhost_5173_ (3)](https://github.com/user-attachments/assets/d57ee0fe-2bed-4cb5-9e43-baccd5454883)# Refund Orders Dashboard  

## Overview  
This project is a **Refund Orders Dashboard**, featuring a **navigation sidebar** and a **table** displaying refund order details. Users can update order decisions, toggle activity status, and view detailed order information.  

## Features  
- **Reusable Table Component**: Dynamic and adaptable to different data structures with pagination (15 rows per page).  
-  **Order Management**: Update refund decisions, toggle activity status, and view order details.  
-  **API Integration**: Fetches data from a **mock RESTful API** using JSON Server.  
- **Real-time UI Updates**: Any action reflects instantly without a page reload.  
- **Toaster Notifications**: Displays success/error messages upon user actions.  
- **Responsive & Accessible**: Built with **MUI** for a modern, mobile-friendly UI.  

## Tech Stack  
- ⚛ **React.js + TypeScript** – Strongly typed, scalable frontend   
- ⚡ **Vite** – Fast development environment  
- 🎨 **Material UI (MUI)** – UI component library  
- 🗄 **JSON Server** – Mock API  
- 🔀 **React Router** – Client-side navigation  
- 🔔 **React Toastify** – Notifications  
- 📌 **React Icons** – Icon components  
 

##  Installation & Setup  

### 1️⃣ Clone the Repository  
```sh  
git clone https://github.com/dinabishr/yamm_dashboard.git  
cd yamm_dashboard
```
### 2️⃣ Install Dependencies
```sh
npm install
```
### 3️⃣ Start the Mock API Server
```sh
json-server --watch ./src/db.json --port 5000
```
### 4️⃣ Run the Project
```sh
npm run dev
```
## 📂 Folder Structure

### src  
│── assets/           # Static assets (logo, images)  
│── components/       # Reusable components (CustomTable, Navbar, etc.)  
│── types/            # TypeScript type definitions 
│── api.ts             # API functions (fetching refund orders)  
│── db.json           # Mock database for JSON Server  
│── App.tsx           # Main app component  
│── main.tsx          # Application entry point  

## How It Works
- The Orders page fetches refund orders from db.json.
- Users can update decisions, toggle status, and view details.
- The Order Details page shows items for a specific refund order.
- Changes are reflected instantly in the table without reloading.

## 📸 Screenshots

### Refund Orders Page - Desktop
![Refund Orders Page - Desktop](/public/main-desktop.png)

### Order Details - Desktop
![Order Details - Desktop](/public/orderdetails%20desktop.png)

### Responsive Navbar (iPhone 12 Pro)
![Responsive Navbar](/public/responsive%20navbar%20-(iPhone%2012%20Pro).png)

### Order Details (iPhone 12 Pro)
![Order Details](/public/orderdetails-(iPhone%2012%20Pro).png)

### Refund Orders (iPad Pro)
![Refund Orders (iPad Pro)](/public/refund%20orders%20(iPad%20Pro).png)



