import Link from "next/link";
import Card from "@/components/Card";
import Paragraph from "@/components/Paragraph";

export default function RsvpPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 text-lg lg:text-xl">
      <Card title="To RSVP">
        <Paragraph>
          <strong>
            Please click the "RSVP" button in your email invitation.
          </strong>
        </Paragraph>
        <Paragraph>
          You will be taken to the guest page where you can submit an RSVP for
          each member of your group.
        </Paragraph>
        <Paragraph>
          If you have any questions or encounter any issues, please email us at{" "}
          <Link
            href="mailto:pineappleshirt473@gmail.com"
            className="underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            pineappleshirt473@gmail.com
          </Link>
          .
        </Paragraph>
      </Card>
    </div>
  );
}
