import { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";

import prismadb from '../lib/prismadb';
import { authOptions } from "@/pages/api/auth/[...nextauth]";
// Kiểm tra Login
const serverAuth = async (req: NextApiRequest, res: NextApiResponse) => {
    //getServerSession để lấy thông tin phiên (session) của người dùng từ yêu cầu (req). authOptions có thể là một đối tượng cấu hình cho việc xác thực.
    const session = await getServerSession(req, res, authOptions);
    //KIỂM TRA NẾU KHÔNG CÓ EMAIL USER TRONG SESSION THÌ QUĂNG LỖI NOT SINGN IN
    if (!session?.user?.email) {
        throw new Error('Not signed in');
    }
    //Sử dụng Prisma để truy vấn cơ sở dữ liệu và lấy thông tin người dùng hiện tại 
    //dựa trên địa chỉ email từ phiên xác thực.
    const currentUser = await prismadb.user.findUnique({
        where: {
            email: session.user.email,
        }
    });

    if (!currentUser) {
        throw new Error('Not signed in');
    }
    // Hàm chạy thành công trả về user đã đăng nhập
    return { currentUser };
}
export default serverAuth;