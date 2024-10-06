import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Để xử lý __dirname trong ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbFilePath = path.join(__dirname, '../../database/editProgram/sectionD.json');
const dbContent = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

export const getProgramLearningOutcomes = (req, res) => {
    const { programId } = req.params;

    // Lọc dữ liệu programLearningOutcomes theo programId
    const programLearningOutcomes = dbContent.programLearningOutcomes.filter(outcome => outcome.programId == programId);

    if (programLearningOutcomes.length > 0) {
        res.status(200).json({ 
            data: programLearningOutcomes,
            status: 200,
            programId
        });
    } else {
        res.status(404).json({ message: `No program learning outcomes found for programId ${programId}` });
    }
};

export const updateProgramLearningOutcome = (req, res) => {
    const { id, content, competency } = req.body;

    // Tìm phần tử cần cập nhật dựa trên id
    const outcomeIndex = dbContent.programLearningOutcomes.findIndex(outcome => outcome.id === id);

    if (outcomeIndex !== -1) {
        // Cập nhật content và competency
        dbContent.programLearningOutcomes[outcomeIndex].content = content;
        dbContent.programLearningOutcomes[outcomeIndex].competency = competency;

        // Ghi lại tệp JSON
        fs.writeFileSync(dbFilePath, JSON.stringify(dbContent, null, 2));

        // Trả về phản hồi thành công
        res.status(200).json({ message: 'Program Learning Outcome updated successfully', status: 200 });
    } else {
        res.status(404).json({ message: `No program learning outcome found for id ${id}` });
    }
};

export const createProgramLearningOutcome = (req, res) => {
    const { programId, type, typeDetail, symbol, content, competency } = req.body;

    // Tìm ID lớn nhất hiện có trong mảng programLearningOutcomes
    const maxId = dbContent.programLearningOutcomes.reduce((max, outcome) => outcome.id > max ? outcome.id : max, 0);

    // Tạo PLO mới với ID mới là maxId + 1
    const newPLO = {
        id: maxId + 1,
        programId,
        type,
        typeDetail,
        symbol,  // Sử dụng symbol được gửi lên, không cần tạo mới
        content: "", // Nội dung có thể được gửi kèm hoặc để trống
        competency: "" // Mức độ năng lực, mặc định là 0 nếu không gửi lên
    };

    // Thêm PLO mới vào mảng
    dbContent.programLearningOutcomes.push(newPLO);

    // Ghi lại file JSON
    fs.writeFileSync(dbFilePath, JSON.stringify(dbContent, null, 2));

    // Lọc lại danh sách PLO theo programId
    const programLearningOutcomes = dbContent.programLearningOutcomes.filter(outcome => outcome.programId == programId);

    // Trả về phản hồi thành công kèm toàn bộ danh sách PLO
    res.status(200).json({ 
        message: 'Program Learning Outcome created successfully', 
        data: programLearningOutcomes, 
        status: 200
    });
};

export const deleteProgramLearningOutcome = (req, res) => {
    const { id } = req.body;

    // Tìm index của PLO cần xóa
    const index = dbContent.programLearningOutcomes.findIndex(outcome => outcome.id === id);

    if (index !== -1) {
        // Xóa PLO khỏi mảng
        dbContent.programLearningOutcomes.splice(index, 1);

        // Ghi lại file JSON
        fs.writeFileSync(dbFilePath, JSON.stringify(dbContent, null, 2));

        // Trả về danh sách PLO sau khi xóa
        res.status(200).json({ 
            message: 'Program Learning Outcome deleted successfully', 
            data: dbContent.programLearningOutcomes, 
            status: 200 
        });
    } else {
        res.status(404).json({ message: `Program Learning Outcome with id ${id} not found`, status: 404 });
    }
};

export const updateMultipleProgramLearningOutcomes = (req, res) => {
    const outcomesToUpdate = req.body;

    outcomesToUpdate.forEach(outcomeData => {
        const { id, type, typeDetail, symbol } = outcomeData;

        // Tìm PLO cần cập nhật theo id
        const index = dbContent.programLearningOutcomes.findIndex(outcome => outcome.id === id);

        if (index !== -1) {
            // Cập nhật các trường tương ứng
            dbContent.programLearningOutcomes[index].type = type;
            dbContent.programLearningOutcomes[index].typeDetail = typeDetail;
            dbContent.programLearningOutcomes[index].symbol = symbol;
        }
    });

    // Ghi lại file JSON sau khi cập nhật
    fs.writeFileSync(dbFilePath, JSON.stringify(dbContent, null, 2));

    // Trả về danh sách PLO sau khi cập nhật
    res.status(200).json({ 
        message: 'Program Learning Outcomes updated successfully', 
        data: dbContent.programLearningOutcomes, 
        status: 200 
    });
};
