import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Để xử lý __dirname trong ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbFilePath = path.join(__dirname, '../../database/user/user.json');

// Hàm GET để lấy thông tin người dùng từ file
export const getUser = (req, res) => {
    try {
        // Đọc dữ liệu từ file JSON
        const dbContent = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

        // Tạo đối tượng với cấu trúc mong muốn
        const userData = {
            data: {
                firstName: dbContent.user.firstName,
                lastName: dbContent.user.lastName,
                departmentName: dbContent.user.departmentName,
                email: dbContent.user.email,
                lecturerCode: dbContent.user.lecturerCode,
                role: dbContent.user.roles
            },
            status: 200
        };

        // Trả về thông tin người dùng theo định dạng mong muốn
        res.status(200).json(userData);
    } catch (error) {
        console.error('Error reading user data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
