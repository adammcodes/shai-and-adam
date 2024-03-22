import Link from "next/link";
import Card from "@/components/Card";
import Paragraph from "@/components/Paragraph";

export default function RsvpPage() {
  return (
    <main className="flex min-h-screen flex-col items-center text-xl">
      <Card title="To RSVP">
        <ol className="list-decimal pl-10" role="list">
          <li className="p-4 font-bold">
            Please click the "RSVP" button in your email invitation.
          </li>
          <li className="p-4 font-bold">
            For each member of your group, fill in the details, and click
            "Submit RSVP".
          </li>
        </ol>

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
    </main>
  );
}
