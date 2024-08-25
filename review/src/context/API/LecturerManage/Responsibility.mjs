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