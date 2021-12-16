import { NextApiRequest, NextApiResponse } from "next";
import Prisma from "../../db/prisma";
import { getSession } from "next-auth/client";
import { success, failure } from "../../db/response";
import { default as IPost } from "../../db/post";
import { createBadgesForPost } from "./badges";
import { GITHUB_GIST } from "../../utils/gist";

export default async function (
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  if (req.method === "POST") return doPost(req, res);
  if (req.method === "PUT") return doPut(req, res);

  res.status(400).json({
    error: "400 BAD REQUEST",
  });
}

async function doPost(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { title, content, gist, badges } = req.body;
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

    // create post && badges
    const newPost: IPost = await createPost(data);
    await createBadgesForPost(newPost.id, badges);
    newPost.badges = badges;

    res.status(200).json(success<IPost>(newPost));
  } catch (err) {
    res.status(400).json(failure("Oops! Something went wrong creating post!"));
  }
}

async function doPut(req: NextApiRequest, res: NextApiResponse) {
  try {
    const postId = req.body.postId;
    const like = req.body.like;
    if (like) {
      const response: IPost = await likePost(postId);
      res.status(200).json(success<IPost>(response));
    } else {
      const response: IPost = await dislikePost(postId);
      res.status(200).json(success<IPost>(response));
    }
  } catch (err) {
    res.status(400).json(failure("Oops! Something went wrong creating post!"));
  }
}

interface Post {
  title: string;
  content: string;
  gist: GITHUB_GIST;
  views: number;
  likes: number;
  badges?: string[];
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
      badges: true,
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
  // const paginationSize = 8; // pagination to be included in future features

  return await Prisma.post.findMany({
    // skip: paginationSize * pageNumber,
    // take: paginationSize,
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

export async function likePost(postId: number) {
  return await Prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      likes: {
        increment: 1,
      },
    },
  });
}

export async function dislikePost(postId: number) {
  return await Prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      likes: {
        decrement: 1,
      },
    },
  });
}
