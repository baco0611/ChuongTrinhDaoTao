import React, { useContext, useEffect, useState } from 'react'
import Papa from 'papaparse';
import { UserContext } from '../../context/ContextProvider';
import { postData } from '../../utils/function';

export default function InsertUser() {
    const departmentList = {
        "100000": 1,
        "110000": 2,
        "120000": 3,
        "130000": 4,
        "140000": 5,
        "150000": 6,
        "160000": 7,
        "170000": 8,
        "180000": 9,
        "190000": 10,
        "200000": 11,
        "300000": 12,
        "300100": 13,
        "DHT26": 14,
        "300200": 15,
        "300300": 16,
        "300301": 17,
        "300302": 18,
        "300400": 19,
        "300500": 20,
        "300600": 21,
        "300700": 22,
        "300800": 23,
        "300900": 24,
        "301000": 25,
        "301100": 26,
        "301200": 27,
        "301300": 28,
        "301400": 29,
        "301500": 30,
        "301600": 31,
        "301700": 32,
        "301800": 33,
        "301900": 34,
        "301903": 35,
        "301904": 36,
        "301905": 37,
        "301906": 38,
        "301907": 39,
        "302000": 40,
        "302100": 41,
        "302200": 42,
        "302300": 43,
        "302400": 44,
        "302500": 45,
        "302600": 46,
        "309900": 47,
        "309901": 48,
        "400000": 49,
        "500000": 50,
        "600000": 51,
        "700000": 52,
        "800000": 53,
        "900000": 54
    };
    
    const [isDone, setIsDone] = useState(false);
    const { apiURL, token } = useContext(UserContext)

    // Hàm để xử lý mỗi hàng
    const processRow = (row) => {
        // console.log(row)
        return {
            lecturersCode: row[0],   // Lấy cột 1
            lastname: row[1],   // Lấy cột 2
            firstname: row[2],   // Lấy cột 3
            email: row[10], // Lấy cột 11
            departmentId: departmentList[row[19]],  // Lấy cột 20
            password: "@KhoaHoc123",
            roles: []
        };
    };

    const createUser = async(data) => {
        await postData(apiURL, "/auth/public/register", token, data)
    }

    useEffect(() => {
        // Đọc file CSV từ thư mục public
        Papa.parse('/GiangVien.csv', {
            download: true,
            header: false,  // Nếu CSV có header, đặt thành true
            complete: function(results) {
                // Duyệt qua các hàng
                const data = results.data;

                // Lấy hai hàng đầu tiên và xử lý qua hàm processRow
                // const selectedColumns = data.slice(0,2).map(processRow);
                const selectedColumns = data.map(processRow);

                // Hiển thị kết quả trong console
                console.log(selectedColumns);

                selectedColumns.forEach(element => createUser(element))

                setIsDone(true)
            }
        });
    }, []);



    return (
        <div>Import giảng viên ...</div>
    )
}
