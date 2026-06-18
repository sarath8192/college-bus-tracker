const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log("SUPABASE URL:", supabaseUrl);
console.log("SUPABASE KEY EXISTS:", supabaseKey ? "YES" : "NO");

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;