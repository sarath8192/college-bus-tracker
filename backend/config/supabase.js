const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = (process.env.SUPABASE_URL || "").trim();
const supabaseKey = (process.env.SUPABASE_KEY || "").trim();

if (!supabaseUrl) {
  console.log("SUPABASE_URL is missing");
}

if (!supabaseKey) {
  console.log("SUPABASE_KEY is missing");
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;