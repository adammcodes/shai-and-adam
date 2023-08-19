import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="bg-white rounded-[28px] drop-shadow-lg text-blue z-10 w-[90%] max-w-[600px] p-5 flex flex-col items-center justify-center lg:flex">
        <h1 className="text-4xl font-bold">Shai & Adam</h1>
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
      </div>
    </main>
  );
}
