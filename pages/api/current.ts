import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "../../lib/serverAuth";
//APi get current user
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        if (req.method !== 'GET') {
            return res.status(405).end();
        }
        // Biến currentUser chứa thông tin của current user được return về sau khi gọi serverAuth
        //Biến nhận về phải giống biển return về của serverAuth
        const { currentUser } = await serverAuth(req, res);

        return res.status(200).json(currentUser);
    } catch (error) {
        console.log(error);
        return res.status(500).end();
    }
}