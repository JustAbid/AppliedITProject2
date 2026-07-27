import { Compass } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Button from "../components/ui/Button";
import EmptyState from "../components/ui/EmptyState";
import "../styles/NotFound.css";

function NotFound() {
  return (
    <>
      <Navbar />
      <main className="section not-found-page">
        <div className="container">
          <EmptyState
            icon={Compass}
            title="Page not found"
            description="The page you're looking for doesn't exist or may have moved. Let's get you back on track."
            action={
              <div className="not-found-actions">
                <Button to="/">Return Home</Button>
                <Button to="/events" variant="secondary">
                  Browse Events
                </Button>
              </div>
            }
          />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default NotFound;
