import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export const showToast = (type, message) => {
    const attributes = {
        position: "bottom-right",
        autoClose: 2500,
        closeOnClick: false,
        pauseOnHover: false,
        theme: "colored",
    };
    type === "success" ?
    toast.success(message, {
        ...attributes
    }) :
    toast.error(message, {
        ...attributes
    });
};