import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/layout/Header';
import CrowdAnalyzer from '@/components/admin/CrowdAnalyzer';
import LocationsList from '@/components/admin/LocationsList';
import EntryAnalytics from '@/components/admin/EntryAnalytics';
import AccommodationTab from '@/components/admin/AccommodationTab';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, MapPin, Loader2, BarChart3, Building2 } from 'lucide-react';

const AdminDashboard = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate('/');
    }
  }, [user, isAdmin, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container max-w-5xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6">Government Dashboard</h1>
        
        <Tabs defaultValue="crowd-control" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="crowd-control" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              <span className="hidden sm:inline">Crowd Control</span>
              <span className="sm:hidden">Crowd</span>
            </TabsTrigger>
            <TabsTrigger value="locations" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="hidden sm:inline">Locations</span>
              <span className="sm:hidden">Locs</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              <span className="hidden sm:inline">Entry Analytics</span>
              <span className="sm:hidden">Stats</span>
            </TabsTrigger>
            <TabsTrigger value="accommodation" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span className="hidden sm:inline">Accommodation</span>
              <span className="sm:hidden">Hotels</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="crowd-control">
            <CrowdAnalyzer />
          </TabsContent>

          <TabsContent value="locations">
            <LocationsList />
          </TabsContent>

          <TabsContent value="analytics">
            <EntryAnalytics />
          </TabsContent>

          <TabsContent value="accommodation">
            <AccommodationTab />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
