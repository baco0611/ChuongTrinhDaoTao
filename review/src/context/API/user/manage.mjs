import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Để xử lý __dirname trong ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbFilePath = path.join(__dirname, '../../database/user/manage.json');

// Hàm GET để lấy danh sách người dùng
export const getUserManage = (req, res) => {
    try {
        // Đọc dữ liệu từ file JSON
        const dbContent = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

        // Dữ liệu người dùng từ file JSON
        const users = dbContent.userList;

        // Lấy các tham số phân trang từ query (nếu có), mặc định là page 1 và pageSize 15
        const pageOrder = parseInt(req.query.page || 1);  // Trang hiện tại
        const pageSize = parseInt(req.query.pageSize || 15);  // Kích thước trang (số lượng phần tử mỗi trang)

        // Tính offset (bắt đầu của trang)
        const offset = (pageOrder - 1) * pageSize;

        // Lấy dữ liệu cho trang hiện tại dựa vào offset và pageSize
        const paginatedData = users.slice(offset, offset + pageSize);

        // Tính tổng số trang và tổng số phần tử
        const totalElements = users.length;
        const totalPages = Math.ceil(totalElements / pageSize);

        // Tạo đối tượng pageInformation
        const pageInformation = {
            numOfElement: paginatedData.length,
            pageSize: pageSize,
            offset: offset,
            firstPage: pageOrder === 1,
            lastPage: pageOrder === totalPages,
            pageOrder: pageOrder,
            totalPages: totalPages,
            totalElements: totalElements
        };

        // Trả về dữ liệu người dùng với thông tin phân trang
        res.status(200).json({
            data: paginatedData,
            pageInformation: pageInformation,
            status: 200
        });
    } catch (error) {
        console.error('Error reading user data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
