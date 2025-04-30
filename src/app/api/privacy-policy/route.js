import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const response = await fetch("https://www.qcsstudio.in/api/admin/Policies?type=privacy_policy");
    const data = await response.json();

    return NextResponse.json(
      {
        message: "Policies retrieved successfully",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Policy Fetch Error:", error);
    return NextResponse.json({ message: "Policy Fetch Error" }, { status: 500 });
  }
}
