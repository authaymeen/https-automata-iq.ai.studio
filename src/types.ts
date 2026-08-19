export interface ReverseEngineerResponse {
  audience: {
    demographics: string;
    psychographics: string;
  };
  hook: string;
  painPoint: string;
  superiorCopy: string;
}

export interface GccAngle {
  title: string;
  hook: string;
  adCopy: string;
  scannableKeypoints: string[];
}

export interface GccOffersResponse {
  angles: GccAngle[];
  trustBoosters: {
    cod: string;
    installments: string;
    goldenGuarantee: string;
  };
}

export interface WhatsappClosingResponse {
  objection: string;
  conversationalScript: Array<{
    sender: "merchant" | "buyer";
    message: string;
  }>;
  winningReply: string;
  closeTips: string[];
}

export interface PromptMasterResponse {
  role: string;
  contextAndGoal: string;
  constraintsAndStyle: string;
  outputFormat: string;
  midjourney?: {
    prompt: string;
    parameters: string;
    alternatives: string[];
  };
  detectedLanguage: "ar" | "en";
}

export interface BrandHubData {
  companyName: string;
  brandIdentity: string;
  targetAudience: string;
  toneOfVoice: string;
}

export interface UserSession {
  email: string;
  name: string;
  tier: "FREE" | "PRO" | "ULTRA";
  freeAttempts: number;
  subscriptionExpires: string | null;
  lastSeen: string;
  brandHub: BrandHubData | null;
  webhookUrl: string | null;
  activatedAt?: string | null;
}

export interface ActivationCode {
  code: string;
  tier: "PRO" | "ULTRA";
  status: "available" | "used";
  usedBy?: string;
  usedAt?: string;
}

export interface TikTokScriptResponse {
  hooks: string[];
  script: Array<{
    scene: string;
    visual: string;
    audio: string;
  }>;
  musicStyle: string;
  conversionTips: string[];
}

export interface AbandonedCartResponse {
  sms1Urgent: string;
  emailFollowup: {
    subject: string;
    body: string;
  };
  sms2Guarantee: string;
  tips: string[];
}

export interface GccPersonaResponse {
  name: string;
  quote: string;
  demographics: string;
  pains: string[];
  desires: string[];
  objections: string[];
  bestHooks: string[];
}

