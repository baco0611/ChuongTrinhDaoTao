import { getData } from "../../../utils/function"

export const getDataSectionH = async ({ id, api, token, setSectionHValue }) => {
    const result = await getData(api, `/plo-course/${id}`, token)

    if(result.status == 200)
        setSectionHValue(result.data.data)
}