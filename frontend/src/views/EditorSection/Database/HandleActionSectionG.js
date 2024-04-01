import axios from "axios"
import { deleteData, postData } from "./HandleUpdateDatabase"

const getChuyenNganh = async (data, apiURL, id) => {
    const chuyenNganhValueApi = `${apiURL}/ChuyenNganhDaoTao/${id}`
    let chuyenNganh = []
    await axios.get(chuyenNganhValueApi) 
        .then(response => {
            const restData = response.data
            if(restData.data)
                chuyenNganh = restData
        })
        .catch(error => {
            console.log(error)
            window.location='/error'
        })

    let values = {}

    chuyenNganh.data.forEach(CN => {
        const value = data.filter(item => item.idChuyenNganh == CN.idChuyenNganh && item.thayTheKhoaLuan == false)
        values[CN.idChuyenNganh] = {
            idChuyenNganh: CN.idChuyenNganh,
            tenChuyenNganh: CN.tenChuyenNganh,
            type: 'CHUYEN_NGANH',
            data: value
        }
    })

    return values
}

const getTTKL = async (data, apiURL, id) => {
    const chuyenNganhValueApi = `${apiURL}/ChuyenNganhDaoTao/${id}`
    let chuyenNganh = []
    await axios.get(chuyenNganhValueApi) 
        .then(response => {
            const restData = response.data
            if(restData.data)
                chuyenNganh = restData
        })
        .catch(error => {
            console.log(error)
            window.location='/error'
        })

    let values = {}

    chuyenNganh.data.forEach(CN => {
        const value = data.filter(item => item.idChuyenNganh == CN.idChuyenNganh && item.thayTheKhoaLuan == true)
        values[CN.idChuyenNganh] = {
            idChuyenNganh: CN.idChuyenNganh,
            tenChuyenNganh: CN.tenChuyenNganh,
            type: 'THAY_THE_KHOA_LUAN',
            data: value
        }
    })

    return values
}

const handleSplitSectionG = async (data, setState, apiURL, id) => {
    const DAI_CUONG = data.filter(item => item.khoiKienThuc == 'DAI_CUONG')
    
    setState(prev => {
        const DAI_CUONGValue = prev.DAI_CUONG

        return {
            ...prev,
            DAI_CUONG: {
                ...DAI_CUONGValue,
                data: DAI_CUONG
            }
        }
    })

    const CO_SO_NGANH = data.filter(item => item.chiTietKhoiKienThuc == 'CO_SO_NGANH')
    const NGANH = data.filter(item => item.chiTietKhoiKienThuc == 'NGANH')
    const BO_TRO = data.filter(item => item.chiTietKhoiKienThuc == 'BO_TRO')
    const THUC_TAP = data.filter(item => item.chiTietKhoiKienThuc == 'THUC_TAP')
    const DO_AN_KHOA_LUAN = data.filter(item => item.chiTietKhoiKienThuc == 'DO_AN_KHOA_LUAN' && item.thayTheKhoaLuan == false)
    const THAY_THE_KHOA_LUAN = await getTTKL(data, apiURL, id)
    
    const CHUYEN_NGANH = await getChuyenNganh(data, apiURL, id)

    setState(prev => {
        return {
            ...prev,
                CHUYEN_NGHIEP: {
                    type: 'CHUYEN_NGHIEP',
                CO_SO_NGANH: {
                    data: CO_SO_NGANH,
                    type: 'CO_SO_NGANH',    
                },
                NGANH: {
                    data: NGANH,
                    type: 'NGANH',    
                },
                BO_TRO: {
                    data: BO_TRO,
                    type: 'BO_TRO',    
                },
                THUC_TAP: {
                    data: THUC_TAP,
                    type: 'THUC_TAP',    
                },
                DO_AN_KHOA_LUAN: {
                    data: DO_AN_KHOA_LUAN,
                    type: 'DO_AN_KHOA_LUAN',
                },
                THAY_THE_KHOA_LUAN: {
                    data: THAY_THE_KHOA_LUAN,
                    type: 'THAY_THE_KHOA_LUAN'
                },
                CHUYEN_NGANH: {
                    data: CHUYEN_NGANH,
                    type: 'CHUYEN_NGANH'   
                }
            }
        }
    })
}

