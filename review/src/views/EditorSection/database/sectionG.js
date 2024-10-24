import { getData, postData } from "../../../utils/function"
import Swal from 'sweetalert2'

const splitCourse = (data, specializations) => {
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
        
    // Đảm bảo mỗi specialization luôn tồn tại trong SPECIALIZE
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
    
    // Phân loại các phần tử dựa trên detailedKnowledgeModule và specialization
    data.forEach(item => {
        if (item.knowledgeModule === "PROFESSIONAL") {
            const detailedModule = item.detailedKnowledgeModule;
        
            if (detailedModule === "SPECIALIZE") {
                // Thêm vào SPECIALIZE với specializationId
                result.PROFESSIONAL.SPECIALIZE.data[item.specializationId].data.push(item);
            } else if (detailedModule === "THESIS_PROJECT" && item.replacesThesis) {
                // Thêm vào REPLACE_THESIS với specializationId
                result.PROFESSIONAL.REPLACE_THESIS.data[item.specializationId].data.push(item);
            } else if (detailedModule === "THESIS_PROJECT") {
                // Nếu là THESIS_PROJECT nhưng không cần replacesThesis, chỉ đẩy vào THESIS_PROJECT
                result.PROFESSIONAL.THESIS_PROJECT.data.push(item);
            } else if (result.PROFESSIONAL[detailedModule]) {
                // Đẩy phần tử vào các nhóm PROFESSIONAL khác như BASIC, MAJOR, ...
                result.PROFESSIONAL[detailedModule].data.push(item);
            }
        } else if (item.knowledgeModule === "GENERAL") {
        // Nếu knowledgeModule là GENERAL
        result.GENERAL.data.push(item);
        }
    });

    // Sắp xếp các phần tử theo thuộc tính index trong từng nhóm
    Object.keys(result.PROFESSIONAL).forEach(group => {
        if (group === 'SPECIALIZE' || group === 'REPLACE_THESIS') {
            // Sắp xếp các nhóm SPECIALIZE và REPLACE_THESIS theo specializationId
            Object.keys(result.PROFESSIONAL[group].data).forEach(specializationId => {
                result.PROFESSIONAL[group].data[specializationId].data.sort((a, b) => a.index - b.index);
            });
        } else {
            // Sắp xếp các nhóm khác như BASIC, MAJOR, ... theo index
            result.PROFESSIONAL[group].data.sort((a, b) => a.index - b.index);
        }
    });

    // Sắp xếp nhóm GENERAL theo index
    result.GENERAL.data.sort((a, b) => a.index - b.index);

    return result
}

export const getDataSectionG = async ({id, api, token, setSectionGValue, setSpecialization }) => {
    const result = await getData(api, `/api/programs/${id}/details`, token)
    const specialization = await getData(api, `/api/specialization/${id}`, token)
    const sectionAValue = await getData(api, `/api/education-programs/sectionA/${id}`, token)

    sessionStorage.setItem(`duration-${id}`, sectionAValue.data.data.duration)
    setSpecialization(specialization.data.data)
    setSectionGValue(splitCourse(result.data.data, specialization.data.data))
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