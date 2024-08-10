import jsonServer from 'json-server';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Để xử lý __dirname trong ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = jsonServer.create();
const router = jsonServer.router(path.join(__dirname, '../db.json'));
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use((req, res, next) => {
    setTimeout(next, 1000); // 1000 ms = 1 second
    next();
});

// Middleware to handle POST requests to /login
server.post('/login', (req, res) => {
    // Đọc nội dung từ file db.json
    const dbFilePath = path.join(__dirname, '../db.json');
    const dbContent = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

    // Lấy thông tin user từ db.json
    const loginData = dbContent.login;
    const userData = dbContent.user;
    const userNotFoundData = {
        data: {
            lecturerCode: "Người dùng không tồn tại",
            password: "Người dùng không tồn tại"
        },
        status: 401
    };
    const incorrectPasswordData = {
        data: {
            lecturerCode: "",
            password: "Mật khẩu không đúng"
        },
        status: 401
    };

    console.log(req.body.lecturerCode, loginData.lecturerCode)
    console.log(req.body.password === loginData.password, req.body.lecturerCode === loginData.lecturerCode)

    // Kiểm tra thông tin đăng nhập
    if (req.body.lecturerCode === loginData.lecturerCode) {
        if (req.body.password === loginData.password) {
            res.jsonp(userData);
        } else {
            res.status(401).jsonp(incorrectPasswordData);
        }
    } else {
        res.status(401).jsonp(userNotFoundData);
    }
});

server.post("/search-program", (req, res) => {
    const dbFilePath = path.join(__dirname, '../db.json');
    const dbContent = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

    const data = dbContent.searchProgram

    res.jsonp(data)
})

server.post("/manage-program", (req, res) => {
    const dbFilePath = path.join(__dirname, '../db.json');
    const dbContent = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

    const data = dbContent.searchProgram

    res.jsonp(data)
})

server.post("/lecturer-search", (req, res) => {
    const dbFilePath = path.join(__dirname, '../db.json');
    const dbContent = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

    const data = dbContent.searchLecturer

    res.jsonp(data)
})

server.post('/sectionA-info', (req, res) => {
    const newData = req.body;

    if (!newData || !newData.id) {
        return res.status(400).json({ error: 'Invalid data. The "id" field is required.' });
    }

    const dbFilePath = path.join(__dirname, '../db.json');
    const dbContent = JSON.parse(fs.readFileSync(dbFilePath, 'utf-8'));

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
});
    
server.use(router);
server.listen(3002, () => {
    console.log('JSON Server is running on port 3002');
});

// server.use(router);
// server.listen(3002, () => {
//     console.log('JSON Server is running');
// });
