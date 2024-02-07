//Axios dùng để thực hiện các yêu cầu HTTP 
import axios from 'axios';

//Hàm fetcher có pram là url
//axios.get(url): Gửi một yêu cầu HTTP GET đến url bằng cách sử dụng Axios.
//.then(res => res.data): Khi yêu cầu hoàn thành thành công,(Promise) trả về dữ liệu của phản hồi (res.data).
const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default fetcher;