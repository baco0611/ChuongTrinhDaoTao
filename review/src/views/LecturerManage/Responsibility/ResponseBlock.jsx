import React, { useContext, useState } from 'react'
import clsx from "clsx"
import { UserContext } from '../../../context/ContextProvider';
import { changeResponsibility } from './responsibility-function';

export default function ResponseBlock({ data, setState, index }) {
    const [searchTerm, setSearchTerm] = useState("");
    const { apiURL, serverAPI, token, setIsDataSaved } = useContext(UserContext)

    // Filter the lecturer list based on the search term
    const filteredLecturers = data.lecturerList.filter(lecturer =>
        lecturer.lecturerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lecturer.lecturerCode.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const department = {
        name: data.departmentName,
        id: data.departmentId
    }

    return (
        <tr>
            <td className='center'>{index}</td>
            <td>{department.name}</td>
            <td>
                <div className="dropdown">
                    <button className="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        {data.responsibleLecturer && data.responsibleLecturer.lecturerName || "-----"}
                    </button>
                    <ul className="dropdown-menu">
                        <li className="sticky-top p-2 bg-white">
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Tìm kiếm..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </li>
                        <li 
                            className="dropdown-item cursorPointer"
                            onClick={() => changeResponsibility({
                                api: apiURL,
                                token,
                                setState,
                                setIsDataSaved,
                                type: !data.responsibleLecturer && "1" || "2",
                                department,
                            })}
                        >-----</li>
                        {
                            filteredLecturers.map((element, index) => {
                                const isActive = data.responsibleLecturer && element.id === data.responsibleLecturer.id;

                                return <li 
                                    className={clsx("dropdown-item cursorPointer", {
                                        "active": isActive
                                    })} 
                                    key={index}
                                    onClick={() => changeResponsibility({
                                        api: apiURL,
                                        token,
                                        element,
                                        setState,
                                        setIsDataSaved,
                                        department,
                                        type: data.responsibleLecturer && element.id === data.responsibleLecturer.id && "1" || "0"
                                    })}
                                >
                                    <p>{element.lecturerName} &ensp; - &ensp; {data.departmentName}</p>
                                    <span>Mã GV: {element.lecturerCode}</span>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </td>
        </tr>
    )
}
