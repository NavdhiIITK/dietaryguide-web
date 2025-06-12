
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from "@/components/ui/toaster";
import App from './App.tsx'
import './index.css'

// Create the root first
const root = createRoot(document.getElementById("root")!);

// Then render with proper error boundaries and HelmetProvider
root.render(
  <HelmetProvider>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </HelmetProvider>
);
