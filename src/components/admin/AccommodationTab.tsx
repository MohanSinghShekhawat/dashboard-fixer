import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { useHotels } from '@/hooks/useHotels';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Building2, Star, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const AccommodationTab = () => {
  const { hotels, isLoading } = useHotels();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Calculate occupancy percentage
  const hotelsWithOccupancy = hotels?.map(hotel => ({
    ...hotel,
    occupancy: Math.round((hotel.occupied_rooms / hotel.total_rooms) * 100),
  })) || [];

  // Group by district for bar chart
  const districtData = hotelsWithOccupancy.reduce((acc, hotel) => {
    const existing = acc.find(d => d.district === hotel.district);
    if (existing) {
      existing.totalRooms += hotel.total_rooms;
      existing.occupiedRooms += hotel.occupied_rooms;
    } else {
      acc.push({
        district: hotel.district,
        totalRooms: hotel.total_rooms,
        occupiedRooms: hotel.occupied_rooms,
      });
    }
    return acc;
  }, [] as { district: string; totalRooms: number; occupiedRooms: number }[]);

  const chartData = districtData.map(d => ({
    district: d.district,
    occupancy: Math.round((d.occupiedRooms / d.totalRooms) * 100),
  }));

  const renderStars = (rating: number) => {
    return Array.from({ length: rating }).map((_, i) => (
      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
    ));
  };

  return (
    <div className="space-y-6">
      {/* District Occupancy Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Occupancy by District
          </CardTitle>
          <CardDescription>Average hotel occupancy rates across Rajasthan districts</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis type="number" domain={[0, 100]} unit="%" className="text-xs" />
              <YAxis type="category" dataKey="district" className="text-xs" width={80} />
              <Tooltip 
                formatter={(value) => [`${value}%`, 'Occupancy']}
                contentStyle={{ 
                  backgroundColor: 'hsl(var(--card))', 
                  border: '1px solid hsl(var(--border))' 
                }}
              />
              <Bar 
                dataKey="occupancy" 
                fill="hsl(var(--primary))" 
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Hotels Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Hotels Overview</CardTitle>
          <CardDescription>Real-time room availability across registered hotels</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Hotel Name</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead className="text-right">Occupancy</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {hotelsWithOccupancy.map((hotel) => (
                <TableRow 
                  key={hotel.id}
                  className={cn(
                    hotel.occupancy > 90 && "bg-destructive/10"
                  )}
                >
                  <TableCell className="font-medium">{hotel.name}</TableCell>
                  <TableCell>{hotel.district}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-0.5">
                      {renderStars(hotel.rating)}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge 
                      variant={hotel.occupancy > 90 ? "destructive" : hotel.occupancy > 70 ? "secondary" : "outline"}
                    >
                      {hotel.occupancy}%
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AccommodationTab;
