import Link from "next/link";
import Card from "@/components/Card";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Card title="Shai & Adam">
        <p className="italic">are getting married!</p>
        <br />
        <strong>We will be hosting two events:</strong>
        <ol className="list-disc p-5">
          <li>
            <Link href="/mehendi">Mehendi</Link> (date TBD)
          </li>
          <li>
            True Blue Bay in <Link href="/grenada">Grenada</Link> on May 9, 2024
          </li>
        </ol>
      </Card>
    </main>
  );
}
