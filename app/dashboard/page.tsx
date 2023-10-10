"use client";
import { withPageAuthRequired } from "@auth0/nextjs-auth0/client";
import { useUser } from "@auth0/nextjs-auth0/client";
import Card from "@/components/Card";
import GuestList from "./_components/GuestList";

export default withPageAuthRequired(function Dashboard() {
  const { user, error, isLoading } = useUser();

  return (
    <main className="flex min-h-screen flex-col items-center">
      <Card title="Dashboard">
        <p className="italic">Manage the invites here!</p>
        <br />
        {!isLoading && !error && !user && (
          <>
            <p>
              You are not logged in! <a href="/api/auth/login">Login</a>
            </p>
          </>
        )}
        {isLoading && <p>Loading profile...</p>}
        {error && (
          <>
            <p>Error: {error.message}</p>
            <p>
              <a href="/api/auth/logout">Logout</a>
            </p>
          </>
        )}
        {user && (
          <div>
            <p>Hi {user.name}</p>
            <p>Your email is {user.email}.</p>
            <p>
              <a href="/api/auth/logout">Logout</a>
            </p>
          </div>
        )}
      </Card>

      {user && <GuestList />}
    </main>
  );
});
