import React from 'react'

export default function ResponseBlock({ data, setState, index }) {
    return (
        <tr>
            <td>{index}</td>
            <td>{data.departmentName}</td>
        </tr>
    )
}
