import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Để xử lý __dirname trong ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbFilePath = path.join(__dirname, '../../database/dictionary/graduation.json');

// Đọc dữ liệu từ file JSON
export const getGraduation = (req, res) => {
    try {
        // Đọc file và parse nội dung JSON
        const dbContent = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));
        
        // Trả về chỉ mục graduation
        res.status(200).json(dbContent.graduation);
    } catch (error) {
        // Xử lý lỗi nếu không đọc được file hoặc parse JSON không thành công
        console.error('Error reading graduation data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Hàm POST để tạo mới điều kiện graduation
export const createGraduationCondition = (req, res) => {
    try {
        const dbContent = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

        // Tìm id lớn nhất hiện tại
        const maxId = dbContent.graduation.reduce((max, item) => (item.id > max ? item.id : max), 0);

        // Tạo điều kiện mới với id lớn hơn 1 đơn vị
        const newCondition = {
            id: maxId + 1,
            content: ""
        };

        // Thêm điều kiện mới vào danh sách
        dbContent.graduation.push(newCondition);

        // Ghi lại file sau khi thêm mới
        fs.writeFileSync(dbFilePath, JSON.stringify(dbContent, null, 2));

        // Trả về dữ liệu graduation sau khi tạo mới
        return res.status(200).json(dbContent.graduation); // Sử dụng return để ngăn mã tiếp tục thực thi sau khi gửi response
    } catch (error) {
        console.error('Error creating graduation condition:', error);
        // Đảm bảo rằng chỉ một response được gửi đi
        if (!res.headersSent) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

export const deleteGraduationCondition = (req, res) => {
    try {
        // Đọc dữ liệu từ file
        const dbContent = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

        // Lấy id từ request body
        const { id } = req.body;

        // Kiểm tra xem id có tồn tại không
        if (!id) {
            return res.status(400).json({ message: 'ID is required' });
        }

        // Tìm index của điều kiện cần xóa
        const index = dbContent.graduation.findIndex(item => item.id === id);

        // Nếu không tìm thấy, trả về lỗi
        if (index === -1) {
            return res.status(404).json({ message: `Graduation condition with id ${id} not found` });
        }

        // Xóa điều kiện khỏi danh sách
        dbContent.graduation.splice(index, 1);

        // Ghi lại file sau khi xóa
        fs.writeFileSync(dbFilePath, JSON.stringify(dbContent, null, 2));

        // Trả về dữ liệu graduation sau khi xóa
        return res.status(200).json(dbContent.graduation);
    } catch (error) {
        console.error('Error deleting graduation condition:', error);
        if (!res.headersSent) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};

export const updateGraduationCondition = (req, res) => {
    try {
        // Đọc dữ liệu từ file JSON
        const dbContent = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

        // Nhận id và content từ request body
        const { id, content } = req.body;

        // Kiểm tra xem id và content có tồn tại không
        if (!id || !content) {
            return res.status(400).json({ message: 'ID and content are required' });
        }

        // Tìm mục có id tương ứng
        const index = dbContent.graduation.findIndex(item => item.id === id);

        // Nếu không tìm thấy, trả về lỗi
        if (index === -1) {
            return res.status(404).json({ message: `Graduation condition with id ${id} not found` });
        }

        // Cập nhật content cho mục có id tương ứng
        dbContent.graduation[index].content = content;

        // Ghi lại file JSON sau khi cập nhật
        fs.writeFileSync(dbFilePath, JSON.stringify(dbContent, null, 2));

        // Trả về dữ liệu graduation sau khi cập nhật
        return res.status(200).json(dbContent.graduation);
    } catch (error) {
        console.error('Error updating graduation condition:', error);
        if (!res.headersSent) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }
    }
};