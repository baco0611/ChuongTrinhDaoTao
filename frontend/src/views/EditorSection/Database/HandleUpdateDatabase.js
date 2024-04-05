import axios from "axios"
import swal from 'sweetalert'
import { handleUpdateSectionC } from "./HandleActionSectionC"
import { handleUpdateSectionA } from "./HandleActionSectionA"
import { handleUpdateSectionB } from "./HandleActionSectionB"
import { handleUpdateSectionD } from "./HandleActionSectionD"
import { handleUpdateSectionE } from "./HandleActionSectionE"
import { handleUpdateSectionH } from "./HandleActionSectionH"

const postData = async (api, url, payload, completeMessage, errorMessage) => {
    const apiURL = api + url
    const result =
    await axios.post(apiURL, payload)
        .then(response => {
            console.log(completeMessage ? completeMessage : '', response)
            return response
        })
        .catch(err => {
            console.log(errorMessage ? errorMessage : '', err)
            return err
        })

    return {
        data: result.data,
        status: result.status
    }
}

const deleteData = async (api, url, payload, completeMessage, errorMessage) => {
    const apiURL = api + url
    const result =
    await axios.delete(apiURL, {
        data: payload
    })
        .then(response => {
            console.log(completeMessage ? completeMessage : '', response)
            return response
        })
        .catch(err => {
            console.log(errorMessage ? errorMessage : '', err)
        })
    return {
        data: result.data,
        status: result.status
    }
}

const deleteStorage = (section, id) => {
    const keys = Object.keys(sessionStorage)
    keys.forEach(key => {
        const arr = key.split('-')

        if(arr[0] != `section${section}` || arr[arr.length - 1] != id) {
            sessionStorage.removeItem(key)
        }
    })
}

const handleSwitchSection = async ({ currentSection, currentId, api, thisE, setData, handleChangeLocation, isDataSaved }) => {
    console.log(isDataSaved)
    if(currentSection!='G' && !isDataSaved) {
        thisE.preventDefault()
    
        swal({
            title: 'Bạn muốn lưu thông tin không?',
            text: ``,
            icon: 'warning',
            buttons: {
                no: {
                    text: "Không",
                    closeModal: true,
                    className: 'swalNot'
                },
                yes: {
                    text: "Có",
                    closeModal: false
                }
            }
        })
        .then(async (name) => {
            if(name == 'yes') {
                
                let isSuccess = await handleUpdateDatabase({ currentSection, currentId, api, setData })
                
                if(isSuccess) {
                    swal.stopLoading();
                    swal.close();
                    handleChangeLocation()
                } else {
                    throw err
                }
            }
            else {
                swal.stopLoading();
                swal.close();
                handleChangeLocation()
            }
        })
        .catch(() => {
            swal.stopLoading();
            swal.close();
            swal({
                title: 'Đã có lỗi',
                text: 'Vui lòng thử lại',
                icon: 'error'
            })
        })
    }
}

const handleSavingData = async ({ currentSection, currentId, api, setData }) => {
    swal({
        title: 'Bạn muốn lưu thông tin?',
        text: ``,
        icon: 'info',
        buttons: {
            no: {
                text: "Không",
                closeModal: true,
                className: 'swalNot'
            },
            yes: {
                text: "Có",
                closeModal: false
            }
        }
    })
    .then(async (name) => {
        if(name == 'yes') {
            
            let isSuccess = await handleUpdateDatabase({ currentSection, currentId, api, setData })
            if(isSuccess) {
                swal.stopLoading();
                swal.close();
            } else {
                throw err
            }
        }
        else {
            swal.stopLoading();
            swal.close();
        }
    })
    .catch(() => {
        swal.stopLoading();
        swal.close();
        swal({
            title: 'Đã có lỗi',
            text: 'Vui lòng thử lại',
            icon: 'error'
        })
    })
}

const handleUpdateDatabase = async ({ currentSection, currentId, api, setData }) => {
    switch(currentSection) {
        case 'A':
            return await handleUpdateSectionA(currentId, api, setData)
        case 'B':
            return await handleUpdateSectionB(currentId, api, setData)
        case 'C':
            return await handleUpdateSectionC(currentId, api, setData)
        case 'D':
            return await handleUpdateSectionD(currentId, api, setData)
        case 'E':
            return await handleUpdateSectionE(currentId, api, setData)
        case 'H':
            return await handleUpdateSectionH(currentId, api, setData)
    }
}

function getParent(element, className) {
    while(element.parentElement) {
        if(element.parentElement.className.split(' ').includes(className))
            return element.parentElement
        
        element = element.parentElement
    }
}

function getHref(element) {
    while(element.parentElement) {
        if(element.parentElement.href)
            return element.parentElement.href
        
        else element = element.parentElement
    }
}

function resetPage(section, id) {
    deleteStorage(section, id)
    window.scrollTo(0, 0)
}

export { 
    handleUpdateDatabase, 
    getParent, 
    postData, 
    deleteData, 
    handleSwitchSection,
    resetPage,
    handleSavingData
}