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

export const updateUser = (req, res) => {
    try {
        // Lấy dữ liệu từ request body
        const { firstName, lastName, departmentName, email, lecturerCode, role } = req.body;

        // Đọc dữ liệu hiện tại từ file JSON
        const dbContent = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

        // Cập nhật các trường dữ liệu, nếu có
        if (firstName) dbContent.user.firstName = firstName;
        if (lastName) dbContent.user.lastName = lastName;
        if (departmentName) dbContent.user.departmentName = departmentName;
        if (email) dbContent.user.email = email;
        if (lecturerCode) dbContent.user.lectureCode = lecturerCode;
        if (role) dbContent.user.roles = role;

        // Ghi dữ liệu mới vào file JSON
        fs.writeFileSync(dbFilePath, JSON.stringify(dbContent, null, 2));

        // Trả về dữ liệu mới sau khi cập nhật
        res.status(200).json({
            data: {
                firstName: dbContent.user.firstName,
                lastName: dbContent.user.lastName,
                departmentName: dbContent.user.departmentName,
                email: dbContent.user.email,
                lecturerCode: dbContent.user.lectureCode,
                role: dbContent.user.roles
            },
            status: 200
        });
    } catch (error) {
        console.error('Error updating user data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
