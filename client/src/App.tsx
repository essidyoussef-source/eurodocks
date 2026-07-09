/**
 * App — Euro Docks Service
 * Design: Deep Navy Editorial
 * Routes: Home, Services, Freight, Terminal, Contact
 */

import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Freight from "./pages/Freight";
import Terminal from "./pages/Terminal";
import Contact from "./pages/Contact";
import About from "./pages/About";

function Layout({ children, noPadding = false }: { children: React.ReactNode; noPadding?: boolean }) {
  return (
    <div className="flex flex-col min-h-screen" style={{ background: 'oklch(0.08 0.025 200)' }}>
      <Navigation />
      <main className="flex-1" style={{ paddingTop: noPadding ? '0' : '88px' }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={() => <Layout noPadding><Home /></Layout>} />
      <Route path="/services" component={() => <Layout><Services /></Layout>} />
      <Route path="/freight" component={() => <Layout><Freight /></Layout>} />
      <Route path="/terminal" component={() => <Layout><Terminal /></Layout>} />
      <Route path="/contact" component={() => <Layout><Contact /></Layout>} />
      <Route path="/about" component={() => <Layout><About /></Layout>} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
