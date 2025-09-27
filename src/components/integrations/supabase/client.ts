import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://xhwwnhzwhkwbdwcedjky.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhod3duaHp3aGt3YmR3Y2Vkamt5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg5NTQyODMsImV4cCI6MjA3NDUzMDI4M30.Hpu4KYxvU6P8brpmpd49dcx6wssVEYHbDBJ7OuD5ttg";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});