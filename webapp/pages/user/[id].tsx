import { NextPage, GetServerSideProps } from "next";
import User from "../../db/user";
import { getUserById } from "../api/users";
import { Navbar, Footer } from "../../components";
import { UserPage } from "../../containers";
import { getSession } from "next-auth/client";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const userId: number = Number(context.query.id);
  const profile = await getUserById(userId);

  if (!profile) {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }

  return {
    props: {
      profile,
      // @ts-ignore
      isOwner: session?.user?.id == userId,
    },
  };
};

interface Props {
  isOwner: boolean;
  profile: User;
}

const profilePage: NextPage<Props> = ({ profile, isOwner }) => {
  return (
    <>
      <Navbar />
      <UserPage profile={profile} isOwner={isOwner} />
      <Footer />
    </>
  );
};

export default profilePage;
