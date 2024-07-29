# Phân tích menu

Hiện tại t đang chia thành 4 nhóm chức năng: từ điển, học phần, chương trình đào tạo và quản trị. Nhưng khi t coi cái của thầy (web quản lý đề cương) t thấy hắn bị phức tạp quá và t chia lại ri m thấy ổn không này.

## Phần 1: Từ điển dữ liệu

Đây là phần từ điển lưu sẵn thông tin, để khi dùng thì kéo vô thôi (cái ni nếu chưa hiểu thì break sau). Gồm

- Từ điển điều kiện tốt nghiệp: chỉ toàn text (cũng cần 1 bảng nhưng ko liên quan tới các bảng tê nên khỏi lo)
- Từ điển chứng chỉ tốt nghiệp: có 1 bảng rồi (certificate) 

## Phần 2: Quản lý chương trình đào tạo

Mặ tới đây rối nè, nhưng t description 3 chức năng như sau:

- **Tra cứu chương trình đào tạo:** liệt kê toàn bộ chương trình đào tạo đang có trong database theo các điều kiện (keyWord, department, status, ...).
- **Quản lý chương trình đào tạo:** liệt kê dựa trên 3 đối tượng chính.
    - Ông admin (như thầy Lương): có quyền xem hết và các quyền sửa xóa bla bla
    - Ông quản lý (của ngành): chỉ có quyền xem các ctđt của khoa mình quản lý
    - Ông user (người bth): chỉ có quyền xem các ctđt được phân công
- **Quản lý ngành đào tạo:** Mỗi ngành có nhiều ctđt nhưng chỉ liệt kê các chương trình đào tạo đã được duyệt (đối với các ngành có 1 chương trình trở lên) và liệt kê trống với ngành ko có chương trình đã duyệt.

Ví dụ cái cuối hấy, có 3 ngành là A B C đi. A có 2 chương trình đã đc duyệt, B có 1, mà C thì ko có. Rứa thì sẽ liệt kê kiểu:

|  A  | Thông tin | Thông tin |
|-----|-----------|-----------|
|  A  | Thông tin | Thông tin |
|  B  | Thông tin | Thông tin |
|  C  | ---       | ---       |

## Phần 3: Quản lý học phần

Ni tương tự phần 2 nhưng thành:
- Tra cứu đề cương
- Quản lý đề cương
- Quản lý học phần (mỗi học phần có nhiều đề cương)


## Phần 4: Quản trị

Gồm 2 phần: Giảng viên phụ trách (để phân ai quản lý khoa mô, mỗi khoa chỉ 1 người) và Phân quyền (để phân quyền cho từng người).


## NOTE

T chưa tính tới việc tạo mới 1 học phần (kiểu đẻ ra thêm 1 môn học, ví dụ như "Tâm lý tội phạm" kiểu kiểu rk) với tạo ra 1 ngành mới (kiểu thêm ngành "Quản trị kinh doanh" chẳn hạn). Nên m xem ổn chưa mà break tiếp hí.