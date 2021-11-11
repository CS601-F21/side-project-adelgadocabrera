import {NextApiRequest, NextApiResponse} from "next";
import Prisma from "../../db/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse): Promise<void> {
    res.status(400).json({
        "error": "400 BAD REQUEST"
    })
}

export async function getPostById(id: number) {
    return await Prisma.post.findUnique({
        where: {
            id
        }
    });
}

export async function getPosts(pageNumber: number) {
    const paginationSize = 8;

    return await Prisma.post.findMany({
        skip: paginationSize * pageNumber,
        take: paginationSize,
        include: {
            badges: true
        }
    });
}