import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Test route demonstrating various Prisma queries
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const queryType = searchParams.get("type") || "all";

    let result;

    switch (queryType) {
      case "all":
        // Get all users (limited to 10)
        result = await prisma.user.findMany({
          take: 10,
          orderBy: {
            createdAt: 'desc'
          }
        });
        break;

      case "endsWith":
        // Find users with email ending in specific domain
        const domain = searchParams.get("domain") || "prisma.io";
        result = await prisma.user.findMany({
          where: {
            email: { endsWith: domain }
          },
        });
        break;

      case "contains":
        // Find users with email containing a string
        const search = searchParams.get("search") || "@";
        result = await prisma.user.findMany({
          where: {
            email: { contains: search }
          },
          select: {
            id: true,
            email: true,
            createdAt: true,
          }
        });
        break;

      case "unique":
        // Find a single user by email
        const email = searchParams.get("email");
        if (!email) {
          return NextResponse.json({ error: "Email parameter required" }, { status: 400 });
        }
        result = await prisma.user.findUnique({
          where: { email: email.toLowerCase() }
        });
        break;

      case "count":
        // Count total users
        result = { count: await prisma.user.count() };
        break;

      case "first":
        // Get first user
        result = await prisma.user.findFirst({
          orderBy: { createdAt: 'asc' }
        });
        break;

      default:
        result = { message: "Invalid query type. Use: all, endsWith, contains, unique, count, first" };
    }

    return NextResponse.json({
      success: true,
      queryType,
      result
    });
  } catch (error) {
    console.error("Prisma query error:", error);
    return NextResponse.json(
      { 
        error: "Failed to query database",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

