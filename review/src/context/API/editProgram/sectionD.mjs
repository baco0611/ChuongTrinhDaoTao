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
    const programLearningOutcomes = dbContent.programLearningOutcomes.filter(outcome => outcome.programId === parseInt(programId));

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
