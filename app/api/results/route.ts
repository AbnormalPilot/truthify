import { NextResponse } from "next/server";

const SHEET_ID = "1NnvDyGDrihS8tkiBcKSCJnBKEeOBWyChMgAPu8bWArM";
const GID = "884817645";
const JSON_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${GID}`;

export async function GET() {
  try {
    const res = await fetch(JSON_URL, { cache: "no-store" });
    const text = await res.text();

    // Check if we got HTML (sheet not public)
    if (text.trimStart().startsWith("<!") || text.trimStart().startsWith("<html")) {
      return NextResponse.json(
        { error: "Sheet not public. Share the results sheet as 'Anyone with the link → Viewer'." },
        { status: 403 }
      );
    }

    // Google wraps JSON in: google.visualization.Query.setResponse({...});
    const match = text.match(/google\.visualization\.Query\.setResponse\(({[\s\S]*})\)/);
    if (!match) {
      return NextResponse.json({ error: "Unexpected response format from Google Sheets." }, { status: 500 });
    }

    const data = JSON.parse(match[1]);
    const cols: { label: string }[] = data.table.cols;
    const rows: { c: ({ v: string | number | null } | null)[] }[] = data.table.rows;

    if (!rows || rows.length === 0) {
      return NextResponse.json({ result: null, total: 0 });
    }

    // Get the last row (most recent analysis)
    const lastRow = rows[rows.length - 1];

    const result: Record<string, string | number | null> = {};
    cols.forEach((col, i) => {
      const key = col.label || `col_${i}`;
      const cell = lastRow.c?.[i];
      result[key] = cell?.v ?? null;
    });

    return NextResponse.json({ result, total: rows.length });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch results";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
