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