import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faCircle } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { updateATask, deleteTask } from "../../features/tasks/taskSlice";

const CartTask = ({ data, editTask}) => {
    const dispatch = useDispatch();

    const formatedCompletedField = (status) => {
        if(status){
            return 'Completada';
        }

        return 'No completada'
    }

    const editBtn = (e) => {
        editTask(data);
    }

    const deleteBtn = async (e) => {
        try {
            await dispatch(deleteTask(data.id)).unwrap();
        } catch (error) {
            console.log("Error: " + error.message);
        }
    }

    const statusBtn = async (e) => {
        try {
            const status = !data.completed;
            await dispatch(updateATask({id: data.id, updateData: {title: data.title, description: data.description, completed: status}})).unwrap();
        } catch (error) {
            console.log("Error: " + error.message)
        }
    }

    return (
        <div
            className="shadow-md rounded-sm p-3 flex flex-col justify-start items-center"
            style={{ width: '260px', height: '320px'}}
        >
            <div
                className="w-full text-center py-1 font-medium tracking-wider text-lg text-blue-light border-b-2 mb-3"
            >
                <h2>
                    {data.title}
                </h2>
            </div>
            <div
                className="w-full overflow-y-auto-auto text-center font-medium tracking-wider text-base text-blue-light border-b-2 mb-2"
                style={{ height: '35%' }}
            >
                <p>
                    {data.description}
                </p>
            </div>
            <div
                className="w-full"
            >
                <ul
                    className="w-full flex flex-wrap gap-2 tracking-wider text-blue-light text-sm mb-7"
                >
                    <li>Status: {formatedCompletedField(data.completed)}</li>
                    <li>Fecha: {data.createdAt.formattedDate}</li>
                    <li>Hora: {data.createdAt.formattedTime}</li>
                </ul>
            </div>
            <div
                className="w-full flex flex-wrap justify-between items-center"
            >
                <button
                    className="py-1 border-2 border-blue-dark rounded-md tracking-wide font-medium text-blue-light"
                    style={{ width: '70px' }}
                    onClick={editBtn}
                >
                    Editar
                </button>
                <button
                    className="py-1 border-2 border-red-400 rounded-md tracking-wide font-medium text-blue-light"
                    style={{ width: '70px' }}
                    onClick={(e) => deleteBtn(e)}
                >
                    Borrar
                </button>
                <button
                    className={`py-1 border-2 border-blue rounded-md tracking-wide font-medium ${data.completed ? "text-blue" : "text-red-400"}`}
                    style={{ width: '70px' }}
                    onClick={(e) => statusBtn(e)}
                >
                    <FontAwesomeIcon icon={data.completed ? faCheckCircle : faCircle} />
                </button>
            </div>
        </div>
    )
}

export default CartTask;