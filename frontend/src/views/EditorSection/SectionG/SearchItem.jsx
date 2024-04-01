function SearchItem({ item, handleChoiceSubject }) {
    return (
        <li 
            className="searchItem"
            data-id={item.idDeCuongHocPhan}
            data-name={item.tenHocPhan}
            data-ma={item.maHocPhan}
            onClick={e => handleChoiceSubject(e)}
        >
            <div>
                <h4>{item.tenHocPhan}</h4>
                <h4>Mã học phần: {item.maHocPhan}</h4>
            </div>
        </li>
    )
}

export default SearchItem