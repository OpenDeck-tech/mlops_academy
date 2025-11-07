import { NextResponse } from "next/server";
import { createUser } from "@/lib/users";
import { getSession } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!password || typeof password !== "string" || password.length < 8) {
      return NextResponse.json(
        { error: "Password must be at least 8 characters" },
        { status: 400 }
      );
    }

    try {
      const user = await createUser(email, password);

      // Set session with user info
      const sess = await getSession();
      sess.userId = user.id;
      sess.email = user.email;
      sess.isPro = false; // New users need to subscribe
      await sess.save();

      return NextResponse.json({ 
        success: true, 
        userId: user.id,
        redirectTo: "/dashboard" // Redirect to dashboard after signup
      });
    } catch (error: unknown) {
      if (error instanceof Error && error.message === "User already exists") {
        return NextResponse.json(
          { error: "An account with this email already exists" },
          { status: 409 }
        );
      }
      throw error;
    }
  } catch (error) {
    console.error("Signup error", error);
    return NextResponse.json(
      { error: "Unable to create account" },
      { status: 500 }
    );
  }
}

