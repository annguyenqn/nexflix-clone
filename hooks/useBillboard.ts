// thư viện SWR (Stale-While-Revalidate) trong React để quản lý việc fetch dữ liệu từ một API endpoin
import useSwr from 'swr'
import fetcher from '../lib/fetcher';
// useBillboard được sử dụng để fetch dữ liệu từ API endpoint.
const useBillboard = () => {
    //Gọi tới api với đg dẫn là '/api/random' gọi getcher để từ url thực hiện get method
    const { data, error, isLoading } = useSwr('/api/random', fetcher, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false,
    });
    return {
        //data: Dữ liệu lấy được từ API endpoint.
        //error: Lỗi nếu có trong quá trình fetching.
        //isLoading: Trạng thái loading, có giá trị true khi đang trong quá trình fetching.
        data,
        error,
        isLoading
    }
};

export default useBillboard;