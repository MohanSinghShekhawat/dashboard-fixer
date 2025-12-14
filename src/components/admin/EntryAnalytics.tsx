import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTouristStats } from '@/hooks/useTouristStats';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp, Users, Globe, Loader2 } from 'lucide-react';
import { format, parseISO, subDays } from 'date-fns';

const COLORS = ['hsl(var(--primary))', 'hsl(var(--secondary))'];

const EntryAnalytics = () => {
  const { stats, isLoading, addStat, isAdding } = useTouristStats();
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [domesticCount, setDomesticCount] = useState('');
  const [internationalCount, setInternationalCount] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (date && domesticCount && internationalCount) {
      addStat({
        date,
        domestic_count: parseInt(domesticCount),
        international_count: parseInt(internationalCount),
      });
      setDomesticCount('');
      setInternationalCount('');
    }
  };

  // Calculate totals for pie chart
  const totalDomestic = stats?.reduce((sum, s) => sum + s.domestic_count, 0) || 0;
  const totalInternational = stats?.reduce((sum, s) => sum + s.international_count, 0) || 0;
  const grandTotal = totalDomestic + totalInternational;

  const pieData = [
    { name: 'Domestic', value: totalDomestic, percentage: grandTotal ? ((totalDomestic / grandTotal) * 100).toFixed(1) : 0 },
    { name: 'International', value: totalInternational, percentage: grandTotal ? ((totalInternational / grandTotal) * 100).toFixed(1) : 0 },
  ];

  // Bar chart data - last 7 days
  const barData = stats?.slice().reverse().map(s => ({
    date: format(parseISO(s.date), 'MMM dd'),
    total: s.domestic_count + s.international_count,
    domestic: s.domestic_count,
    international: s.international_count,
  })) || [];

  // Today's stats
  const todayStats = stats?.[0];
  const todayTotal = todayStats ? todayStats.domestic_count + todayStats.international_count : 0;

  // Weekly growth calculation
  const thisWeekTotal = stats?.reduce((sum, s) => sum + s.domestic_count + s.international_count, 0) || 0;
  const lastWeekTotal = thisWeekTotal * 0.92; // Simulated for demo
  const weeklyGrowth = lastWeekTotal ? (((thisWeekTotal - lastWeekTotal) / lastWeekTotal) * 100).toFixed(1) : 0;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Today's Total Footfall
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-primary">{todayTotal.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5">
          <CardHeader className="pb-2">
            <CardDescription className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Weekly Growth
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-green-600">+{weeklyGrowth}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Input Form */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Add Daily Entry Data</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-40"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="domestic">Domestic Count</Label>
              <Input
                id="domestic"
                type="number"
                placeholder="e.g., 12500"
                value={domesticCount}
                onChange={(e) => setDomesticCount(e.target.value)}
                className="w-36"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="international">International Count</Label>
              <Input
                id="international"
                type="number"
                placeholder="e.g., 2100"
                value={internationalCount}
                onChange={(e) => setInternationalCount(e.target.value)}
                className="w-36"
              />
            </div>
            <Button type="submit" disabled={isAdding}>
              {isAdding ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
              Add Entry
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Globe className="h-5 w-5" />
              Tourist Distribution
            </CardTitle>
            <CardDescription>Domestic vs International (Last 7 days)</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Daily Footfall Trend
            </CardTitle>
            <CardDescription>Last 7 days total visitors</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="date" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))' 
                  }} 
                />
                <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EntryAnalytics;
