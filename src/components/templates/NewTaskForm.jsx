import { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewTask } from "../../features/tasks/taskSlice";


const NewTaskForm = ({ typeText, editFormOpen, setEditFormOpen }) => {
    const dispatch = useDispatch();

    const [titleLabel, setTitleLabel] = useState("Titulo");
    const [changeColor, setChangeColor] = useState(false);
    const [data, setData] = useState({
        title: "",
        description: ""
    });

    const inputHandler = (e) => {
        const {name, value} = e.target;

        setData((prev) => ({
            ...prev,
            [name]: value.trim()
        }))
    }

    const createNewTaskBtn = async (e) => {
        e.preventDefault();

        if(data.title === ""){
            setTitleLabel("Compo obligatorio");
            setChangeColor(!changeColor);
            setTimeout(() => {
                setTitleLabel("Titulo");
                setChangeColor(false);
            }, 3000);
            return;
        }

        try {
            await dispatch(createNewTask(data)).unwrap();
            setEditFormOpen(!editFormOpen);
        } catch (error) {
            console.log("Error: " + error.message)
        }
    }

    const cancelProcessBtn = (e) => {
        e.preventDefault()
        setData({
            title: "",
            description: ""
        });

        setEditFormOpen(!editFormOpen);
    }

    return(
        <div
            className="absolute w-full flex justify-center items-center left-0"
            style={{ height: '400px' }}
        >
            <form
                className="p-6 rounded-sm shadow-sm bg-blue-soft flex flex-col justify-start items-center"
                style={{ width: '350px' }}
            >
                <div
                    className="w-full p-2 mb-2 text-center font-medium tracking-wider text-slate-100 text-xl"
                >
                    <h3>
                        Nueva Tarea
                    </h3>
                </div>
                <div
                    className="w-full flex flex-col justify-start items-start"
                >
                    <label
                        htmlFor="title"
                        className={`${changeColor ? "text-red-600" : "text-slate-100"} tracking-wider font-medium text-lg px-2`}
                    >
                        {titleLabel}
                    </label>
                    <input
                        type="text"
                        max={100}
                        name="title"
                        placeholder="Ingresa el titulo de la tarea"
                        className="w-full text-lg p-2 outline-none border-none rounded-sm text-blue-light tracking-wider font-normal"
                        onChange={(e) => inputHandler(e)}
                    />
                </div>
                <div
                    className="w-full flex flex-col justify-start items-start mt-3"
                >
                    <label
                        htmlFor="title"
                        className="text-slate-100 tracking-wider font-medium text-lg px-2"
                    >
                        Descripción
                    </label>
                    <textarea
                        type="text"
                        name="description"
                        className="w-full text-lg p-2 outline-none border-none rounded-sm text-blue-light tracking-wider font-normal"
                        onChange={(e) => inputHandler(e)}
                    />
                </div>
                <div
                    className="w-full flex flex-col justify-center items-center mt-4"
                >
                    <button
                        className="mt-4 p-3 flex justify-center items-center text-blue-dark tracking-wider font-medium text-lg bg-slate-50 hover:bg-slate-200  transition-colors rounded-md mb-4 shadow-sm"
                        style={{ width: 'clamp(220px, 90%, 450px)' }}
                        onClick={(e) => createNewTaskBtn(e)}
                    >
                        Crear Tarea
                    </button>
                    <button
                        className="p-3 flex justify-center items-center text-slate-100 tracking-wider font-medium text-lg bg-neutral-700 hover:bg-neutral-900 transition-colors rounded-md shadow-sm"
                        style={{ width: 'clamp(220px, 90%, 450px)' }}
                        onClick={(e) =>cancelProcessBtn(e)}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    )
}

export default NewTaskForm;