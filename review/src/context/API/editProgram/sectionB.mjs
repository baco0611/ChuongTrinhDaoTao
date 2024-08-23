import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Để xử lý __dirname trong ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbFilePath = path.join(__dirname, '../../database/editProgram/sectionB.json');
const dbContent = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

export const getSectionB = (req, res) => {
    const sectionBId = req.params.id;

    // Tìm sectionB theo id
    const sectionB = dbContent['sectionB'].find(section => section.programId === sectionBId);

    if (sectionB) {
        // Tạo response theo format yêu cầu
        const response = {
            programId: sectionB.programId,
            data: {
                overallObjectives: sectionB.data.overallObjectives || ""
            },
            status: 200
        };

        res.json(response);
    } else {
        // Trả về lỗi nếu không tìm thấy sectionB
        res.status(404).json({ message: "Section B not found", status: 404 });
    }
};

export const postSectionB = (req, res) => {
    const newData = req.body;

    if (!newData || !newData.programId) {
        return res.status(400).json({ error: 'Invalid data. The "id" field is required.' });
    }

    const sectionB = dbContent.sectionB || [];

    // Tìm phần tử có cùng id trong sectionB
    const existingIndex = sectionB.findIndex(item => item.programId == newData.programId);

    if (existingIndex >= 0) {
        // Nếu đã tồn tại, cập nhật dữ liệu
        sectionB[existingIndex].data.overallObjectives = newData.overallObjectives;
    }

    // Ghi dữ liệu mới vào db.json
    dbContent.sectionB = sectionB;
    fs.writeFileSync(dbFilePath, JSON.stringify(dbContent, null, 2), 'utf-8');

    res.status(200).json({ message: 'Data added/updated successfully', data: newData });
};
