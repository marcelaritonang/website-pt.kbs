import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { hasDatabase } from '@/lib/db';
import { DEFAULT_PRICING, REGION_LABELS, type RABPricing, type BuildingType, type Quality, type Region } from '@/lib/rab';

// GET /api/rab/pricing - Public endpoint to get current pricing data
export async function GET() {
  try {
    // If database is connected, fetch live pricing
    if (hasDatabase) {
      const [pricingRows, qualityRows, regionalRows] = await Promise.all([
        sql`SELECT building_type, base_price_per_m2 FROM rab_pricing ORDER BY building_type`,
        sql`SELECT quality, multiplier FROM rab_quality ORDER BY multiplier ASC`,
        sql`SELECT region, region_label, multiplier FROM rab_regional_index ORDER BY region`,
      ]);

      // If DB has data, use it
      if (pricingRows.rows.length > 0 && qualityRows.rows.length > 0 && regionalRows.rows.length > 0) {
        const basePrices: Record<string, number> = {};
        pricingRows.rows.forEach((row) => {
          basePrices[row.building_type] = row.base_price_per_m2;
        });

        const qualityMultiplier: Record<string, number> = {};
        qualityRows.rows.forEach((row) => {
          qualityMultiplier[row.quality] = parseFloat(row.multiplier);
        });

        const regionalMultiplier: Record<string, number> = {};
        regionalRows.rows.forEach((row) => {
          regionalMultiplier[row.region] = parseFloat(row.multiplier);
        });

        const pricing: RABPricing = {
          basePrices: basePrices as Record<BuildingType, number>,
          qualityMultiplier: qualityMultiplier as Record<Quality, number>,
          regionalMultiplier: regionalMultiplier as Record<Region, number>,
          floorMultiplier: DEFAULT_PRICING.floorMultiplier,
        };

        return NextResponse.json({
          source: 'database',
          pricing,
          regionLabels: REGION_LABELS,
        });
      }
    }

    // Fallback to hardcoded defaults
    return NextResponse.json({
      source: 'default',
      pricing: DEFAULT_PRICING,
      regionLabels: REGION_LABELS,
    });
  } catch (error) {
    console.error('RAB pricing error:', error);
    // On any error, return defaults (graceful fallback)
    return NextResponse.json({
      source: 'default',
      pricing: DEFAULT_PRICING,
      regionLabels: REGION_LABELS,
    });
  }
}
