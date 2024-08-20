import jsonServer from 'json-server';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { getSectionA, getSpecialize, postCreateSpecialize, postSectionA } from './editProgram/sectionA.mjs';
import { getSectionB, postSectionB } from './editProgram/sectionB.mjs';

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


// SECTION A
// Routes for Section A
// Route GET để lấy thông tin specialization theo id
server.get('/specialization/:id', getSpecialize);
// Route GET để lấy thông tin sectionA theo id
server.get('/sectionA/:id', getSectionA);
// Route POST cập nhật thông tin sectionA
server.post('/sectionA-info', postSectionA);
// Route POST cập nhật thông tin sectionA
server.post('/specialization/create', postCreateSpecialize);



// SECTION B

// Routes for Section B
// Route GET để lấy thông tin sectionB theo id
server.get('/sectionB/:id', getSectionB);
// Route POST để cập nhật thông tin sectionB
server.post('/sectionB-info', postSectionB);
    
server.use(router);
server.listen(3002, () => {
    console.log('JSON Server is running on port 3002');
});
