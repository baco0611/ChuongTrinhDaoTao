import { getData } from "../../../utils/function"

export const getDataSectionH = async ({ id, api, token, setSectionHValue }) => {
    const result = await getData(api, `/api/course-outcome-matrix/getAll/${id}`, token)

    if(result.status == 200)
        setSectionHValue(result.data.data)
}

export const handleChangeValue = ({ e, element, setState }) => {
    let newValue = e.target.value;

    // Kiểm tra giá trị competency: nếu không hợp lệ, đặt thành chuỗi rỗng
    if (newValue !== "" && (!Number.isInteger(Number(newValue)) || newValue < 1 || newValue > 5)) {
        return
    }

    setState(prev => {
        // Tìm phần tử với courseId và ploId tương ứng
        const existingElementIndex = prev.findIndex(
            item => item.courseId === element.courseId && item.ploId === element.ploId
        );

        if (existingElementIndex === -1) {
            // Nếu không tồn tại hoặc tồn tại nhưng id là null, thêm phần tử mới
            return [
                ...prev,
                {
                    courseId: element.courseId,
                    ploId: element.ploId,
                    id: null,
                    competency: newValue
                }
            ];
        } else {
            // Nếu đã tồn tại, chỉ cập nhật competency
            const updatedPrev = [...prev];
            updatedPrev[existingElementIndex].competency = newValue;
            return updatedPrev;
        }
    });
};

export const handleSaveData = ({api, token, setState, data, id}) => {
    const updateElement = [];
    const deleteElement = [];
    const createElement = [];

    data.forEach(item => {
        if (item.id && item.competency !== "") {
            // Phần tử có id và competency
            updateElement.push(item);
        } else if (item.id && item.competency === "") {
            // Phần tử có id nhưng không có competency
            deleteElement.push(item.id);
        } else if (!item.id && item.competency !== "") {
            // Phần tử không có id nhưng có competency
            createElement.push(item);
        }
    });

    const payload = {
        updateElement,
        deleteElement,
        createElement,
        id
    }

    console.log(payload)
}