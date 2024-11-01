import { NextRequest, NextResponse } from "next/server";

export const GET = (request: NextRequest) => {
  return NextResponse.json([{ id: 5, name: "ekim" }]);
};
