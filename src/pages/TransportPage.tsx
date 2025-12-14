import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import VerifiedTransport from '@/components/safety/VerifiedTransport';
import BuddyWatch from '@/components/safety/BuddyWatch';

const TransportPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container max-w-2xl mx-auto p-4 pb-24 space-y-6">
        <h1 className="text-2xl font-bold">Safety Tools</h1>
        <VerifiedTransport />
        <BuddyWatch />
      </main>
      <BottomNav />
    </div>
  );
};

export default TransportPage;
