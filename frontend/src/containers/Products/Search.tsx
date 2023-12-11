import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./search.scss"
const Search = () => {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate()
    const searchSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (keyword.trim()) navigate(`/products/${keyword}`);
        else navigate("/products");
    };
    return (
        <form className="searchBox" onSubmit={searchSubmitHandler}>
            <input
                type="text"
                placeholder="Search a Product ..."
                onChange={(e) => setKeyword(e.target.value)}
            />
            <input type="submit" value="Search" />
        </form>
    )
}

export default Search