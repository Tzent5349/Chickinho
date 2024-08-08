// pages/protected.tsx
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";

const ProtectedPage = () => {
  return <div>Protected Content</div>;
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default ProtectedPage;
