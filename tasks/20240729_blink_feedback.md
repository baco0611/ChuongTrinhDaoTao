## Feedback 20240729

**NOTICE:** Nhớ cập nhật workflow + status task đang làm nha!!!

### Token
- Token t có nói là thêm hạn vô cho hắn unique thì t mới check thấy hắn có iat (issues at time - thời gian tạo) với exp (expiration - thời hạn) nên hắn unique rồi, nhưng t cần hắn dạng datetime nên convert lại dùm t hấy.

### Database
#### Bảng Chương trình đào tạo (training program)
- Mình là chương trình đào tạo GIÁO DỤC nên dùng ```Education``` Program hí.
- Cơ sở ngành từ ```basic_field_module``` thành ```foundation_module```
- Không cần cái số thứ tự nữa mô (sequence)
- Điều kiện tốt nghiệp sửa ```required``` thành ```conditions```
- Khoa quản lý thành ```managing_department```

#### Bảng mục tiêu cụ thể 
- Chỉ cần đổi tên bảng thành ```program_objective```

#### Bảng chuẩn đầu ra
- Đổi tên bảng thành ```program_learning_outcomes```
- Đổi các trường có chứa ```output_standard``` sang ```learning_outcome```

#### Bảng ma trận chuẩn đầu ra, mục tiêu cụ thể
- Đổi các trường có chứa ```output_standard``` sang ```learning_outcome```
- Đổi tên bảng thành ```plo_po_matrix``` ngắn lại mà cũng đúng nghĩa.

#### Bảng ma trận chứng chỉ chuẩn đầu ra
- Đổi các trường có chứa ```output_standard``` sang ```learning_outcome```
- Trình độ năng lực thống nhất dùng ```competency_level``` (không dùng ```proficiency_level```)

#### Bảng chuyên ngành đào tạo
- Thống nhất dùng ```major``` hay ```specialization```, nhưng khuyến khích specialization nha. Thống nhất bảng ni với bảng chương trình đào tạo.

#### Bảng chi tiết chương trình đào tạo
- Khối kiến thức và chi tiết khối kiến tức đổi ```block``` sang ```module``` cho thống nhất với bảng chương trình đào tạo.
- Tiên quyết thành ```prerequisite-course``` cho đồng nhất.

#### Bảng department

- Dữ liệu ni t lấy ở trang teacher nên chắc hắn đúng nơi á (nhưng vẫn phải xin thầy lại sau)

