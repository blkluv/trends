import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://slxxkidktrstdjkklgbq.supabase.co';
// safe to use in browser since using row level security.
const supabaseKey =
	'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNseHhraWRrdHJzdGRqa2tsZ2JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODY2NDYwMDksImV4cCI6MjAwMjIyMjAwOX0.9J6V3wWmvcZE6kx7YNwVthb_trfbfaRnop3JSneAjz4';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
