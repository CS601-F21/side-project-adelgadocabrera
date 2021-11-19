import { NextApiRequest, NextApiResponse } from "next";
import Prisma from "../../db/prisma";
import { getSession } from "next-auth/client";
import { success, failure } from "../../db/response";
import { default as IPost } from "../../db/post";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") return doPost(req, res);

  res.status(400).json({
    error: "400 BAD REQUEST",
  });
}

async function doPost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { title, content, gist } = req.body;
    const session = await getSession({ req });

    const data = {
      title,
      content,
      gist,
      // @ts-ignore
      authorId: session?.user?.id,
      views: 0,
      likes: 0,
    };

    const result = await createPost(data);
    res.status(200).json(success<IPost>(result));
  } catch (err) {
    res.status(400).json(failure("Oops! Something went wrong creating post!"));
  }
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
      codeReviews: {
        include: {
          author: true,
        },
        orderBy: [{ updatedAt: "desc" }],
      },
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
      _count: {
        select: {
          codeReviews: true,
        },
      },
    },
    orderBy: [
      {
        createdAt: "desc",
      },
    ],
  });
}
