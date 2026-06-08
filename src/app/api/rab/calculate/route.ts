import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';
import { hasDatabase } from '@/lib/db';
import { calculateRAB, validateRABInput, DEFAULT_PRICING, type RABInput } from '@/lib/rab';

// POST /api/rab/calculate - Calculate RAB and log to analytics
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const input: RABInput = {
      buildingType: body.buildingType,
      area: parseInt(body.area),
      floors: parseInt(body.floors),
      quality: body.quality,
      region: body.region,
    };

    // Validate
    const error = validateRABInput(input);
    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    // Get pricing from DB or use defaults
    let pricing = DEFAULT_PRICING;

    if (hasDatabase) {
      try {
        const [pricingRows, qualityRows, regionalRows] = await Promise.all([
          sql`SELECT building_type, base_price_per_m2 FROM rab_pricing`,
          sql`SELECT quality, multiplier FROM rab_quality`,
          sql`SELECT region, multiplier FROM rab_regional_index`,
        ]);

        if (pricingRows.rows.length > 0 && qualityRows.rows.length > 0 && regionalRows.rows.length > 0) {
          const basePrices: Record<string, number> = {};
          pricingRows.rows.forEach((r) => { basePrices[r.building_type] = r.base_price_per_m2; });

          const qualityMultiplier: Record<string, number> = {};
          qualityRows.rows.forEach((r) => { qualityMultiplier[r.quality] = parseFloat(r.multiplier); });

          const regionalMultiplier: Record<string, number> = {};
          regionalRows.rows.forEach((r) => { regionalMultiplier[r.region] = parseFloat(r.multiplier); });

          pricing = {
            basePrices: basePrices as typeof DEFAULT_PRICING.basePrices,
            qualityMultiplier: qualityMultiplier as typeof DEFAULT_PRICING.qualityMultiplier,
            regionalMultiplier: regionalMultiplier as typeof DEFAULT_PRICING.regionalMultiplier,
            floorMultiplier: DEFAULT_PRICING.floorMultiplier,
          };
        }
      } catch {
        // DB read failed, use defaults
      }
    }

    // Calculate
    const result = calculateRAB(input, pricing);

    // Log to analytics (non-blocking, don't fail if this errors)
    if (hasDatabase) {
      const sessionId = body.sessionId || null;
      const userId = body.userId || null;

      sql`
        INSERT INTO rab_calculations (session_id, user_id, building_type, area, floors, quality, region, total_cost, price_per_m2)
        VALUES (${sessionId}, ${userId}, ${input.buildingType}, ${input.area}, ${input.floors}, ${input.quality}, ${input.region}, ${result.totalCost}, ${result.pricePerM2})
      `.catch((err) => console.error('RAB analytics log failed:', err));
    }

    return NextResponse.json({ result });
  } catch (error) {
    console.error('RAB calculate error:', error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan saat menghitung RAB' },
      { status: 500 }
    );
  }
}
