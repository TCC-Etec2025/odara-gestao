import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vpzvcfslfxztibhhvfgg.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZwenZjZnNsZnh6dGliaGh2ZmdnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU1NDI1MTMsImV4cCI6MjA3MTExODUxM30.rz703WvKFCScBkJyPcsHddBE-qLsPVxWFJojIo1iPvI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);