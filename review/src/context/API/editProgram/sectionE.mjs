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

