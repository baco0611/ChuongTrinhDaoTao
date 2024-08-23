import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Để xử lý __dirname trong ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbFilePath = path.join(__dirname, '../../database/editProgram/sectionC.json');
const dbContent = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

export const getProgramObjectives = (req, res) => {
    const programId = req.params.id;

    // Đảm bảo rằng danh sách programObjective tồn tại
    const programObjectives = dbContent.programObjective || [];
    
    // Lọc các object theo programId
    const filteredObjectives = programObjectives.filter(objective => objective.programId === parseInt(programId));

    // Trả về danh sách các objectives
    res.status(200).json({
        data: filteredObjectives,
        status: 200
    });
};

export const updateProgramObjective = (req, res) => {
    const { id, content } = req.body;

    // Kiểm tra xem cả id và content đã được cung cấp chưa
    if (!id || content == undefined) {
        return res.status(400).json({ error: 'Invalid data. Fields "id" and "content" are required.' });
    }

    // Đảm bảo rằng danh sách programObjective tồn tại
    const programObjectives = dbContent.programObjective || [];

    // Tìm PO cần cập nhật
    const objectiveIndex = programObjectives.findIndex(objective => objective.id === parseInt(id));

    if (objectiveIndex === -1) {
        return res.status(404).json({ error: `Program Objective with id ${id} not found.` });
    }

    // Cập nhật content của PO
    programObjectives[objectiveIndex].content = content;

    // Ghi dữ liệu mới vào db.json
    fs.writeFileSync(dbFilePath, JSON.stringify(dbContent, null, 2), 'utf-8');

    // Trả về phản hồi thành công
    res.status(200).json({ message: `Program Objective with id ${id} updated successfully.` });
};

export const createProgramObjective = (req, res) => {
    const { programId, symbol, type } = req.body;

    // Kiểm tra xem các trường dữ liệu đã được cung cấp chưa
    if (!programId || !symbol || !type) {
        return res.status(400).json({ error: 'Invalid data. Fields "programId", "symbol", and "type" are required.' });
    }

    // Đảm bảo rằng danh sách programObjective tồn tại
    const programObjectives = dbContent.programObjective || [];

    // Tạo một ID mới cho PO (tự tăng dựa trên ID lớn nhất hiện tại)
    const newId = programObjectives.length > 0 ? Math.max(...programObjectives.map(po => po.id)) + 1 : 1;

    // Tạo PO mới
    const newObjective = {
        id: newId,
        programId: parseInt(programId),
        symbol,
        content: "", // Nội dung ban đầu là rỗng
        type
    };

    // Thêm PO mới vào danh sách
    programObjectives.push(newObjective);

    // Ghi dữ liệu mới vào db.json
    fs.writeFileSync(dbFilePath, JSON.stringify(dbContent, null, 2), 'utf-8');

    // Lọc danh sách PO theo programId
    const filteredObjectives = programObjectives.filter(objective => objective.programId === parseInt(programId));

    // Trả về danh sách các PO của programId tương ứng
    res.status(200).json({
        data: filteredObjectives,
        status: 200
    });
};

export const deleteProgramObjective = (req, res) => {
    const { id } = req.body;

    // Kiểm tra xem id đã được cung cấp chưa
    if (!id) {
        return res.status(400).json({ error: 'Invalid data. Field "id" is required.' });
    }

    // Đảm bảo rằng danh sách programObjective tồn tại
    const programObjectives = dbContent.programObjective || [];

    // Tìm index của PO cần xóa
    const objectiveIndex = programObjectives.findIndex(objective => objective.id === parseInt(id));

    if (objectiveIndex === -1) {
        return res.status(404).json({ error: `Program Objective with id ${id} not found.` });
    }

    // Lưu programId trước khi xóa
    const programId = programObjectives[objectiveIndex].programId;

    // Xóa PO khỏi danh sách
    programObjectives.splice(objectiveIndex, 1);

    // Ghi dữ liệu mới vào db.json
    fs.writeFileSync(dbFilePath, JSON.stringify(dbContent, null, 2), 'utf-8');

    // Lọc danh sách PO theo programId
    const filteredObjectives = programObjectives.filter(objective => objective.programId === programId);

    // Trả về danh sách các PO của programId tương ứng
    res.status(200).json({
        data: filteredObjectives,
        status: 200
    });
};

export const updateProgramObjectives = (req, res) => {
    const updatedPOs = req.body; // Mảng chứa các PO cần cập nhật

    if (!Array.isArray(updatedPOs) || updatedPOs.length === 0) {
        return res.status(400).json({ error: 'Invalid data. The payload should be a non-empty array.' });
    }

    const programObjectives = dbContent.programObjective || [];

    updatedPOs.forEach(updatedPO => {
        const index = programObjectives.findIndex(po => po.id === updatedPO.id);
        if (index !== -1) {
            // Cập nhật các trường 'symbol' và 'type' của PO
            programObjectives[index].symbol = updatedPO.symbol;
            programObjectives[index].type = updatedPO.type;
        }
    });

    // Ghi dữ liệu mới vào db.json
    dbContent.programObjective = programObjectives;
    fs.writeFileSync(dbFilePath, JSON.stringify(dbContent, null, 2), 'utf-8');

    res.status(200).json({ message: 'Program Objectives updated successfully' });
};