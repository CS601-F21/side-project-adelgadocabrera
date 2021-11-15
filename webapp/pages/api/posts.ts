import { NextApiRequest, NextApiResponse } from "next";
import Prisma from "../../db/prisma";
import { getSession } from "next-auth/client";
import { getUserByName } from "./users";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") {
    const { title, content, gist } = req.body;
    const session = await getSession({ req });
    const user = session?.user?.name && getUserByName(session?.user?.name);
    console.log(user);
    res.status(200).json(user);
    return;

    const data = {
      title,
      content,
      gist,
      author: session?.user?.name,
      views: 0,
      likes: 0,
    };
    const result = createPost(data);
    console.log(result);
  }

  res.status(400).json({
    error: "400 BAD REQUEST",
  });
}

interface Post {
  title: string;
  content: string;
  gist: string;
  views: number;
  likes: number;
  badges?: number[];
}

export async function createPost(post: Post) {
  return await Prisma.post.create({
    data: post,
  });
}

export async function getPostById(id: number) {
  return await Prisma.post.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
      codeReviews: true,
    },
  });
}

export async function getPosts(pageNumber: number) {
  const paginationSize = 8;

  return await Prisma.post.findMany({
    skip: paginationSize * pageNumber,
    take: paginationSize,
    include: {
      badges: true,
    },
  });
}
