import { createClient } from '@supabase/supabase-js';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_KEY;

if (!url || !key) {
  console.warn('⚠️  Supabase env vars missing — DB calls will fail.');
}

// createClient throws on an empty URL, which would crash the whole API at import.
// A placeholder keeps every non-DB route working; DB calls fail and are caught.
export const supabase = createClient(url || 'https://placeholder.invalid', key || 'missing');
