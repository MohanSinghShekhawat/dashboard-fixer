import Header from '@/components/layout/Header';
import BottomNav from '@/components/layout/BottomNav';
import ScamDatabase from '@/components/safety/ScamDatabase';
import SOSButton from '@/components/safety/SOSButton';

const ScamsPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background pb-16 md:pb-0">
      <Header />
      <main className="flex-1 container max-w-2xl mx-auto">
        <ScamDatabase />
      </main>
      <SOSButton />
      <BottomNav />
    </div>
  );
};

export default ScamsPage;
