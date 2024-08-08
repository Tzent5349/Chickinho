/* // lib/withAuth.tsx
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

const withAuth = (Component, roles = []) => {
  return (props) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
      if (status === "loading") return; // Do nothing while loading

      if (!session) {
        signIn(); // Redirect to login
      } else if (roles.length && !roles.includes(session.user.role)) {
        router.push("/"); // Redirect to home if user doesn't have required role
      }
    }, [session, status]);

    if (status === "loading" || !session) {
      return <p>Loading...</p>; // Show a loading message while checking session
    }

    return <Component {...props} />;
  };
};

export default withAuth;
 */