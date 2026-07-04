import type { SchemeFlow, SchemeId } from '../types'
import { microsaasFlow } from './microsaas'
import { agencyFlow } from './agency'
import { ugcFlow } from './ugc'
import { dropshippingFlow } from './dropshipping'
import { affiliateFlow } from './affiliate'
import { whopFlow } from './whop'
import { youtubeFlow } from './youtube'
import { pseoFlow } from './pseo'
import { leadgenFlow } from './leadgen'
import { templatesFlow } from './templates'
import { microappFlow } from './microapp'

export const flowsById: Record<SchemeId, SchemeFlow> = {
  'micro-saas': microsaasFlow,
  'ai-agency': agencyFlow,
  'ai-ugc': ugcFlow,
  dropshipping: dropshippingFlow,
  'affiliate-newsletter': affiliateFlow,
  'whop-clipping': whopFlow,
  'faceless-youtube': youtubeFlow,
  'programmatic-seo': pseoFlow,
  'leadgen-daas': leadgenFlow,
  'templates-automations': templatesFlow,
  'micro-app-flipping': microappFlow,
}
