// app/api/subscribe/route.ts
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const LIST_ID = "VfSuHW";
  // ✅ PASTE YOUR NEW PRIVATE KEY HERE
  const API_KEY = "pk_440eac9c96292d15144c042262113ffa75";

  try {
    const body = await request.json();
    const { email, firstName, lastName } = body;

    const headers = {
      accept: "application/json",
      revision: "2024-02-15",
      "content-type": "application/json",
      Authorization: `Klaviyo-API-Key ${API_KEY.trim()}`,
    };

    // ----------------------------------------------------------------
    // STEP 1: Save the Name (Create/Update Profile)
    // ----------------------------------------------------------------
    try {
      await fetch("https://a.klaviyo.com/api/profiles/", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          data: {
            type: "profile",
            attributes: {
              email: email,
              first_name: firstName,
              last_name: lastName,
            },
          },
        }),
      });
    } catch (e) {
      console.log("Profile update skipped (User might already exist)");
    }

    // ----------------------------------------------------------------
    // STEP 2: Subscribe (The Fix is Here)
    // ----------------------------------------------------------------
    const subscribeResponse = await fetch(
      "https://a.klaviyo.com/api/profile-subscription-bulk-create-jobs/",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          data: {
            type: "profile-subscription-bulk-create-job",
            attributes: {
              custom_source: "Website Form",
              profiles: {
                data: [
                  {
                    type: "profile",
                    attributes: {
                      email: email,
                    },
                  },
                ],
              },
            },
            // ✅ THE FIX: list_id must be in "relationships", not "attributes"
            relationships: {
              list: {
                data: {
                  type: "list",
                  id: LIST_ID,
                },
              },
            },
          },
        }),
      },
    );

    if (!subscribeResponse.ok) {
      const errorData = await subscribeResponse.json();
      console.error("❌ Subscribe Error:", JSON.stringify(errorData, null, 2));
      return NextResponse.json(
        { error: "Failed to subscribe" },
        { status: subscribeResponse.status },
      );
    }

    return NextResponse.json({ success: true }, { status: 202 });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
