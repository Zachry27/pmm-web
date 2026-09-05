import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://lmwclcsdlctftxnycasp.supabase.co',
  'sb_publishable_uzTvbHnoAPm_XSo7rCCv3g_sUQrfBM-',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  },
)
