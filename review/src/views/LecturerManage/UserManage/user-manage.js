export const handleChangeInformation = ({ e, setState }) => {
    const name = e.target.name
    const value = e.target.value

    setState(prev => {
        return {
            ...prev,
            [name]: value
        }
    })
}