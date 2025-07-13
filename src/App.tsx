
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Dashboard from "./pages/Dashboard";
import Organization from "./pages/Organization";
import Strategic from "./pages/Strategic";
import Tasks from "./pages/Tasks";
import Manager from "./pages/Manager";
import Correspondence from "./pages/Correspondence";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background flex">
          <Navigation />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/organization" element={<Organization />} />
              <Route path="/strategic" element={<Strategic />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/correspondence" element={<Correspondence />} />
              <Route path="/manager" element={<Manager />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
