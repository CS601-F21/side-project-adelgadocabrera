import {NextApiRequest, NextApiResponse} from "next";
import Prisma from "../../db/prisma";
import User from "../../db/user";

export default async function (req: NextApiRequest, res: NextApiResponse): Promise<void> {
    if (req.method === 'GET') {
        res.status(200).json(await getUsers());
    } else {
        res.status(400).json({
            "error": "400 BAD REQUEST"
        })
    }
}


export async function getUsers(): Promise<User[]> {
    return await Prisma.user.findMany({
        include: {
            badges: {
                select: {
                    id: true,
                    name: true,
                    years: true
                }
            }
        }
    });
}