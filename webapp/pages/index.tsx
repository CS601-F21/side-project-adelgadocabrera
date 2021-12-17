import type { GetServerSideProps, NextPage } from "next";
import { HomePage } from "../containers";
import Head from "next/head";
import { Footer, Navbar } from "../components";
import { getPosts } from "./api/posts";
import { getBadges } from "./api/badges";
import Post from "../db/post";
import Badge, { BadgesMap } from "../db/badge";

export const getServerSideProps: GetServerSideProps = async () => {
  const reqPosts = getPosts(0);
  const reqBadges: Promise<Badge[]> = getBadges();

  const data = await Promise.all([reqPosts, reqBadges]);
  const badges: Badge[] = data[1];
  const badgesMap: BadgesMap = badges.reduce((prev: BadgesMap, curr: Badge) => {
    const badge = curr.name;
    if (prev.hasOwnProperty(badge)) {
      prev[badge] = prev[badge] + 1;
    } else {
      prev[badge] = 1;
    }
    return prev;
  }, {});

  return {
    props: {
      posts: data[0],
      badges: badgesMap,
    },
  };
};

interface Props {
  posts: Post[];
  badges: BadgesMap;
}

const Home: NextPage<Props> = (props) => {
  const { posts, badges } = props;
  return (
    <>
      <Head>
        <title>CodeReview</title>
        <meta name="description" content="CodeReview" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <HomePage posts={posts} badges={badges} />
      <Footer />
    </>
  );
};

export default Home;

// <div className={styles.grid}>
//   <a href="https://nextjs.org/docs" className={styles.card}>
//     <h2>Documentation &rarr;</h2>
//     <p>Find in-depth information about Next.js features and API.</p>
//   </a>

//   <a href="https://nextjs.org/learn" className={styles.card}>
//     <h2>Learn &rarr;</h2>
//     <p>Learn about Next.js in an interactive course with quizzes!</p>
//   </a>

//   <a
//     href="https://github.com/vercel/next.js/tree/master/examples"
//     className={styles.card}
//   >
//     <h2>Examples &rarr;</h2>
//     <p>Discover and deploy boilerplate example Next.js projects.</p>
//   </a>

//   <a
//     href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
//     className={styles.card}
//   >
//     <h2>Deploy &rarr;</h2>
//     <p>
//       Instantly deploy your Next.js site to a public URL with Vercel.
//     </p>
//   </a>
// </div>
