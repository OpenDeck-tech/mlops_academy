import { NextResponse } from "next/server";
import { initDatabase } from "@/lib/db";

// This route initializes the database tables
// Call it once after setting up your database
export async function GET() {
  try {
    await initDatabase();
    return NextResponse.json({ 
      success: true, 
      message: "Database tables initialized successfully" 
    });
  } catch (error) {
    console.error("Database initialization error:", error);
    return NextResponse.json(
      { 
        error: "Failed to initialize database",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

