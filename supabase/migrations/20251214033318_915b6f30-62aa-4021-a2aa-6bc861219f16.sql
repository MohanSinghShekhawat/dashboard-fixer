-- Create tourist_stats table for entry analytics
CREATE TABLE public.tourist_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL UNIQUE,
  domestic_count INTEGER NOT NULL DEFAULT 0,
  international_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create hotels table for accommodation tracking
CREATE TABLE public.hotels (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  district TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  total_rooms INTEGER NOT NULL DEFAULT 0,
  occupied_rooms INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create transport table for vehicle verification
CREATE TABLE public.transport (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  provider_name TEXT NOT NULL,
  vehicle_number TEXT NOT NULL UNIQUE,
  is_verified BOOLEAN NOT NULL DEFAULT false,
  contact TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.tourist_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transport ENABLE ROW LEVEL SECURITY;

-- RLS Policies for tourist_stats
CREATE POLICY "Anyone can view tourist stats" ON public.tourist_stats FOR SELECT USING (true);
CREATE POLICY "Admins can insert tourist stats" ON public.tourist_stats FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update tourist stats" ON public.tourist_stats FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete tourist stats" ON public.tourist_stats FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for hotels
CREATE POLICY "Anyone can view hotels" ON public.hotels FOR SELECT USING (true);
CREATE POLICY "Admins can insert hotels" ON public.hotels FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update hotels" ON public.hotels FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete hotels" ON public.hotels FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for transport
CREATE POLICY "Anyone can view transport" ON public.transport FOR SELECT USING (true);
CREATE POLICY "Admins can insert transport" ON public.transport FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update transport" ON public.transport FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete transport" ON public.transport FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Add trigger for hotels updated_at
CREATE TRIGGER update_hotels_updated_at
BEFORE UPDATE ON public.hotels
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert sample data for hotels
INSERT INTO public.hotels (name, district, rating, total_rooms, occupied_rooms) VALUES
('Taj Rambagh Palace', 'Jaipur', 5, 78, 72),
('Umaid Bhawan Palace', 'Jodhpur', 5, 64, 58),
('The Oberoi Udaivilas', 'Udaipur', 5, 87, 80),
('Suryagarh', 'Jaisalmer', 5, 75, 70),
('ITC Rajputana', 'Jaipur', 5, 218, 195),
('Hotel Clarks Amer', 'Jaipur', 4, 215, 180),
('Fort Rajwada', 'Jaisalmer', 4, 91, 65),
('Fateh Prakash Palace', 'Udaipur', 4, 65, 45),
('Welcomhotel Jodhpur', 'Jodhpur', 4, 92, 78),
('Narendra Bhawan', 'Bikaner', 4, 82, 55);

-- Insert sample data for transport
INSERT INTO public.transport (provider_name, vehicle_number, is_verified, contact) VALUES
('Rajasthan Tourism', 'RJ-14-PA-1234', true, '+91-9876543210'),
('Pink City Cabs', 'RJ-14-TC-5678', true, '+91-9876543211'),
('Desert Safari Tours', 'RJ-11-TS-9012', true, '+91-9876543212'),
('Royal Rajasthan Travels', 'RJ-19-RR-3456', true, '+91-9876543213'),
('Heritage Car Rentals', 'RJ-14-HC-7890', true, '+91-9876543214');

-- Insert sample tourist stats for last 7 days
INSERT INTO public.tourist_stats (date, domestic_count, international_count) VALUES
(CURRENT_DATE - INTERVAL '6 days', 12500, 2100),
(CURRENT_DATE - INTERVAL '5 days', 13200, 2300),
(CURRENT_DATE - INTERVAL '4 days', 11800, 1950),
(CURRENT_DATE - INTERVAL '3 days', 14500, 2650),
(CURRENT_DATE - INTERVAL '2 days', 15200, 2800),
(CURRENT_DATE - INTERVAL '1 day', 13800, 2450),
(CURRENT_DATE, 14200, 2550);