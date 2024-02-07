import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '../../../lib/prismadb';
import serverAuth from "../../../lib/serverAuth";

// Tìm movie theo pram id 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'GET') {
            return res.status(405).end();
        }

        await serverAuth(req, res);

        const { movieId } = req.query;
        //Nếu id get đc k phải string thì throw err id k hợp lệ
        if (typeof movieId !== 'string') {
            throw new Error('Invalid Id');
        }
        //Nếu id k tìm thấy thì throw err missing id
        if (!movieId) {
            throw new Error('Missing Id');
        }
        //Tìm 1 movie theo id 
        const movies = await prismadb.movie.findUnique({
            where: {
                id: movieId
            }
        });
        return res.status(200).json(movies);
    } catch (error) {
        console.log(error);
        return res.status(500).end();
    }
}