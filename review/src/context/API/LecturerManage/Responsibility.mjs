import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Để xử lý __dirname trong ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbFilePath = path.join(__dirname, '../../database/LecturerManage/Responsibility.json');
const dbContent = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

export const getResponsibility = (req, res) => {
    // Trả về nội dung của thuộc tính "responsibility"
    res.status(200).json(dbContent.responsibility);
};

export const updateResponsibleLecturer = (req, res) => {
    const { id, lecturerCode, lecturerName, lecturerId } = req.body;

    // Tìm đơn vị có id tương ứng trong danh sách responsibility
    const department = dbContent.responsibility.data.find(dept => dept.departmentId === id);

    if (department) {
        // Nếu bất kỳ thông tin nào về lecturer không có trong request, đặt responsibleLecturer thành null
        if (lecturerCode === undefined || lecturerName === undefined || lecturerId === undefined) {
            department.responsibleLecturer = null;
        } else {
            // Cập nhật thông tin cho responsibleLecturer
            department.responsibleLecturer = {
                id: lecturerId,
                lecturerCode: lecturerCode,
                lecturerName: lecturerName
            };
        }

        // Ghi lại file JSON sau khi cập nhật
        fs.writeFileSync(dbFilePath, JSON.stringify(dbContent, null, 2));

        // Trả về toàn bộ nội dung responsibility sau khi cập nhật
        res.status(200).json(dbContent.responsibility);
    } else {
        // Trả về lỗi nếu không tìm thấy department với id tương ứng
        res.status(404).json({ message: `Department with id ${id} not found`, status: 404 });
    }
};
