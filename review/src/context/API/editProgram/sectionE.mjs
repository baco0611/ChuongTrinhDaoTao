import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Để xử lý __dirname trong ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbFilePath = path.join(__dirname, '../../database/editProgram/sectionE.json');
const dbContent = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

export const getPOPLOMatrix = (req, res) => {
    try {
        // Dữ liệu lấy từ sectionE
        const data = dbContent.sectionE;

        // Trả về dữ liệu đã lọc với status
        res.status(200).json({
            data: data, // Trả về toàn bộ dữ liệu sectionE
            status: 200
        });
    } catch (error) {
        console.error('Error reading sectionE data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const updatePOPLOMatrix = (req, res) => {
    try {
        // Dữ liệu từ request body
        const { deleteElement, createElement } = req.body;

        // Lọc để xóa các phần tử có id trong deleteElement
        dbContent.sectionE = dbContent.sectionE.filter(item => !deleteElement.includes(item.id));

        // Tìm id lớn nhất hiện tại
        const maxId = dbContent.sectionE.reduce((max, item) => (item.id > max ? item.id : max), 0);

        // Tạo các phần tử mới từ createElement và thêm id mới
        createElement.forEach((newItem, index) => {
            const newId = maxId + index + 1; // Tính id mới là maxId + 1, maxId + 2, ...
            dbContent.sectionE.push({
                id: newId,
                POId: newItem.POId,
                PLOId: newItem.PLOId
            });
        });

        // Ghi lại file JSON sau khi cập nhật
        fs.writeFileSync(dbFilePath, JSON.stringify(dbContent, null, 2));

        // Trả về dữ liệu mới sau khi cập nhật
        res.status(200).json({
            data: dbContent.sectionE,
            status: 200
        });
    } catch (error) {
        console.error('Error updating sectionE:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
