
import { Link } from "react-router-dom";
import { Container } from "./Container";
import { Separator } from "../components/ui/separator";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border bg-muted/30">
      <Container>
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-primary rounded flex items-center justify-center text-white text-xs font-bold">
                SL
              </div>
              <span className="font-semibold">Student Learning Hub</span>
            </div>

            <nav className="flex flex-wrap justify-center gap-6">
              <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link to="/ask" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Ask Question
              </Link>
              <Link to="/search" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Library
              </Link>
              <Link to="/profile" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Community
              </Link>
            </nav>
          </div>

          <Separator className="my-6" />

          <div className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Student Learning Hub. All rights reserved.
          </div>
        </div>
      </Container>
    </footer>
  );
}
