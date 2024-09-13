import { clerkMiddleware, getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { clerkClient } from "@clerk/clerk-sdk-node"; // Correct import for clerkClient
import type { NextRequest } from "next/server";

// Define allowed emails
const allowedEmails = [
  "admin1@gmail.com",
  "admin2@gmail.com",
  "admin3@gmail.com",
];

// Custom middleware to restrict access
async function customMiddleware(req: NextRequest) {
  const { userId } = getAuth(req);

  // If the user is not authenticated, run the Clerk middleware
  if (!userId) {
    return clerkMiddleware()(req, event); // Fixes the "expected 2 arguments" error
  }

  // Fetch the user's details from Clerk
  const user = await clerkClient.users.getUser(userId);

  // Check if the user's email is one of the allowed emails
  if (!allowedEmails.includes(user.emailAddresses[0].emailAddress)) {
    return NextResponse.redirect("/"); // Redirect to home or any other page
  }

  // If the email is allowed, continue to the next middleware or the requested route
  return NextResponse.next();
}

// Export the custom middleware
export default async function middleware(req: NextRequest) {
  return customMiddleware(req);
}

// Define the paths for which the middleware should apply
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
