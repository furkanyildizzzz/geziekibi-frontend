import { NextRequest, NextResponse } from "next/server";

export const GET = (request: NextRequest) => {
  console.log({ url: request.url });
  return NextResponse.json([{ id: 2, name: "First Tag" }]);
};

export const POST = (request: NextRequest) => {
  return NextResponse.next();
};
