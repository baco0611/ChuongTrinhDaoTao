# Web Project for Managing Training Programs at Hue University of Sciences

This is a project by students Huynh Van Nguyen Bao and Nguyen Thi Van Anh, who are students of the K45 class of the Information Technology Department, Hue University of Science. This project is a product entered into the Student Scientific Research and Technology Competition guided by Dr. Tran Thanh Luong.

The project structure consists of two parts: a front end using React and a back end implemented with Java, which are connected to each other through RestAPIs.
The file structure includes two main folders named frontend and backend, organized as follows:

```bash
QLCTDT
|_ backend
|   |_ ChuongTrinhDaoTao_version2
|       |_ ...
|       |_ database (insert, function, procedure)
|       |_ src
|           |_ main
|               |_ java
|                   |_ com
|                       |_ laptrinhjavaweb (Modify the code here)
|                           |_ api (create api)
|                           |_ config (config jpa and connect database)
|                           |_ converter (convert dto to entity and entity to dto)
|                           |_ dto
|                           |_ entity (create table)
|                           |_ repository 
|                           |_ service
|
|_ frontend
    |_ ...
    |_ src (Modify the code here)
        |_ assets (images, CSS files of fonts)
        |_ components (general layout of each section/session)
        |_ context (contains contexts and API definitions for each part)
        |_ view (components displayed on the UI)
```

You can download the project using the following command:
```bash
git clone https://github.com/baco0611/ChuongTrinhDaoTao.git
```

## Front-end
To run the frontend code, ensure that Node.js is installed on your computer. If not, you can download it from <a target="_blank" href="https://nodejs.org/en">Node.js</a>.

After installing and ensuring Node.js is installed on your computer, follow these steps:

- Step 1: Navigate to the frontend directory in your bash:
```bash
cd frontend
```

- Step 2: Install necessary libraries and packages:
```bash
npm install
```

- Step 3: Check if the React library is functioning properly:
```bash
npm run dev
```

## Back-end

