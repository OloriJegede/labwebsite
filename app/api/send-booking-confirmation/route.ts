import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { BookingConfirmationEmail } from "@/components/emails/BookingConfirmationEmail";

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const {
      email,
      firstName,
      lastName,
      bookingDate,
      slots,
      totalDuration,
      totalPrice,
      paymentId,
    } = await req.json();

    const { data, error } = await resend.emails.send({
      from: "Lab Consultations <bookings@yourdomain.com>", // Change this to your verified domain
      to: [email],
      subject: "Consultation Booking Confirmation",
      react: BookingConfirmationEmail({
        firstName,
        lastName,
        bookingDate,
        slots,
        totalDuration,
        totalPrice,
        paymentId,
      }),
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}
