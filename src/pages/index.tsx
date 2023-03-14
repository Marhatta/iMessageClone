import { NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";

const Home: NextPage = () => {
  const { data } = useSession();
  return (
    <div>
      {data?.user ? (
        <button onClick={() => signOut()}>sign out</button>
      ) : (
        <button onClick={() => signIn("google")}>sign in</button>
      )}
      <p> {data?.user?.name}</p>
    </div>
  );
};

export default Home;
