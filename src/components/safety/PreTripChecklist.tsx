import { useState, useEffect } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckSquare, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const STORAGE_KEY = 'rajasthan-trip-checklist';

const defaultItems = [
  { id: 'passport', label: 'Valid passport/ID with copies' },
  { id: 'insurance', label: 'Travel insurance documents' },
  { id: 'medication', label: 'Prescription medications' },
  { id: 'cash', label: 'Cash in local currency (INR)' },
  { id: 'cards', label: 'Credit/debit cards notified to bank' },
  { id: 'clothes', label: 'Modest clothing for temple visits' },
  { id: 'sunscreen', label: 'Sunscreen & sunglasses' },
  { id: 'water', label: 'Reusable water bottle' },
  { id: 'charger', label: 'Phone charger & power bank' },
  { id: 'offline', label: 'Offline maps downloaded' },
  { id: 'emergency', label: 'Emergency contacts saved' },
  { id: 'vaccination', label: 'Vaccination records if required' },
  { id: 'comfortable-shoes', label: 'Comfortable walking shoes' },
  { id: 'hat', label: 'Hat or scarf for sun protection' },
];

const PreTripChecklist = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        setCheckedItems(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading checklist:', e);
      }
    }
  }, []);

  const handleCheck = (id: string, checked: boolean) => {
    const newChecked = { ...checkedItems, [id]: checked };
    setCheckedItems(newChecked);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newChecked));
  };

  const handleReset = () => {
    setCheckedItems({});
    localStorage.removeItem(STORAGE_KEY);
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progress = (completedCount / defaultItems.length) * 100;

  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CheckSquare className="h-6 w-6 text-primary" />
          <h2 className="text-xl font-bold">Pre-Trip Checklist</h2>
        </div>
        <Button variant="ghost" size="sm" onClick={handleReset}>
          <RotateCcw className="h-4 w-4 mr-1" />
          Reset
        </Button>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">
            {completedCount} / {defaultItems.length}
          </span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <div className="space-y-3 mt-4">
        {defaultItems.map((item) => (
          <div
            key={item.id}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
              checkedItems[item.id] ? 'bg-success/10' : 'bg-muted'
            }`}
          >
            <Checkbox
              id={item.id}
              checked={checkedItems[item.id] || false}
              onCheckedChange={(checked) => handleCheck(item.id, checked as boolean)}
            />
            <Label
              htmlFor={item.id}
              className={`cursor-pointer ${
                checkedItems[item.id] ? 'line-through text-muted-foreground' : ''
              }`}
            >
              {item.label}
            </Label>
          </div>
        ))}
      </div>

      {progress === 100 && (
        <div className="p-4 bg-success/10 rounded-lg text-center">
          <p className="text-success font-medium">🎉 You're all set for your trip!</p>
        </div>
      )}
    </div>
  );
};

export default PreTripChecklist;
