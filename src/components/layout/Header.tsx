import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Shield, LogOut, Settings } from 'lucide-react';

const Header = () => {
  const { user, isAdmin, signOut } = useAuth();

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 border-b border-border">
      <div className="container flex items-center justify-between h-14 px-4">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Shield className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg hidden sm:inline">Royal Guard</span>
        </Link>

        <div className="flex items-center gap-2">
          {user && isAdmin && (
            <Link to="/admin">
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Admin</span>
              </Button>
            </Link>
          )}
          
          {user ? (
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="h-4 w-4 mr-1" />
              <span className="hidden sm:inline">Sign Out</span>
            </Button>
          ) : (
            <Link to="/auth">
              <Button size="sm">Sign In</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
