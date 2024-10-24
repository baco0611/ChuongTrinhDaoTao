import { getData, postData } from "../../../utils/function"
import Swal from 'sweetalert2'

// Hàm để đảm bảo mỗi specialization luôn tồn tại trong SPECIALIZE và REPLACE_THESIS
const initializeSpecializations = (result, specializations) => {
    specializations.forEach(specialization => {
        result.PROFESSIONAL.SPECIALIZE.data[specialization.specializationId] = {
            specializationName: specialization.specializationName,
            data: []
        };

        result.PROFESSIONAL.REPLACE_THESIS.data[specialization.specializationId] = {
            specializationName: specialization.specializationName,
            data: []
        };
    });
};

// Hàm phân loại phần tử theo nhóm GENERAL và PROFESSIONAL
const categorizeData = (data, result) => {
    data.forEach(item => {
        if (item.knowledgeModule === "PROFESSIONAL") {
            const detailedModule = item.detailedKnowledgeModule;

            if (detailedModule === "SPECIALIZE") {
                result.PROFESSIONAL.SPECIALIZE.data[item.specializationId].data.push(item);
            } else if (detailedModule === "THESIS_PROJECT" && item.replacesThesis) {
                result.PROFESSIONAL.REPLACE_THESIS.data[item.specializationId].data.push(item);
            } else if (detailedModule === "THESIS_PROJECT") {
                result.PROFESSIONAL.THESIS_PROJECT.data.push(item);
            } else if (result.PROFESSIONAL[detailedModule]) {
                result.PROFESSIONAL[detailedModule].data.push(item);
            }
        } else if (item.knowledgeModule === "GENERAL") {
            result.GENERAL.data.push(item);
        }
    });
};

// Hàm sắp xếp phần tử theo nhóm PROFESSIONAL (bao gồm SPECIALIZE và REPLACE_THESIS)
const sortProfessionalGroups = (result) => {
    Object.keys(result.PROFESSIONAL).forEach(group => {
        if (group === 'SPECIALIZE' || group === 'REPLACE_THESIS') {
            Object.keys(result.PROFESSIONAL[group].data).forEach(specializationId => {
                result.PROFESSIONAL[group].data[specializationId].data.sort((a, b) => a.index - b.index);

                result.PROFESSIONAL[group].data[specializationId].data.forEach((item, idx) => {
                    item.index = idx + 1;
                });
            });
        } else {
            result.PROFESSIONAL[group].data.sort((a, b) => a.index - b.index);

            result.PROFESSIONAL[group].data.forEach((item, idx) => {
                item.index = idx + 1;
            });
        }
    });
};

// Hàm sắp xếp nhóm GENERAL và gán lại thứ tự
const sortGeneralGroup = (result) => {
    result.GENERAL.data.sort((a, b) => a.index - b.index);

    result.GENERAL.data.forEach((item, idx) => {
        item.index = idx + 1;
    });
};

// Hàm lọc các phần tử ra thành mảng finalArray
const filterFinalArray = (result) => {
    let finalArray = [];

    // Lọc phần tử trong nhóm PROFESSIONAL
    Object.keys(result.PROFESSIONAL).forEach(group => {
        if (group === 'SPECIALIZE' || group === 'REPLACE_THESIS') {
            Object.keys(result.PROFESSIONAL[group].data).forEach(specializationId => {
                finalArray = finalArray.concat(result.PROFESSIONAL[group].data[specializationId].data);
            });
        } else {
            finalArray = finalArray.concat(result.PROFESSIONAL[group].data);
        }
    });

    // Lọc phần tử trong nhóm GENERAL
    finalArray = finalArray.concat(result.GENERAL.data);

    return finalArray;
};

// Hàm để gửi payload lên API
const updateIndicesAPI = (api, token, finalArray) => {
    const payload = {
        data: finalArray
    };

    return postData(api, "/api/programs/updateIndices", token, payload);
};

