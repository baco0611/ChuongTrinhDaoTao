import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Để xử lý __dirname trong ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbFilePath = path.join(__dirname, '../../database/editProgram/edit.json');
const dbContent = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

export const getEditorHeader = (req, res) => {
    const sectionAId = req.params.id;

    // Tìm sectionA theo id
    console.log(dbContent['editorHeader'])
    const header = dbContent['editorHeader'].find(section => section.id == sectionAId);

    if (header) {
        // Tạo response theo format yêu cầu
        const response = {
            id: header.id,
            data: {
                id: header.data.id || "" ,
                programCode: header.data.programCode || "",
                version: header.data.version || "",
                fieldName: header.data.fieldName || ""
            },            
            status: 200 
        };

        res.json(response);
    } else {
        // Trả về lỗi nếu không tìm thấy sectionA
        res.status(404).json({ message: "Section A not found", status: 404 });
    }
};