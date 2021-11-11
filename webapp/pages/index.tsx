import type {GetServerSideProps, NextPage} from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Code, Container, Footer, Hero, Navbar, PostCard} from "../components";
import {getPosts} from "./api/posts";
import Post from "../db/post";

export const getServerSideProps: GetServerSideProps = async () => {
    const posts = await getPosts(0);
    console.log(posts)

    return {
        props: {
            posts
        }
    }
}

interface Props {
    posts: Post[];
}

const Home: NextPage<Props> = (props) => {
    const {posts} = props;
    return (
        <>
            <Navbar/>
            <Container>

                <Head>
                    <title>CodeReview</title>
                    <meta name="description" content="CodeReview"/>
                    <link rel="icon" href="/favicon.ico"/>
                </Head>

                <Hero/>
                <main>
                    <p>
                        Get started by {' '}
                        <Code>code reviewing</Code>
                    </p>
                    {
                        posts.map(p =>
                            <PostCard post={{
                                id: p.id,
                                title: p.title,
                                content: p.content,
                                gist: p.gist,
                                author: p.author,
                                authorId: p.authorId,
                                createdAt: p.createdAt,
                                updatedAt: p.updatedAt,
                                isOpen: p.isOpen,
                                likes: p.likes,
                                views: p.views,
                                badges: p.badges,
                                codeReviews: p.codeReviews
                            }}/>
                        )
                    }

                    <div className={styles.grid}>
                        <a href="https://nextjs.org/docs" className={styles.card}>
                            <h2>Documentation &rarr;</h2>
                            <p>Find in-depth information about Next.js features and API.</p>
                        </a>

                        <a href="https://nextjs.org/learn" className={styles.card}>
                            <h2>Learn &rarr;</h2>
                            <p>Learn about Next.js in an interactive course with quizzes!</p>
                        </a>

                        <a
                            href="https://github.com/vercel/next.js/tree/master/examples"
                            className={styles.card}
                        >
                            <h2>Examples &rarr;</h2>
                            <p>Discover and deploy boilerplate example Next.js projects.</p>
                        </a>

                        <a
                            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                            className={styles.card}
                        >
                            <h2>Deploy &rarr;</h2>
                            <p>
                                Instantly deploy your Next.js site to a public URL with Vercel.
                            </p>
                        </a>
                    </div>
                </main>
                <Footer/>
            </Container>
        </>
    )
}

export default Home
