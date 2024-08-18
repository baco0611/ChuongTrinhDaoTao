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
    console.log(apiURL)

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    }

    const result = 
        await axios.get(apiURL, config)
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
    console.log(apiURL, payload)

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

function transformChar(charMap, str) {
    return str.split('').map(char => charMap[char] || char).join('');
}

function basic_encode(code) {
    const charMap = {
        'A': 'Q', 'B': 'W', 'C': 'E', 'D': 'R', 'E': 'T', 'F': 'Y', 'G': 'U', 'H': 'I', 'I': 'O', 'J': 'P',
        'K': 'A', 'L': 'S', 'M': 'D', 'N': 'F', 'O': 'G', 'P': 'H', 'Q': 'J', 'R': 'K', 'S': 'L', 'T': 'Z',
        'U': 'X', 'V': 'C', 'W': 'V', 'X': 'B', 'Y': 'N', 'Z': 'M',
        '1': '9', '2': '8', '3': '7', '4': '6', '5': '5', '6': '4', '7': '3', '8': '2', '9': '1', '0': '0'
    };

    // Thay thế các ký tự
    let transformed = transformChar(charMap, code.toUpperCase());

    // Đảo ngược chuỗi
    return transformed.split('').reverse().join('');
}

function basic_decode(encodedCode) {
    const reverseCharMap = {
        'Q': 'A', 'W': 'B', 'E': 'C', 'R': 'D', 'T': 'E', 'Y': 'F', 'U': 'G', 'I': 'H', 'O': 'I', 'P': 'J',
        'A': 'K', 'S': 'L', 'D': 'M', 'F': 'N', 'G': 'O', 'H': 'P', 'J': 'Q', 'K': 'R', 'L': 'S', 'Z': 'T',
        'X': 'U', 'C': 'V', 'V': 'W', 'B': 'X', 'N': 'Y', 'M': 'Z',
        '9': '1', '8': '2', '7': '3', '6': '4', '5': '5', '4': '6', '3': '7', '2': '8', '1': '9', '0': '0'
    };

    // Đảo ngược chuỗi
    let reversed = encodedCode.split('').reverse().join('');

    // Thay thế các ký tự trở lại
    return transformChar(reverseCharMap, reversed);
}


export {
    getParentElementByClass,
    getParentElementById,
    getData,
    postData,
    deleteData,
    basic_decode,
    basic_encode
}