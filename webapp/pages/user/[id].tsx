import { NextPage, GetServerSideProps } from "next";
import User from "../../db/user";
import { getUserById } from "../api/users";
import { Container, Navbar, Footer } from "../../components";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userId: number = Number(context.query.id);
  const profile = await getUserById(userId);

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
  const { name, quote, image } = profile;

  return (
    <>
      <Navbar />
      <Container>
        This is {name}
        <img src={image} />
      </Container>
      <Footer />
    </>
  );
};

export default profilePage;