const searchHocPhan = async (value, apiURL, api) => {
    const searchValues = await postData(apiURL, api, {keyWord: value}, 'SEARCH')

    return searchValues.data.data
}

const searchHocPhanById = async (value, apiURL, api, id) => {
    const searchValues = await postData(apiURL, api, {idCTDT: id, keyWord: value}, 'SEARCH')

    return searchValues.data.data
}

const createSubject = async (id, apiURL, data, setState) => {
    const getData = async () => {
        return await postData(apiURL, '/create_sectionG', payload, 'CREATE_SUBJECT')
    }

    const createValues = {
        idDeCuongHocPhan: data.idDeCuongHocPhan,
        thayTheKhoaLuan: data.thayTheKhoaLuan,
        batBuoc: data.batBuoc,
        tienQuyet: data.tienQuyet,
        hocTruoc: data.hocTruoc,
        songHanh: data.songHanh,
        hocKy: data.hocKy,
        khoiKienThuc: data.khoiKienThuc,
        chiTietKhoiKienThuc: data.chiTietKhoiKienThuc,
        idChuyenNganh: data.idChuyenNganh ? data.idChuyenNganh : '',
    }

    const payload = {
        idCTDT: id,
        data: [createValues]
    }
    const createResult = await getData()
    console.log(createResult)
    handleSplitSectionG(createResult.data.data, setState, apiURL, id)
}

const updateSubject = async (id, apiURL, data, setState) => {
    const createValues = {
        idDeCuongHocPhan: data.idDeCuongHocPhan,
        thayTheKhoaLuan: data.thayTheKhoaLuan,
        batBuoc: data.batBuoc,
        tienQuyet: data.tienQuyet,
        hocTruoc: data.hocTruoc,
        songHanh: data.songHanh,
        hocKy: data.hocKy,
        khoiKienThuc: data.khoiKienThuc,
        chiTietKhoiKienThuc: data.chiTietKhoiKienThuc,
        idChuyenNganh: data.idChuyenNganh ? data.idChuyenNganh : '',
        id: data.id
    }

    const payload = {
        idCTDT: id,
        data: [createValues]
    }
    const createResult = await postData(apiURL, '/update_sectionG', payload, 'UPDATE_SUBJECT')
    handleSplitSectionG(createResult.data.data, setState, apiURL, id)
}

const deleteSubject = async (id, apiURL, data, setState) => {
    const payload = {
        idCTDT: id,
        deleteData: [data]
    }

    const deleteResult = await deleteData(apiURL, '/delete_sectionG', payload, 'DELETE_SUBJECT')
    console.log(deleteResult)

    handleSplitSectionG(deleteResult.data.data, setState, apiURL, id)

    return deleteResult
}

const handleSplitGHocKy = async (id, setData, thoiGianDaoTao, apiURL) => {
    const valueApi = `${apiURL}/sectionG/${id}`
    let values = []
    await axios.get(valueApi) 
        .then(response => {
            const restData = response.data
            if(restData.data)
                values = restData.data
        })
        .catch(error => {
            console.log(error)
            window.location='/error'
        })
    
    let result = {}

    for(var i = 1; i <=thoiGianDaoTao; i++) {
        const batBuoc = values.filter(item => item.hocKy == i && item.batBuoc == true)
        const tuChon = values.filter(item => item.hocKy == i && item.batBuoc == false)

        result[i] = {
            batBuoc: batBuoc.reduce((prev, cur) => {
                return prev + cur.soTinChi
            }, 0),
            tuChon: tuChon.reduce((prev, cur) => {
                return prev + cur.soTinChi
            }, 0)
        }
    }

    setData(result)
}

export { 
    handleSplitSectionG, 
    searchHocPhan, 
    createSubject, 
    updateSubject,
    deleteSubject,
    searchHocPhanById,
    handleSplitGHocKy
}