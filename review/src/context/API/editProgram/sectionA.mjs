import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Để xử lý __dirname trong ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbFilePath = path.join(__dirname, '../../database/editProgram/sectionA.json');
const dbContent = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

export const getSpecialize = (req, res) => {
    const specializationId = req.params.id;

    // Lọc dữ liệu từ specialization-b trong db.json
    const specializations = dbContent['specialization'].filter(specialization => specialization.programId === specializationId);

    if (specializations.length > 0) {
        // Tạo response theo format yêu cầu
        const response = {
            id: specializationId,
            data: specializations.map(s => ({
                specializationName: s.specializationName,
                specializationId: s.specializationId
            })),
            status: 200
        };

        res.json(response);
    } else {
        // Trả về lỗi nếu không tìm thấy specialization
        res.status(404).json({ message: "Specialization not found", status: 404 });
    }
};

export const getSectionA = (req, res) => {
    const sectionAId = req.params.id;

    // Tìm sectionA theo id
    const sectionA = dbContent['sectionA'].find(section => section.id === sectionAId);

    if (sectionA) {
        // Tạo response theo format yêu cầu
        const response = {
            id: sectionA.id,
            data: {
                admissionTarget: sectionA.data.admissionTarget || "",
                advancedSkillsDevelopment: sectionA.data.advancedSkillsDevelopment || "",
                diploma: sectionA.data.diploma || "",
                duration: sectionA.data.duration || "",
                educationLevel: sectionA.data.educationLevel || "",
                employmentPositionAfterGraduation: sectionA.data.employmentPositionAfterGraduation || "",
                englishName: sectionA.data.englishName || "",
                fieldCode: sectionA.data.fieldCode || "",
                fieldName: sectionA.data.fieldName || "",
                graduationConditional: sectionA.data.graduationConditional || "",
                managingDepartment: sectionA.data.managingDepartment || "",
                referenceProgram: sectionA.data.referenceProgram || "",
                requiredCredits: sectionA.data.requiredCredits || "",
                trainingMode: sectionA.data.trainingMode || "",
                vietnameseName: sectionA.data.vietnameseName || "",
                programId: sectionA.data.programId || sectionAId
            },
            status: 200
        };

        res.json(response);
    } else {
        // Trả về lỗi nếu không tìm thấy sectionA
        res.status(404).json({ message: "Section A not found", status: 404 });
    }
};

export const postSectionA = (req, res) => {
    const newData = req.body;

    if (!newData || !newData.id) {
        return res.status(400).json({ error: 'Invalid data. The "id" field is required.' });
    }

    const sectionA = dbContent.sectionA || [];

    // Tìm phần tử có cùng id trong sectionA
    const existingIndex = sectionA.findIndex(item => item.id === newData.id);

    if (existingIndex >= 0) {
        // Nếu đã tồn tại, cập nhật dữ liệu
        sectionA[existingIndex].data = { ...sectionA[existingIndex].data, ...newData };
    } else {
        // Nếu không tồn tại, thêm mới
        sectionA.push({ id: newData.id, data: newData });
    }

    // Ghi dữ liệu mới vào db.json
    dbContent.sectionA = sectionA;
    fs.writeFileSync(dbFilePath, JSON.stringify(dbContent, null, 2), 'utf-8');

    res.status(200).json({ message: 'Data added/updated successfully', data: newData });
};

export const postCreateSpecialize = (req, res) => {
    const { programId } = req.body;

    // Kiểm tra xem id (programId) đã được cung cấp chưa
    if (!programId) {
        return res.status(400).json({ error: 'Invalid data. Field "id" (programId) is required.' });
    }

    // Đảm bảo rằng danh sách specialization tồn tại
    const specializations = dbContent.specialization || [];

    // Tìm ID lớn nhất hiện tại
    const maxId = specializations.reduce((max, spec) => Math.max(max, parseInt(spec.specializationId)), 0);

    // Tạo ID mới dựa trên maxId
    const newId = String(maxId + 1);

    // Tạo đối tượng specialization mới với các trường trống và ID tự sinh
    const newSpecialization = {
        id: newId,  // ID mới
        specializationName: "",  // Các trường trống
        specializationId: newId,  // Sử dụng ID mới cho specializationId
        programId: programId
    };

    // Thêm specialization mới vào danh sách
    specializations.push(newSpecialization);

    // Ghi dữ liệu mới vào db.json
    dbContent.specialization = specializations;
    fs.writeFileSync(dbFilePath, JSON.stringify(dbContent, null, 2), 'utf-8');

    // Lọc danh sách chuyên ngành theo programId (id)
    const filteredSpecializations = specializations.filter(specialization => specialization.programId == id);

    // Tạo response với danh sách các chuyên ngành
    const data = {
        id: programId,
        data: filteredSpecializations.map(s => ({
            specializationName: s.specializationName,
            specializationId: s.specializationId
        })),
        status: 200
    };

    // Trả về danh sách các chuyên ngành
    res.status(200).json(data);
};

export const deleteSpecialize = (req, res) => {
    const { specializationId } = req.body;

    // Kiểm tra xem specializationId đã được cung cấp chưa
    if (!specializationId) {
        return res.status(400).json({ error: 'Invalid data. Field "specializationId" is required.' });
    }

    // Đảm bảo rằng danh sách specialization tồn tại
    const specializations = dbContent.specialization || [];

    // Tìm specialization cần xóa và lấy programId của nó
    const specialization = specializations.find(specialization => specialization.specializationId === specializationId);

    if (!specialization) {
        return res.status(404).json({ error: `Specialization with id ${specializationId} not found.` });
    }

    // Lấy programId từ specialization
    const programId = specialization.programId;

    // Xóa specialization khỏi danh sách
    const specializationIndex = specializations.indexOf(specialization);
    specializations.splice(specializationIndex, 1);

    // Ghi dữ liệu mới vào db.json
    dbContent.specialization = specializations;
    fs.writeFileSync(dbFilePath, JSON.stringify(dbContent, null, 2), 'utf-8');

    // Lọc danh sách chuyên ngành theo programId
    const filteredSpecializations = specializations.filter(s => s.programId === programId);

    // Tạo response với danh sách các chuyên ngành
    const data = {
        id: programId,
        data: filteredSpecializations.map(s => ({
            specializationName: s.specializationName,
            specializationId: s.specializationId
        })),
        status: 200
    };

    // Trả về danh sách các chuyên ngành
    res.status(200).json(data);
};

export const updateSpecialize = (req, res) => {
    const { specializationId, specializationName } = req.body;

    // Kiểm tra xem cả specializationId và specializationName đã được cung cấp chưa
    if (!specializationId || !specializationName) {
        return res.status(400).json({ error: 'Invalid data. Fields "specializationId" and "specializationName" are required.' });
    }

    // Đảm bảo rằng danh sách specialization tồn tại
    const specializations = dbContent.specialization || [];

    // Tìm specialization cần cập nhật
    const specialization = specializations.find(specialization => specialization.specializationId === specializationId);

    if (!specialization) {
        return res.status(404).json({ error: `Specialization with id ${specializationId} not found.` });
    }

    // Cập nhật tên của specialization
    specialization.specializationName = specializationName;

    // Ghi dữ liệu mới vào db.json
    fs.writeFileSync(dbFilePath, JSON.stringify(dbContent, null, 2), 'utf-8');

    // Trả về phản hồi thành công
    res.status(200).json({ message: `Specialization with id ${specializationId} updated successfully.` });
};

