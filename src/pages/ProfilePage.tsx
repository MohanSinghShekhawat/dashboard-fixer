import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Shield, LogOut, LogIn } from 'lucide-react';
import SOSButton from '@/components/safety/SOSButton';

const ProfilePage = () => {
  const { user, isAdmin, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col bg-background pb-16 md:pb-0">
        <Header />
        <main className="flex-1 container max-w-2xl mx-auto p-4 flex items-center justify-center">
          <Card className="w-full max-w-sm text-center">
            <CardContent className="pt-6 space-y-4">
              <User className="h-16 w-16 mx-auto text-muted-foreground" />
              <div>
                <h2 className="text-xl font-semibold">Not Signed In</h2>
                <p className="text-muted-foreground text-sm mt-1">
                  Sign in to access your profile and save preferences
                </p>
              </div>
              <Button onClick={() => navigate('/auth')} className="w-full">
                <LogIn className="h-4 w-4 mr-2" />
                Sign In
              </Button>
            </CardContent>
          </Card>
        </main>
        <SOSButton />
        <BottomNav />
      </div>
    );
  }

  const initials = user.email?.substring(0, 2).toUpperCase() || 'U';

  return (
    <div className="min-h-screen flex flex-col bg-background pb-16 md:pb-0">
      <Header />
      <main className="flex-1 container max-w-2xl mx-auto p-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Profile</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-lg">{user.email}</h3>
                  {isAdmin && (
                    <Badge className="bg-primary">
                      <Shield className="h-3 w-3 mr-1" />
                      Admin
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">Tourist Account</p>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{user.email}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Button
          variant="destructive"
          onClick={handleSignOut}
          className="w-full"
        >
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </Button>
      </main>
      <SOSButton />
      <BottomNav />
    </div>
  );
};

export default ProfilePage;
