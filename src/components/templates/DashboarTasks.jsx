import DisplayTasks from "../organisms/DisplayTasks";

const Dashboar = () => {
    

    return (
        <div
            className="shadow-md bg-slate-50 rounded-md"
            style={{ width: 'clamp(220px, 90%, 1260px)' }}
        >
            <DisplayTasks />
        </div>
    );
}

export default Dashboar;