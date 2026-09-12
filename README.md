# 🎨 Media Search & Collection App (Redux Toolkit)

A modern, high-performance web application built with **React 19**, **Redux Toolkit**, and **Vite**. Search through millions of high-resolution photos and videos powered by the **Unsplash** and **Pexels** APIs, preview media in interactive modals, save favorites to your personal collections, and enjoy smooth animated transitions.

---

Live Link: https://pixelvaultp.netlify.app/

 ![alt text](<Screenshot 2026-09-12 120534-1.png>)

## ✨ Features

- 🔍 **Multi-Source Media Search**: Seamlessly search photos via **Unsplash API** and videos via **Pexels API**.
- ⚡ **Centralized State with Redux Toolkit**:
  - `searchSlice`: Handles API queries, media type switching (photos/videos), and pagination states.
  - `collectionSlice`: Manages personal saved items, custom collections, and local storage state.
  - `toastSlice`: Powers dynamic toast notifications for user interactions.
- 🎬 **Interactive Media Modal**: Full-screen photo viewing and video playback with high-res details, contributor info, download options, and quick collection saving.
- 📁 **Personal Collections**: Organize and curate saved photos and videos into custom groups with instant filtering and removal capability.
- 📑 **Dynamic Tabs & Pagination**: Effortless tab switching between media types and page navigation.
- 🔔 **Toast Notification System**: Instant feedback when adding/removing media items.
- 🎨 **Modern UI & Micro-Animations**: Styled using **Tailwind CSS** and **DaisyUI** with sleek micro-interactions powered by **Framer Motion**.

---

## 🛠️ Tech Stack & Dependencies

| Category | Technology / Library |
| :--- | :--- |
| **Framework & Compiler** | React 19, Vite 8, React Compiler |
| **State Management** | Redux Toolkit (`@reduxjs/toolkit`), React Redux |
| **Routing** | React Router v7 |
| **API Client** | Axios |
| **Styling & UI Components** | Tailwind CSS v4, DaisyUI, React Icons |
| **Animations** | Framer Motion |

---
 


 
 
```


---

## 🔑 Environment Variables Setup

Create a `.env` file in the root directory of your project and add your Unsplash and Pexels API access keys:

```env
VITE_UNSPLASH_KEY=your_unsplash_access_key_here
VITE_PEXELS_KEY=your_pexels_api_key_here
```

> **Note:**
> - Get an Unsplash API key from the [Unsplash Developer Portal](https://unsplash.com/developers).
> - Get a Pexels API key from the [Pexels API Documentation](https://www.pexels.com/api/).

---

## 🚀 Getting Started

### Prerequisites

Ensure you have **Node.js** (v18 or higher) installed on your system.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/islammdsohan603/Redux_Toolkit_Learning.git
   cd toolkit
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root folder as described in the section above.

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`.

---

## 📜 Available Scripts

In the project directory, you can run:

- `npm run dev` — Starts the Vite development server with HMR.
- `npm run build` — Builds the application for production deployment.
- `npm run preview` — Previews the production build locally.
- `npm run lint` — Runs ESLint to check for code formatting and quality issues.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page or submit a pull request.

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
