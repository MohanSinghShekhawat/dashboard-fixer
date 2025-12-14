-- Create scams table for tourist alerts
CREATE TABLE public.scams (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  risk_level TEXT NOT NULL CHECK (risk_level IN ('HIGH', 'MEDIUM', 'LOW')),
  how_to_avoid TEXT NOT NULL,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.scams ENABLE ROW LEVEL SECURITY;

-- Anyone can view scams (read-only for tourists)
CREATE POLICY "Anyone can view scams" ON public.scams FOR SELECT USING (true);

-- Only admins can manage scams
CREATE POLICY "Admins can insert scams" ON public.scams FOR INSERT WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can update scams" ON public.scams FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role));
CREATE POLICY "Admins can delete scams" ON public.scams FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Insert sample scam data
INSERT INTO public.scams (title, description, risk_level, how_to_avoid, location) VALUES
('Gemstone Scam', 'Sellers claim gems are worth 10x their value and offer to ship them abroad for profit.', 'HIGH', 'Never agree to export gems. Buy only from government-certified shops with proper receipts. Verify certification with the Department of Mines.', 'Jaipur'),
('Fake Tour Guides', 'Unlicensed individuals pose as official guides and overcharge or lead tourists to commission shops.', 'HIGH', 'Only hire guides with government-issued ID cards. Book through your hotel or official tourism centers.', 'All Major Sites'),
('Taxi Meter Tampering', 'Taxi meters are rigged to run faster, or drivers claim the meter is broken.', 'MEDIUM', 'Use verified transport apps or pre-negotiate fares. Ask hotel staff for approximate costs beforehand.', 'Jaipur, Udaipur'),
('Carpet Export Fraud', 'Shops offer to export carpets but either send fakes or nothing at all.', 'HIGH', 'Pay only after inspecting goods. Use credit cards for purchase protection. Avoid export schemes.', 'Jaipur, Jodhpur'),
('Temple Donation Scam', 'Fake priests demand large donations or claim your offering was insufficient.', 'MEDIUM', 'Donations are voluntary. Ignore pressure tactics. Donate only at official temple counters.', 'Pushkar, Udaipur'),
('Overpriced Photography', 'Snake charmers or performers demand excessive payment after photos are taken.', 'LOW', 'Agree on price before taking photos. Walk away from aggressive vendors.', 'Jaipur, Jodhpur'),
('Hotel Booking Switch', 'Taxi drivers claim your hotel is closed/bad and redirect to commission-paying hotels.', 'MEDIUM', 'Call your hotel to confirm. Insist on your original destination. Use reputable transport.', 'All Cities'),
('Shoe Minding Scam', 'At temples, shoe minders demand inflated fees or claim your footwear was stolen.', 'LOW', 'Use official shoe counters with tickets. Consider wearing inexpensive footwear to temples.', 'All Temples');