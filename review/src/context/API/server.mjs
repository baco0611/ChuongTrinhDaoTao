import jsonServer from 'json-server';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { deleteSpecialize, getSectionA, getSpecialize, postCreateSpecialize, postSectionA, updateSpecialize } from './editProgram/sectionA.mjs';
import { getSectionB, postSectionB } from './editProgram/sectionB.mjs';
import { getEditorHeader } from './editProgram/edit.mjs';
import { createProgramObjective, deleteProgramObjective, getProgramObjectives, updateProgramObjective, updateProgramObjectives } from './editProgram/sectionC.mjs';
import { createProgramLearningOutcome, deleteProgramLearningOutcome, getProgramLearningOutcomes, updateMultipleProgramLearningOutcomes, updateProgramLearningOutcome } from './editProgram/sectionD.mjs';
import { getResponsibility, updateResponsibleLecturer } from './LecturerManage/Responsibility.mjs';
import { createGraduationCondition, deleteGraduationCondition, getGraduation, updateGraduationCondition } from './dictionary/graduation.mjs';
import { createCertificationCondition, deleteCertificationCondition, getCertification, updateCertificationCondition } from './dictionary/certifiction.mjs';

// Để xử lý __dirname trong ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '../db.json'));
const middlewares = jsonServer.defaults();
const dbFilePath = path.join(__dirname, '../db.json');
const dbContent = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
    setTimeout(next, 1000); // 1000 ms = 1 second
    next();
});


// RESPONSIBILITY
server.get('/responsibility', getResponsibility);
server.post('/update-responsible-lecturer', updateResponsibleLecturer);


// EDITOR HEADER
// Route GET để lấy thông tin editor header theo id
server.get('/editor-header/:id', getEditorHeader);


// SECTION A
// Routes for Section A
// Route GET để lấy thông tin specialization theo id
server.get('/specialization/:id', getSpecialize);
// Route GET để lấy thông tin sectionA theo id
server.get('/sectionA/:id', getSectionA);
// Route POST cập nhật thông tin sectionA
server.post('/sectionA-info', postSectionA);
// Route POST tạo chuyên ngành
server.post('/specialization/create', postCreateSpecialize);
// Route DELETE xóa chuyên ngành
server.delete('/specialization/delete', deleteSpecialize);
// Route POST cập nhật thông tin chuyên ngành
server.post('/specialization/update', updateSpecialize);



// SECTION B
// Routes for Section B
// Route GET để lấy thông tin sectionB theo id
server.get('/sectionB/:id', getSectionB);
// Route POST để cập nhật thông tin sectionB
server.post('/sectionB-info', postSectionB);
    


// SECTION C
server.get('/sectionC/:id', getProgramObjectives);
server.post('/program-objective/update', updateProgramObjective);
server.post('/program-objective/create', createProgramObjective);
server.delete('/program-objective/delete', deleteProgramObjective);
server.post('/update-program-objectives', updateProgramObjectives);



// SECTION D
server.get('/sectionD/:programId', getProgramLearningOutcomes);
server.post('/program-outcome/update', updateProgramLearningOutcome);
server.post('/program-outcome/create', createProgramLearningOutcome);
server.delete('/program-outcome/delete', deleteProgramLearningOutcome);
server.post('/update-program-outcome', updateMultipleProgramLearningOutcomes);


// DICTIONARY
server.post('/graduation/update', updateGraduationCondition);
server.get('/graduation', getGraduation);
server.post('/create-graduation', createGraduationCondition);
server.delete('/delete-graduation', deleteGraduationCondition);

server.post('/certification/update', updateCertificationCondition);
server.get('/certification', getCertification);
server.post('/create-certification', createCertificationCondition);
server.delete('/delete-certification', deleteCertificationCondition);


server.use(router);
server.listen(3002, () => {
    console.log('JSON Server is running on port 3002');
});