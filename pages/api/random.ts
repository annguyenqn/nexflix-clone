import { NextApiRequest, NextApiResponse } from "next";
import prismadb from '../../lib/prismadb';
import serverAuth from "../../lib/serverAuth";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        /// kiểm tra phải method get k, nếu k trả về err:405(method ko đc allow)
        if (req.method !== 'GET') {
            return res.status(405).end();
        }
        // Check xác thực đã login hay chưa
        await serverAuth(req, res);
        // Biến movieCount gọi model movie đếm số lượng bản ghi 
        const moviesCount = await prismadb.movie.count();
        //Tính một số ngẫu nhiên làm chỉ mục để chọn một bản ghi ngẫu nhiên từ danh sách
        const randomIndex = Math.floor(Math.random() * moviesCount);
        //Dùng prisma để truy vấn với điều kiện lấy 1 bản ghi (take: 1)
        // Và bỏ qua một số bản ghi từ đầu danh sách (skip: randomIndex). Điều này giúp chọn ra một phim ngẫu nhiên từ cơ sở dữ liệu.
        const randomMovies = await prismadb.movie.findMany({
            take: 1,
            skip: randomIndex
        });
        return res.status(200).json(randomMovies[0]);
    } catch (error) {
        console.log(error);

        return res.status(500).end();
    }
}