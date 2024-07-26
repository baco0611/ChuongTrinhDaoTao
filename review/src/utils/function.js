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

export {
    getParentElementByClass,
    getParentElementById,
}