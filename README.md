# Dietary Guide Web Application

A modern, responsive web application for **Dietary Guide** providing personalized nutrition insights, diet plans, health blogs, and saved address/checkout systems.

[![Deployment Status](https://img.shields.io/badge/Vercel-Deployed-success?logo=vercel)](https://dietaryguide-web.vercel.app)
[![Live Site](https://img.shields.io/badge/Website-dietaryguide.in-blue)](https://dietaryguide.in)

---

## ✨ Features

- **Personalized Nutrition & Diet Guidance**: Tailored meal plans and dietary advice.
- **Hybrid Blog System**: Static SEO-optimized articles alongside dynamic Supabase-backed community posts.
- **Address Book & Checkout System**: Multi-address management with home/work tags and streamlined checkout.
- **Responsive Modern UI**: Styled with Tailwind CSS, shadcn/ui components, and interactive micro-animations.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling & UI**: Tailwind CSS, shadcn/ui, Radix UI, Lucide Icons
- **Backend & Database**: Supabase & Firebase (Firestore)
- **Deployment & Hosting**: Vercel (Native Integration)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have Node.js (v18+) and npm installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:NavdhiIITK/dietaryguide-web.git
   cd dietaryguide-web
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment Variables:
   Copy `.env.example` to `.env` and fill in your Supabase and Firebase configuration keys.
   ```bash
   cp .env.example .env
   ```

4. Start the local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:8080` in your browser.

---

## 🌐 Deployment & CI/CD

This application is deployed on **Vercel** with native GitHub integration:

- **Production URL**: [dietaryguide.in](https://dietaryguide.in)
- **Vercel Mirror**: [dietaryguide-web.vercel.app](https://dietaryguide-web.vercel.app)
- **Auto-Deployment**: Every push to the `main` branch automatically triggers a production deployment on Vercel.

---

## 📜 License

Private Repository - All Rights Reserved.


