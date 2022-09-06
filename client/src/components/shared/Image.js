import { useState, useEffect } from "react";
import { MdCancel } from "react-icons/md";

const Image = (props) => {
    const { handleDelete, details } = props;
    const [input, setInput] = useState("");

    useEffect(() => {
        setInput(details.src);
    }, [details.src]);

    return (
        <>
            <a href={details.src} target="_blank" rel="noreferrer">
                <img
                    className={input.length ? "" : "no__display"}
                    onClick={() => {}}
                    src={input}
                    alt="product"
                />
            </a>
            <MdCancel
                size={35}
                style={{ display: handleDelete === null ? "none" : "" }}
                className={input.length ? "delete__img__icon" : "no__display"}
                onClick={() => {
                    handleDelete(details.index);
                }}
            />
        </>
    );
};

export default Image;
