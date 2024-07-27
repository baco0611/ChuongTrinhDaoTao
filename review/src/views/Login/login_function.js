const handleChangeValue = (e, setState) => {
    setState(prev => {
        return {
            ...prev,
            [e.target.name]: e.target.value
        }
    })
}

const handleSubmit = (e, userInformation) => {
    e.preventDefault()
}

export {
    handleChangeValue,
    handleSubmit,
}