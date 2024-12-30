import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTasks } from "../../features/tasks/taskSlice";
import { getUserInfo } from "../../features/user/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faClose } from "@fortawesome/free-solid-svg-icons";
import Logo from "../../assets/logo.png";
import CartTask from "./CartTask";
import NewTaskForm from "../templates/NewTaskForm";
import EditTaskForm from "../templates/EditTaskForm";

const DisplayTasks = () => {
    const dispatch = useDispatch();
    const [status, setStatus] = useState();
    const [taskData, setTaksData] = useState({});
    const { tasks, change } = useSelector(state => state.tasks);
    const { info } = useSelector(state => state.user);

    const [editFormOpen, setEditFormOpen] = useState(false);
    const [editFormOpen2, setEditFormOpen2] = useState(false);

    useEffect(() => {
        dispatch(getUserInfo());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getTasks(status));
    }, [dispatch, tasks.length, status, setStatus, change]);

    const editTask = (data) => {
        console.log(data)
        setTaksData(data);
        setEditFormOpen2(!editFormOpen2);
    }

    const newTastBtn = (e) => {
        setEditFormOpen(!editFormOpen);
    }

    const handleSelector = (e) => {
        const {value} = e.target;
        if(value === "completed"){
            setStatus(true);
        } else if(value === "incompleted"){
            setStatus(false);
        } else{
            setStatus();
        }
    }

    return (
        <div
            className="flex- flex-col justify-start items-center"
        >
            <div
                className="w-full flex flex-wrap gap-4 justify-between items-center shadow-md"
            >
                <div
                    className="p-3 text-lg tracking-wider font-medium text-blue-light"
                >
                    <h2>Hola <span className="underline text-blue-dark">{info.nombre1} {info.apellido1}</span>, estas son tus tareas:</h2>
                </div>
                <div
                    className="flex flex-row justify-between items-center"
                    style={{ width: '320px' }}
                >
                    <button
                        className={`rounded-full text-3xl ${editFormOpen ? "bg-red-400" : "bg-blue-light"} text-slate-100 hover:shadow-md ${editFormOpen ? "hover:bg-red-300" : "hover:bg-blue-dark"} transition-colors flex justify-center items-center`}
                        style={{ width: '50px', height: '50px'}}
                        onClick={(e) => newTastBtn(e)}
                    >
                        <FontAwesomeIcon icon={editFormOpen ? faClose : faPlusCircle} />
                    </button>
                    <select
                        name="select-tasks-search"
                        id="search_tasks"
                        className="bg-slate-200 py-2 px-1 rounded-sm outline-none shadow-sm"
                        style={{width: '65%' }}
                        onChange={(e) => handleSelector(e)}
                    >
                        <option value="0">Buscar por...</option>
                        <option value="0">Todas las tareas</option>
                        <option value="completed">Completada</option>
                        <option value="incompleted">Incompleta</option>
                    </select>
                </div>
                <figure
                    className="m-2"
                    style={{ width: '50px', height: '50px' }}
                >
                    <img
                        src={Logo}
                        alt=""
                        className="w-full h-full object-cover"
                    />
                </figure>
            </div>
            <div
                className="w-full p-6 flex flex-wrap gap-4 justify-start items-start"
                style={{ minHeight: '500px' }}
            >
                {(editFormOpen && (
                    <NewTaskForm
                        editFormOpen={editFormOpen}
                        setEditFormOpen={setEditFormOpen}
                    />
                ))}
                {(editFormOpen2) && (
                    <EditTaskForm
                        dataEdit={taskData}
                        editFormOpen={editFormOpen2}
                        setEditFormOpen={setEditFormOpen2}
                    />
                )}
                {tasks.map((task, index) => (
                    <CartTask
                        key={index}
                        data={task}
                        editTask={editTask}
                    />
                ))}
            </div>
        </div>
    );
}

export default DisplayTasks;