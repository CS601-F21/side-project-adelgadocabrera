import { NextPage, GetServerSideProps } from "next";
import User from "../../db/user";
import { getUserById } from "../api/users";
import { Navbar, Footer } from "../../components";
import { UserPage } from "../../containers";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId: number = Number(context.query.id);
  const profile = await getUserById(userId);

  if (!profile) {
    return {
      redirect: {
        permanent: false,
        destination: "/"
      },
      props: {}
    }
  }

  return {
    props: {
      profile,
    },
  };
};

interface Props {
  profile: User;
}

const profilePage: NextPage<Props> = ({ profile }) => {
  return (
    <>
      <Navbar />
      <UserPage profile={profile} />
      <Footer />
    </>
  );
};

export default profilePage;
