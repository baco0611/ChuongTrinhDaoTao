import axios from "axios";

const getParentElementByClass = (element, className) => {
    while (element && !element.classList.contains(className)) {
        element = element.parentElement;
    }
    return element;   
}

const getParentElementById = (element, id) => {
    while (element && element.id !== id) {
        element = element.parentElement;
    }
    return element;
}

const getData = async (api, url, token, payload, completeMessage, errorMessage) => {
    const apiURL = api + url
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    const result = 
        await axios.get(apiURL, payload, config)
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

const postData = async (api, url, token, payload, completeMessage, errorMessage) => {
    const apiURL = api + url
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    const result = 
        await axios.post(apiURL, payload, config)
            .then(response => {
                console.log(completeMessage ? completeMessage : '', response)
                return response
            })
            .catch(err => {
                console.log(errorMessage ? errorMessage : '', err)
                return err.response.data
            })

    return {
        data: result.data,
        status: result.status
    }
}

const deleteData = async (api, url, token, payload, completeMessage, errorMessage) => {
    const apiURL = api + url
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    const result = 
        await axios.delete(apiURL, payload, config)
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


export {
    getParentElementByClass,
    getParentElementById,
    getData,
    postData,
    deleteData,
}