import { NextApiRequest, NextApiResponse } from "next";
import Prisma from "../../db/prisma";
import { failure, success } from "../../db/response";

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
    const { authorId, content, postId } = req.body;
    const response = await createCodeReview({
      authorId,
      content,
      postId,
    });

    res.status(200).json(success(response));
  } catch (err) {
    res
      .status(400)
      .json(failure("Oops! Something went wrong creating code review!"));
  }
}

interface CodeReview {
  authorId: number;
  content: string;
  postId: number;
}

export async function createCodeReview(codereview: CodeReview) {
  return await Prisma.codeReview.create({
    data: codereview,
    include: {
      author: true,
    },
  });
}
