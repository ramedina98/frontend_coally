import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../features/auth/authSlice";
import LabelInput from "../molecules/LabelInput";

const ResetPassForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [passView, setPassView] = useState(false);
    const [iterator, setIterator] = useState(0);
    const [storageLabel, setStorageLabel] = useState({});
    const [dataLabel, setDataLabel] = useState({
        token: "Token",
        newPass: "Nueva contraseña"
    });
    const [data, setData] = useState({
        token: "",
        newPass: ""
    });

    const handleSeePasswordBtn = (e) => {
        e.preventDefault();
        setPassView(!passView);
    }

    const inputHanler = (e) => {
        const {name, value} = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value.trim()
        }))
    }

    const inputValidator = () => {
        let isValid = true;

        const fields = ["token", "newPass"];

        fields.forEach((field) => {
            if (data[field] === "") {
                isValid = false;

                if (iterator === 0) {
                    setStorageLabel((prev) => ({
                        ...prev,
                        [field]: dataLabel[field],
                    }));
                }

                setIterator((prev) => prev + 1);
                setDataLabel((prev) => ({
                    ...prev,
                    [field]: "No campos vacíos",
                }));
            }
        });

        return isValid;
    };

    console.log(data)
    const handleResetBtn = async(e) => {
        e.preventDefault();

        const isValid = inputValidator();

        if (!isValid) {
            console.log("Hay campos vacíos. Corrección requerida.");
            return;
        }

        try {
            await dispatch(resetPassword(data)).unwrap();

            setData({
                token: "",
                newPass: ""
            });

            navigate("/login");
        } catch (error) {
            console.log("Error: " + error.message);
        }
    }

    return (
        <form
            className="shadow-md bg-blue-dark rounded-sm p-6 h-auto flex flex-col justify-between items-center"
            style={{ width: 'clamp(220px, 90%, 650px)' }}
        >
            <div
                className="w-full p-3 text-center text-slate-50"
            >
                <h3
                    className="font-bold text-2xl mb-2 tracking-wider"
                >
                    Restaurar contraseña
                </h3>
            </div>
            <div
                className="bg-blue-soft p-3 flex flex-wrap gap-4 mt-2 justify-center"
                style={{ width: '94%'}}
            >
                <LabelInput
                    labelText={dataLabel.token}
                    inputId={"token"}
                    inputName={"token"}
                    inputMax={250}
                    inputType={"text"}
                    placeholder={"Ingrese token"}
                    inputHanler={(e) => inputHanler(e)}
                />
                <LabelInput
                    labelText={dataLabel.newPass}
                    inputId={"Nueva contraseña"}
                    inputName={"newPass"}
                    inputMax={100}
                    inputType={passView ? "text" : "password"}
                    placeholder={"Ingrese nueva contraseña"}
                    inputHanler={(e) => inputHanler(e)}
                />
            </div>
            <div
                className="w-full p-3 flex flex-wrap gap-4 justify-between"
            >
                <button
                    onClick={(e) => handleSeePasswordBtn(e)}
                    className="ml-3 py-2 pr-4 text-left text-slate-100 tracking-wider font-medium"
                >
                    Ver contraseña
                </button>
            </div>
            <button
                className="mt-4 p-3 flex justify-center items-center text-blue-dark tracking-wider font-medium text-lg bg-slate-50 hover:bg-slate-200  transition-colors rounded-md mb-4 shadow-sm"
                style={{ width: 'clamp(220px, 90%, 450px)' }}
                onClick={(e) => handleResetBtn(e)}
            >
                Recuperar
            </button>
        </form>
    );
}

export default ResetPassForm;