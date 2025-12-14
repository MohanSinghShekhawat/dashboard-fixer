import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { AlertCircle, Shield } from 'lucide-react';

const scams = [
  {
    id: 'fake-taxi',
    title: 'Fake Taxi Meter',
    description: 'Drivers may claim the meter is broken and charge inflated fares.',
    prevention: 'Always insist on using the meter or agree on a fare before starting the journey. Use official prepaid taxi services at airports and stations.',
  },
  {
    id: 'gem-scam',
    title: 'Gem/Jewelry Export Scam',
    description: 'Shops offer to sell gems at "wholesale prices" promising huge profits when you export them home.',
    prevention: 'Never agree to export gems for profit. Legitimate gem dealers don\'t need tourists to export their products.',
  },
  {
    id: 'closed-attraction',
    title: '"Attraction Closed" Trick',
    description: 'Touts claim an attraction is closed and offer to take you to an alternative (usually a shop).',
    prevention: 'Verify directly at the attraction entrance. Official timings are available online.',
  },
  {
    id: 'fake-guide',
    title: 'Unofficial Tour Guides',
    description: 'Unlicensed guides may provide incorrect information and lead you to commission-paying shops.',
    prevention: 'Only hire guides through official tourism offices or your hotel. Ask to see their license.',
  },
  {
    id: 'free-blessing',
    title: 'Temple "Free Blessing" Scam',
    description: 'Someone offers a "free" blessing or tikka, then demands payment.',
    prevention: 'Politely decline unsolicited offerings. Real temple priests don\'t demand payment.',
  },
  {
    id: 'card-swap',
    title: 'Card Swap/Skimming',
    description: 'Your credit card may be swapped or skimmed during transactions.',
    prevention: 'Never let your card out of sight. Use cash for small purchases or digital payments.',
  },
  {
    id: 'overcharge',
    title: 'Restaurant Overcharging',
    description: 'Bills may include extra items you didn\'t order or incorrect calculations.',
    prevention: 'Check menu prices, ask for itemized bills, and verify calculations before paying.',
  },
  {
    id: 'photo-money',
    title: 'Photo Opportunity Trap',
    description: 'People in traditional costumes or with animals offer photos, then demand excessive payment.',
    prevention: 'Agree on price before taking photos, or politely decline. Never touch animals (safety & ethics).',
  },
];

const ScamDatabase = () => {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-bold">Scam Prevention Guide</h2>
      </div>
      
      <p className="text-sm text-muted-foreground mb-4">
        Learn about common tourist scams in Rajasthan and how to protect yourself.
      </p>

      <Accordion type="single" collapsible className="w-full">
        {scams.map((scam) => (
          <AccordionItem key={scam.id} value={scam.id}>
            <AccordionTrigger className="text-left">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-warning shrink-0" />
                <span>{scam.title}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="space-y-2">
              <p className="text-sm text-muted-foreground">{scam.description}</p>
              <div className="p-3 bg-success/10 rounded-lg">
                <p className="text-sm">
                  <strong className="text-success">Protection:</strong> {scam.prevention}
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default ScamDatabase;
