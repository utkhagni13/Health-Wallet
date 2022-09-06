import React from "react";
import Image from "./Image";
import { BiImageAdd } from "react-icons/bi";

const CLOUD_NAME = "health-wallet";
const PRESET_NAME = "start-1";

const ImageArray = ({ imageArray, setImageArray }) => {
    const handleDelete = (index) => {
        setImageArray(
            imageArray.filter((_, idx) => {
                return idx !== index;
            })
        );
    };

    const handleChange = async (e) => {
        let fileArray = e.target.files[0];
        let data = new FormData();
        data.append("file", fileArray);
        data.append("upload_preset", PRESET_NAME);
        data.append("cloud_name", CLOUD_NAME);
        console.log("File array : ", data);
        try {
            await fetch("https://api.cloudinary.com/v1_1/health-wallet/image/upload", {
                method: "POST",
                body: data,
            })
                .then((resp) => resp.json())
                .then((data) => {
                    console.log(data.url);
                    let newImageArray = [...imageArray, data.url];
                    setImageArray(newImageArray);
                })
                .catch((err) => console.log(err));
        } catch (err) {
            alert("ERROR while uploading image. Please check your internet connection");
        }
    };

    return (
        <div className="display__images">
            {imageArray.map((src, idx) => {
                return (
                    <div key={idx} className="image__input">
                        <Image details={{ src: src, index: idx }} handleDelete={handleDelete} />
                    </div>
                );
            })}
            <label htmlFor="file-upload" className="custom-file-upload">
                <BiImageAdd style={{ cursor: "pointer" }} size={40} />
            </label>
            <input id="file-upload" onChange={(e) => handleChange(e)} type="file" />
        </div>
    );
};

export default ImageArray;
