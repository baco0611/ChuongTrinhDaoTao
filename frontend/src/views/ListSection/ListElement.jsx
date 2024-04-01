import { Link } from "react-router-dom"

function ListElement({ data }) {
    return (
        <tr>
            <td style={{width: '45px'}}>
                <Link to={`/edit/sectionA/${data.id}`}>
                    {data.stt}
                </Link>
            </td>
            <td style={{width: '250px'}}>
                <Link to={`/edit/sectionA/${data.id}`}>
                    {data.maChuongTrinhDaoTao}
                </Link>
            </td>
            <td style={{width: '250px'}}>
                <Link to={`/edit/sectionA/${data.id}`}>
                    {data.tenChuongTrinhDaoTao}
                </Link>
            </td>
            <td className='text-left' style={{width: '300px'}}>
                <Link to={`/edit/sectionA/${data.id}`}>
                    {data.tenNganhDaoTao}
                </Link>
            </td>
            <td style={{width: '200px'}}>
                <Link to={`/edit/sectionA/${data.id}`}>
                    {data.trangThai}
                </Link>
            </td>
            <td style={{width: '180px'}}>
                <Link to={`/edit/sectionA/${data.id}`}>
                    {data.nguoiPhuTrach}
                </Link>
            </td>
            <td style={{width: '180px'}}>
                <Link to={`/edit/sectionA/${data.id}`}>
                    {data.updated_at}
                </Link>
            </td>
            <td style={{width: '180px'}}>
                <Link to={`/edit/sectionA/${data.id}`}>
                    {data.created_at}
                </Link>
            </td>
        </tr>
    )
}

export default ListElement