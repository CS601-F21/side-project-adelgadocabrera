import type {GetServerSideProps, NextPage} from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import {getUsers} from './api/users';
import User from "../db/user";
import {Code, Container, Hero, PostCard} from "../components";

export const getServerSideProps: GetServerSideProps = async () => {
    const users = await getUsers();

    return {
        props: {
            users
        }
    }
}

interface Props {
    users: User[];
}

const Home: NextPage<Props> = (props) => {
    console.log(props.users);
    return (
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
                <PostCard post={{
                    id: 1,
                    title: "Is this how Firebase API is supposed to be used?",
                    content: "This is an example of content of code review",
                    gist: "http://github.io",
                    author: props.users[0],
                    authorId: props.users[0].id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isOpen: true,
                    likes: 29,
                    views: 30,
                    badges: [{id: 1, name: "next.js"}, {id: 2, name: "aws"}],
                    codeReviews: []
                }}/>

                <PostCard post={{
                    id: 2,
                    title: "Is this how Firebase API is supposed to be used?",
                    content: "This is an example of content of code review",
                    gist: "http://github.io",
                    author: props.users[0],
                    authorId: props.users[0].id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isOpen: true,
                    likes: 29,
                    views: 30,
                    badges: [{id: 1, name: "next.js"}, {id: 2, name: "aws"}],
                    codeReviews: []
                }}/>

                <PostCard post={{
                    id: 3,
                    title: "Is this how Firebase API is supposed to be used?",
                    content: "This is an example of content of code review",
                    gist: "http://github.io",
                    author: props.users[0],
                    authorId: props.users[0].id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    isOpen: true,
                    likes: 29,
                    views: 30,
                    badges: [{id: 1, name: "next.js"}, {id: 2, name: "aws"}],
                    codeReviews: []
                }}/>

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

            <footer className={styles.footer}>
                <a
                    href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Powered by{' '}
                    <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16}/>
          </span>
                </a>
            </footer>
        </Container>
    )
}

export default Home
