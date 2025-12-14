import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useLocations, Location } from '@/hooks/useLocations';
import { supabase } from '@/integrations/supabase/client';
import { Upload, Camera, Loader2, AlertTriangle, Users, CheckCircle } from 'lucide-react';

const CrowdAnalyzer = () => {
  const { locations, refetch } = useLocations();
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<{
    count: number;
    status: string;
    location: string;
  } | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
    }
  };

  const analyzeImage = async () => {
    if (!file || !selectedLocation) {
      toast({
        title: 'Missing Information',
        description: 'Please select a location and upload an image.',
        variant: 'destructive',
      });
      return;
    }

    setIsAnalyzing(true);
    setResult(null);

    try {
      // Convert file to base64
      const reader = new FileReader();
      const base64Promise = new Promise<string>((resolve) => {
        reader.onload = () => {
          const base64 = (reader.result as string).split(',')[1];
          resolve(base64);
        };
      });
      reader.readAsDataURL(file);
      const base64Image = await base64Promise;

      // Call edge function
      const { data, error } = await supabase.functions.invoke('analyze-crowd', {
        body: {
          image: base64Image,
          locationId: selectedLocation,
        },
      });

      if (error) throw error;

      const location = locations.find((l) => l.id === selectedLocation);
      
      setResult({
        count: data.count,
        status: data.status,
        location: location?.name || 'Unknown',
      });

      // Refetch locations to get updated data
      await refetch();

      toast({
        title: 'Analysis Complete',
        description: `Detected ${data.count} people. Status: ${data.status}`,
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        title: 'Analysis Failed',
        description: error instanceof Error ? error.message : 'Failed to analyze image',
        variant: 'destructive',
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'HIGH':
        return <Badge className="bg-destructive text-destructive-foreground">High Crowd</Badge>;
      case 'MODERATE':
        return <Badge className="bg-warning text-warning-foreground">Moderate</Badge>;
      case 'SAFE':
        return <Badge className="bg-success text-success-foreground">Safe</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5" />
            Live Monitor - Crowd Density Analyzer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Select Location</Label>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue placeholder="Choose a location" />
              </SelectTrigger>
              <SelectContent>
                {locations.map((location) => (
                  <SelectItem key={location.id} value={location.id}>
                    {location.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Upload CCTV Frame</Label>
            <div className="flex items-center gap-4">
              <Input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
            </div>
          </div>

          {preview && (
            <div className="relative rounded-lg overflow-hidden border">
              <img
                src={preview}
                alt="Preview"
                className="w-full h-48 object-cover"
              />
              {isAnalyzing && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                  <div className="flex flex-col items-center gap-2">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <span className="text-sm font-medium">Analyzing...</span>
                  </div>
                </div>
              )}
            </div>
          )}

          <Button
            onClick={analyzeImage}
            disabled={!file || !selectedLocation || isAnalyzing}
            className="w-full"
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Analyzing Density...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4 mr-2" />
                Analyze Density
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {result && (
        <Card className="border-primary/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-success" />
              Analysis Result
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-muted rounded-lg text-center">
                <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                <p className="text-3xl font-bold">{result.count}</p>
                <p className="text-sm text-muted-foreground">People Detected</p>
              </div>
              <div className="p-4 bg-muted rounded-lg text-center">
                <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-warning" />
                <div className="mb-2">{getStatusBadge(result.status)}</div>
                <p className="text-sm text-muted-foreground">Crowd Level</p>
              </div>
            </div>
            <div className="p-3 bg-secondary rounded-lg">
              <p className="text-sm">
                <strong>Location Updated:</strong> {result.location}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                The location status has been automatically updated in the database.
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default CrowdAnalyzer;
