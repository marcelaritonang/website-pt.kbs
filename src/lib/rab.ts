// RAB Calculator - Shared types & calculation logic
// Used by both API (server) and frontend fallback (client)

export type BuildingType = 'rumah' | 'ruko' | 'gudang' | 'kantor' | 'workshop';
export type Quality = 'standar' | 'menengah' | 'premium';
export type Region = 'jakarta' | 'bogor' | 'depok' | 'tangerang' | 'bekasi' | 'bandung' | 'surabaya' | 'semarang' | 'yogyakarta' | 'medan';

export interface RABPricing {
  basePrices: Record<BuildingType, number>;
  qualityMultiplier: Record<Quality, number>;
  regionalMultiplier: Record<Region, number>;
  floorMultiplier: Record<number, number>;
}

export interface RABInput {
  buildingType: BuildingType;
  area: number;
  floors: number;
  quality: Quality;
  region: Region;
}

export interface RABBreakdownItem {
  label: string;
  labelEn: string;
  percentage: number;
  amount: number;
}

export interface RABResult {
  totalCost: number;
  pricePerM2: number;
  breakdown: RABBreakdownItem[];
  duration: string;
  durationEn: string;
  comparison: { region: string; regionLabel: string; cost: number; diff: number }[];
}

// Default pricing data (fallback when DB not available)
// Based on AHSP & kontraktor rates 2024
export const DEFAULT_PRICING: RABPricing = {
  basePrices: {
    rumah: 4200000,
    ruko: 4800000,
    gudang: 3500000,
    kantor: 5800000,
    workshop: 3800000,
  },
  qualityMultiplier: {
    standar: 1.0,
    menengah: 1.45,
    premium: 2.1,
  },
  regionalMultiplier: {
    jakarta: 1.20,
    bogor: 1.0,
    depok: 1.05,
    tangerang: 1.08,
    bekasi: 1.05,
    bandung: 0.92,
    surabaya: 0.98,
    semarang: 0.88,
    yogyakarta: 0.85,
    medan: 0.95,
  },
  floorMultiplier: {
    1: 1.0,
    2: 1.20,
    3: 1.35,
  },
};

export const REGION_LABELS: Record<Region, string> = {
  jakarta: 'Jakarta',
  bogor: 'Bogor',
  depok: 'Depok',
  tangerang: 'Tangerang',
  bekasi: 'Bekasi',
  bandung: 'Bandung',
  surabaya: 'Surabaya',
  semarang: 'Semarang',
  yogyakarta: 'Yogyakarta',
  medan: 'Medan',
};

export const BUILDING_TYPE_LABELS: Record<BuildingType, { id: string; en: string }> = {
  rumah: { id: 'Rumah Tinggal', en: 'Residential House' },
  ruko: { id: 'Ruko', en: 'Shophouse' },
  gudang: { id: 'Gudang', en: 'Warehouse' },
  kantor: { id: 'Kantor', en: 'Office' },
  workshop: { id: 'Workshop', en: 'Workshop' },
};

export const QUALITY_LABELS: Record<Quality, { id: string; en: string; desc: string; descEn: string }> = {
  standar: { id: 'Standar', en: 'Standard', desc: 'Bata merah, keramik 40x40, kusen kayu, cat ekonomi', descEn: 'Red brick, 40x40 tiles, wood frames, economy paint' },
  menengah: { id: 'Menengah', en: 'Medium', desc: 'Hebel, keramik 60x60, kusen aluminium, cat Dulux', descEn: 'AAC block, 60x60 tiles, aluminum frames, Dulux paint' },
  premium: { id: 'Premium', en: 'Premium', desc: 'Hebel + panel, granit/marmer, kusen UPVC, custom design', descEn: 'AAC + panel, granite/marble, UPVC frames, custom design' },
};

// Breakdown based on SNI/Permen PUPR proportions
export const BREAKDOWN_ITEMS = [
  { label: 'Pondasi & Struktur', labelEn: 'Foundation & Structure', percentage: 30 },
  { label: 'Dinding & Plester', labelEn: 'Walls & Plastering', percentage: 18 },
  { label: 'Atap & Rangka', labelEn: 'Roof & Framework', percentage: 13 },
  { label: 'Lantai', labelEn: 'Flooring', percentage: 10 },
  { label: 'Instalasi ME (Listrik & Plumbing)', labelEn: 'MEP (Electrical & Plumbing)', percentage: 12 },
  { label: 'Pintu, Jendela & Kusen', labelEn: 'Doors, Windows & Frames', percentage: 7 },
  { label: 'Pengecatan & Finishing', labelEn: 'Paint & Finishing', percentage: 6 },
  { label: 'Pekerjaan Persiapan & Lain-lain', labelEn: 'Site Prep & Miscellaneous', percentage: 4 },
];

function getDuration(area: number, floors: number): { id: string; en: string } {
  const base = area * floors;
  if (base < 100) return { id: '3-4 bulan', en: '3-4 months' };
  if (base <= 200) return { id: '4-6 bulan', en: '4-6 months' };
  if (base <= 500) return { id: '6-9 bulan', en: '6-9 months' };
  return { id: '9-12 bulan', en: '9-12 months' };
}

/**
 * Calculate RAB based on input parameters and pricing data.
 * This is the single source of truth — used by both API and client fallback.
 */
export function calculateRAB(input: RABInput, pricing: RABPricing): RABResult {
  const { buildingType, area, floors, quality, region } = input;

  const basePrice = pricing.basePrices[buildingType];
  const qMul = pricing.qualityMultiplier[quality];
  const rMul = pricing.regionalMultiplier[region];
  const fMul = pricing.floorMultiplier[floors] ?? 1.0;

  const pricePerM2 = basePrice * qMul * rMul * fMul;
  const totalCost = pricePerM2 * area;

  const breakdown = BREAKDOWN_ITEMS.map((item) => ({
    ...item,
    amount: Math.round((totalCost * item.percentage) / 100),
  }));

  const duration = getDuration(area, floors);

  const comparison = (Object.keys(pricing.regionalMultiplier) as Region[])
    .filter((r) => r !== region)
    .map((r) => {
      const cost = Math.round(basePrice * qMul * pricing.regionalMultiplier[r] * fMul * area);
      return {
        region: r,
        regionLabel: REGION_LABELS[r],
        cost,
        diff: Math.round(((cost - totalCost) / totalCost) * 100),
      };
    })
    .sort((a, b) => b.cost - a.cost);

  return {
    totalCost: Math.round(totalCost),
    pricePerM2: Math.round(pricePerM2),
    breakdown,
    duration: duration.id,
    durationEn: duration.en,
    comparison,
  };
}

/**
 * Validate RAB input. Returns error message or null if valid.
 */
export function validateRABInput(input: RABInput): string | null {
  const { buildingType, area, floors, quality, region } = input;

  if (!['rumah', 'ruko', 'gudang', 'kantor', 'workshop'].includes(buildingType)) {
    return 'Tipe bangunan tidak valid';
  }
  if (!['standar', 'menengah', 'premium'].includes(quality)) {
    return 'Kualitas tidak valid';
  }
  if (!Object.keys(REGION_LABELS).includes(region)) {
    return 'Daerah tidak valid';
  }
  if (!Number.isInteger(area) || area < 20 || area > 5000) {
    return 'Luas harus antara 20-5000 m²';
  }
  if (!Number.isInteger(floors) || floors < 1 || floors > 3) {
    return 'Jumlah lantai harus 1-3';
  }
  return null;
}
