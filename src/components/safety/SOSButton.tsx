import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { AlertTriangle, Phone, MapPin, X } from 'lucide-react';

const SOSButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const emergencyContacts = [
    { name: 'Police', number: '100', icon: '🚔' },
    { name: 'Tourist Helpline', number: '1363', icon: '🏛️' },
    { name: 'Ambulance', number: '102', icon: '🚑' },
    { name: 'Women Helpline', number: '1091', icon: '👩' },
  ];

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 md:bottom-6 h-16 w-16 rounded-full bg-destructive hover:bg-destructive/90 shadow-lg animate-pulse-scale z-40"
        size="icon"
      >
        <AlertTriangle className="h-8 w-8 text-destructive-foreground" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <div className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-6 w-6" />
              <DialogTitle className="text-destructive">Emergency SOS</DialogTitle>
            </div>
            <DialogDescription>
              Contact emergency services immediately
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 mt-4">
            {emergencyContacts.map((contact) => (
              <a
                key={contact.number}
                href={`tel:${contact.number}`}
                className="flex items-center justify-between p-4 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{contact.icon}</span>
                  <div>
                    <p className="font-medium">{contact.name}</p>
                    <p className="text-sm text-muted-foreground">{contact.number}</p>
                  </div>
                </div>
                <Phone className="h-5 w-5 text-primary" />
              </a>
            ))}
          </div>

          <div className="mt-4 p-3 bg-secondary rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="text-muted-foreground">Your location will be shared with emergency services</span>
            </div>
          </div>

          <Button variant="outline" onClick={() => setIsOpen(false)} className="mt-2">
            <X className="h-4 w-4 mr-2" />
            Close
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SOSButton;
