import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "../../db/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse): Promise<void> {
    res.status(200).json(await prisma.user.findMany());
}