// Hàm chính splitCourse
const splitCourse = (data, specializations, api, token) => {
    const result = {
        GENERAL: {
            data: [],
            type: "GENERAL"
        },
        PROFESSIONAL: {
            BASIC: {
                data: [],
                type: "BASIC"
            },
            MAJOR: {
                data: [],
                type: "MAJOR"
            },
            INTERN: {
                data: [],
                type: "INTERN"
            },
            SUPPLEMENTARY: {
                data: [],
                type: "SUPPLEMENTARY"
            },
            THESIS_PROJECT: {
                data: [],
                type: "THESIS_PROJECT"
            },
            REPLACE_THESIS: {
                data: {},
                type: "REPLACE_THESIS"
            },
            SPECIALIZE: {
                data: {},
                type: "SPECIALIZE"
            }
        }
    };

    // Đảm bảo mỗi specialization tồn tại
    initializeSpecializations(result, specializations);

    // Phân loại dữ liệu
    categorizeData(data, result);

    // Sắp xếp và gán lại index trong nhóm PROFESSIONAL
    sortProfessionalGroups(result);

    // Sắp xếp và gán lại index trong nhóm GENERAL
    sortGeneralGroup(result);

    // Lọc các phần tử vào mảng finalArray
    const finalArray = filterFinalArray(result);

    // Gửi dữ liệu cập nhật lên API
    // updateIndicesAPI(api, token, finalArray);

    return result;
};


export const getDataSectionG = async ({id, api, token, setSectionGValue, setSpecialization }) => {
    const result = await getData(api, `/api/programs/${id}/details`, token)
    const specialization = await getData(api, `/api/specialization/${id}`, token)
    const sectionAValue = await getData(api, `/api/education-programs/sectionA/${id}`, token)

    sessionStorage.setItem(`duration-${id}`, sectionAValue.data.data.duration)
    setSpecialization(specialization.data.data)
    setSectionGValue(splitCourse(result.data.data, specialization.data.data, api, token))
}

const searchCourse = async ({api, token, data, setIsSearch, setSearchValue, typingTimeOutRef }) => {
    if(typingTimeOutRef.current)
        clearTimeout(typingTimeOutRef.current)

    typingTimeOutRef.current = setTimeout(async () => {
        const searchData = await postData(api, "/api/courses/search", token, data)

        setSearchValue(searchData.data)
    }, 500)
}

export const handleChangeDataBox = async ({e, setState, id, data, api, token, setIsSearch, setSearchValue, typingTimeOutRef}) => {
    const {name, value, type, checked, readOnly} = e.target
    
    console.log(data)
    if(readOnly)
        return

    if(type == 'text') {
        if(name != "semester") {
            const result = {
                ...data,
            }

            if(name == "courseName"){
                result.courseName = value,
                result.courseCode = ""
            } else {
                result.courseName = "",
                result.courseCode = value
            }
            
            setState(result)

            searchCourse({
                api,
                token,
                setIsSearch,
                setSearchValue,
                typingTimeOutRef,
                data: result,
            })
        }
        else {
            let result = Number.parseInt(value)
            const duration = Number.parseInt(sessionStorage.getItem(`duration-${id}`))
    
            if(result>=1 && result <= duration)
                result = result
            else
                result = ''
    
            setState(prev => ({
                ...prev,
                [name]: result
            }))
        }

    }
    if(type == "checkbox") {
        setState(prev => ({
            ...prev,
            [name]: checked
        }));
    }
}

export const saveCourse = async ({id, api, token, setState, data, setIsHide, setIsDataSaved}) => {
    if(data.courseOutlineId == null || data.semester == "")
        Swal.fire({
            title: 'Chưa điền thông tin',
            text: 'Vui lòng chọn học phần và học kỳ tương ứng!',
            icon: "error",
            confirmButtonColor: "#BE0000"
        });
    else {
        setIsDataSaved(false)
        const result = await postData(api, "/api/programs/create", token, data)
        
        const specialization = JSON.parse(sessionStorage.getItem(`specialization-${id}`))
        // console.log(specialization)
        setState(splitCourse(result.data.data, specialization))
        setIsDataSaved(true)
        setIsHide(true)
    }
} 