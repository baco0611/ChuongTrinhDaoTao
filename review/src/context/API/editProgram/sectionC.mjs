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
