import { getData } from "../../../utils/function"

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

    return result
}

export const getDataSectionG = async ({id, api, token, setSectionGValue, setSpecialization }) => {
    const result = await getData(api, `/course/${id}`, token)
    // const specialization = await getData(api, `/api/specialization/${id}`, token)
    const specialization = await getData("http://localhost:8081", `/api/specialization/${id}`, token)

    setSpecialization(specialization.data.data)
    setSectionGValue(splitCourse(result.data.data, specialization.data.data))
}