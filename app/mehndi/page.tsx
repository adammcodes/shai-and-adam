// mehndi page
import Card from "@/components/Card";

export default function Mehndi() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <Card title="Mehndi">
        <p className="italic">date to be determined</p>
        <br />
        <strong>Location:</strong>
        <p className="text-center">
          Somewhere in the GTA, Ontario, Canada.
          <br /> Precise location to be determined...
        </p>
        <br />
        <strong>Details:</strong>
        <p className="text-center">
          We&apos;re still working out the details.
          <br /> We&apos;ll be sharing more information as we get closer to the
          date!
        </p>
      </Card>
    </main>
  );
}
