const handleChangeValue = ({ e, name, max, setSectionAValue, setIsDataSaved}) => {
    function isInteger(str) {
        return Number.isInteger(+str);
    }

    setIsDataSaved(false)

    const value = e.target.value

    if(name == "textarea" && value.length) {
        if(value.length > max)
            setSectionAValue({
                ...sectionAValue,
                [e.target.name]: value.slice(0, max)
            })
        else 
        setSectionAValue({
            ...sectionAValue,
            [e.target.name]: value
        })
    } else 
    if(name == "number") {
        if(isInteger(value))
            setSectionAValue({
                ...sectionAValue,
                [e.target.name]: value
            })
    } else {
        setSectionAValue(prev => {
            return {
                ...prev,
                [e.target.name]: e.target.value
            }
        })
    }
}

const handleChangeValueSpecial = (e, setSpecialization, currentIndex) => {
    setSpecialization(prev => {
        return prev.map((element, index) => {
            if(index == currentIndex) {
                return {
                    ... element,
                    specializationName: e.target.value
                }
            } else 
                return element
        })
    })
}

export {
    handleChangeValue,
    handleChangeValueSpecial
}