```json
"data": [
    { "departmentId": "100000", "departmentName": "PHÂN HIỆU ĐẠI HỌC HUẾ TẠI QUẢNG TRỊ" },
    { "departmentId": "110000", "departmentName": "KHOA GIÁO DỤC THỂ CHẤT" },
    { "departmentId": "120000", "departmentName": "KHOA DU LỊCH" },
    { "departmentId": "130000", "departmentName": "TRƯỜNG ĐẠI HỌC LUẬT" },
    { "departmentId": "140000", "departmentName": "VIỆN TÀI NGUYÊN MÔI TRƯỜNG VÀ CÔNG NGHỆ SINH HỌC" },
    { "departmentId": "150000", "departmentName": "TRUNG TÂM ĐÀO TẠO TỪ XA" },
    { "departmentId": "160000", "departmentName": "TRUNG TÂM HỌC LIỆU" },
    { "departmentId": "170000", "departmentName": "TRUNG TÂM GIÁO DỤC QUỐC PHÒNG" },
    { "departmentId": "180000", "departmentName": "TRUNG TÂM PHỤC VỤ SINH VIÊN" },
    { "departmentId": "190000", "departmentName": "TRUNG TÂM ĐÀO TẠO QUỐC TẾ" },
    { "departmentId": "200000", "departmentName": "CƠ QUAN ĐẠI HỌC HUẾ" },
    { "departmentId": "300000", "departmentName": "TRƯỜNG ĐẠI HỌC KHOA HỌC" },
    { "departmentId": "300100", "departmentName": "Ban Giám hiệu" },
    { "departmentId": "DHT26", "departmentName": "Tổ Quảng bá tuyển sinh" },
    { "departmentId": "300200", "departmentName": "Phòng Tổ chức - Hành chính" },
    { "departmentId": "300300", "departmentName": "Phòng Đào tạo Đại học" },
    { "departmentId": "300301", "departmentName": "Phòng Công tác học sinh - sinh viên" },
    { "departmentId": "300302", "departmentName": "Phòng Đào tạo đại học và Công tác sinh viên" },
    { "departmentId": "300400", "departmentName": "Phòng Đào tạo Sau đại học" },
    { "departmentId": "300500", "departmentName": "Phòng Kế hoạch tài chính - Cơ sở vật chất" },
    { "departmentId": "300600", "departmentName": "Phòng Khảo thí - Đảm bảo chất lượng Giáo dục" },
    { "departmentId": "300700", "departmentName": "Phòng Khoa học công nghệ - Hợp tác quốc tế" },
    { "departmentId": "300800", "departmentName": "Khoa Báo chí - Truyền thông" },
    { "departmentId": "300900", "departmentName": "Khoa Địa lý - Địa chất" },
    { "departmentId": "301000", "departmentName": "Khoa Công nghệ thông tin" },
    { "departmentId": "301100", "departmentName": "Khoa Hóa học" },
    { "departmentId": "301200", "departmentName": "Khoa Kiến trúc" },
    { "departmentId": "301300", "departmentName": "Khoa Lịch sử" },
    { "departmentId": "301400", "departmentName": "Khoa Lý luận chính trị" },
    { "departmentId": "301500", "departmentName": "Khoa Môi trường" },
    { "departmentId": "301600", "departmentName": "Khoa Ngữ văn" },
    { "departmentId": "301700", "departmentName": "Khoa Sinh học" },
    { "departmentId": "301800", "departmentName": "Khoa Toán học" },
    { "departmentId": "301900", "departmentName": "Khoa Vật lý" },
    { "departmentId": "301903", "departmentName": "Khoa Điện tử - Viễn thông" },
    { "departmentId": "301904", "departmentName": "Khoa Công tác xã hội" },
    { "departmentId": "301905", "departmentName": "Khoa Điện, Điện tử và Công nghệ vật liệu" },
    { "departmentId": "301906", "departmentName": "Khoa Xã hội học và Công tác xã hội" },
    { "departmentId": "301907", "departmentName": "Trường THPT Chuyên Khoa học Huế" },
    { "departmentId": "302000", "departmentName": "Khoa Xã hội học" },
    { "departmentId": "302100", "departmentName": "Trung tâm Khoa học xã hội và Nhân văn" },
    { "departmentId": "302200", "departmentName": "Trung tâm Nghiên cứu quản lý & Phát triển vùng duyên hải" },
    { "departmentId": "302300", "departmentName": "Trung tâm Thông tin - Thư viện" },
    { "departmentId": "302400", "departmentName": "Trung tâm Phân tích" },
    { "departmentId": "302500", "departmentName": "Trung tâm Tin học" },
    { "departmentId": "302600", "departmentName": "Trung tâm tư vấn Kiến trúc và Ứng dụng địa chất" },
    { "departmentId": "309900", "departmentName": "Thỉnh giảng" },
    { "departmentId": "309901", "departmentName": "Thỉnh giảng (cơ sở liên kết)" },
    { "departmentId": "400000", "departmentName": "TRƯỜNG ĐẠI HỌC SƯ PHẠM" },
    { "departmentId": "500000", "departmentName": "TRƯỜNG ĐẠI HỌC Y DƯỢC" },
    { "departmentId": "600000", "departmentName": "TRƯỜNG ĐẠI HỌC NÔNG LÂM" },
    { "departmentId": "700000", "departmentName": "TRƯỜNG ĐẠI HỌC NGHỆ THUẬT" },
    { "departmentId": "800000", "departmentName": "TRƯỜNG ĐẠI HỌC KINH TẾ" },
    { "departmentId": "900000", "departmentName": "TRƯỜNG ĐẠI HỌC NGOẠI NGỮ" }
]
```

