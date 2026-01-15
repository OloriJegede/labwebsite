import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
  Hr,
} from "@react-email/components";
import * as React from "react";

interface Slot {
  startTime: string;
  endTime: string;
}

interface BookingConfirmationEmailProps {
  firstName: string;
  lastName: string;
  bookingDate: string;
  slots: Slot[];
  totalDuration: number;
  totalPrice: number;
  paymentId: string;
}

export const BookingConfirmationEmail = ({
  firstName,
  lastName,
  bookingDate,
  slots,
  totalDuration,
  totalPrice,
  paymentId,
}: BookingConfirmationEmailProps) => {
  const formattedDate = new Date(bookingDate).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Html>
      <Head />
      <Preview>Your consultation booking is confirmed!</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>Booking Confirmation</Heading>

          <Text style={text}>
            Hi {firstName} {lastName},
          </Text>

          <Text style={text}>
            Thank you for booking a consultation with us! Your payment has been
            successfully processed and your booking is confirmed.
          </Text>

          <Section style={infoSection}>
            <Heading as="h2" style={h2}>
              Booking Details
            </Heading>

            <Text style={infoText}>
              <strong>Date:</strong> {formattedDate}
            </Text>

            <Text style={infoText}>
              <strong>Time Slots:</strong>
            </Text>
            {slots.map((slot, index) => (
              <Text key={index} style={slotText}>
                • {slot.startTime} - {slot.endTime}
              </Text>
            ))}

            <Text style={infoText}>
              <strong>Total Duration:</strong> {totalDuration} hour
              {totalDuration !== 1 ? "s" : ""}
            </Text>

            <Text style={infoText}>
              <strong>Total Amount Paid:</strong> ${totalPrice.toFixed(2)} USD
            </Text>

            <Text style={infoText}>
              <strong>Payment ID:</strong> {paymentId}
            </Text>
          </Section>

          <Hr style={hr} />

          <Section style={noticeSection}>
            <Heading as="h3" style={h3}>
              What&apos;s Next?
            </Heading>
            <Text style={text}>
              • You will receive a calendar invite shortly
            </Text>
            <Text style={text}>
              • A Zoom/meeting link will be sent 24 hours before your
              consultation
            </Text>
            <Text style={text}>
              • Please prepare any questions or concerns you&apos;d like to discuss
            </Text>
          </Section>

          <Hr style={hr} />

          <Text style={footerText}>
            If you need to reschedule or have any questions, please contact us
            at support@yourdomain.com
          </Text>

          <Text style={footerText}>
            Best regards,
            <br />
            The Lab Team
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 20px",
  marginBottom: "64px",
  maxWidth: "600px",
};

const h1 = {
  color: "#1a1a1a",
  fontSize: "32px",
  fontWeight: "700",
  margin: "0 0 20px",
  padding: "0",
  textAlign: "center" as const,
};

const h2 = {
  color: "#1a1a1a",
  fontSize: "24px",
  fontWeight: "600",
  margin: "30px 0 15px",
};

const h3 = {
  color: "#1a1a1a",
  fontSize: "20px",
  fontWeight: "600",
  margin: "20px 0 10px",
};

const text = {
  color: "#525252",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "16px 0",
};

const infoSection = {
  backgroundColor: "#f9fafb",
  borderRadius: "8px",
  padding: "20px",
  margin: "20px 0",
};

const infoText = {
  color: "#1a1a1a",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "8px 0",
};

const slotText = {
  color: "#525252",
  fontSize: "15px",
  lineHeight: "22px",
  margin: "4px 0 4px 20px",
};

const noticeSection = {
  backgroundColor: "#fef3f2",
  borderRadius: "8px",
  padding: "20px",
  margin: "20px 0",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footerText = {
  color: "#8898aa",
  fontSize: "14px",
  lineHeight: "20px",
  margin: "10px 0",
};

export default BookingConfirmationEmail;
