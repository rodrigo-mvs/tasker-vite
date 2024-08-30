import React , { useState , useEffect } from "react";
import "./ToDoList.css";
import { FaPaperPlane } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FaUndoAlt } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";



function ToDoList() {

    const listaStorage = localStorage.getItem("taskList");

    const [taskList, setTaskList] = useState(listaStorage ? JSON.parse(listaStorage) : []);
    const [newTask, setNewTask] = useState("");
    const [currentDate, setCurrentDate] = useState(getDate());

    useEffect(() => {
        localStorage.setItem("taskList", JSON.stringify(taskList));
    }, [taskList]);


    function addEvent(form) {
        form.preventDefault();
        if (newTask === "") return;
        console.log(newTask + currentDate);
        setNewTask(newTask);
        setTaskList([...taskList, {text: '[' + currentDate + '] \n ' + newTask, done: false}]);
        setNewTask("");
        document.getElementById("prompt").focus();
    }


    function getDate() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate();
        return `${date}-${month}-${year}`;
      }


    function inverter(index) {
        const listaAuxiliar = [...taskList];
        listaAuxiliar[index].done = !listaAuxiliar[index].done;
        setTaskList(listaAuxiliar);
    }

    function eliminar(index) {
        const listaAuxiliar = [...taskList];
        listaAuxiliar.splice(index, 1);
        setTaskList(listaAuxiliar);
    }

    function delAll() {
        setTaskList([]);
    }

    function redirectToSite(site) {
        window.location.href = site;
    }

    
    return (
        <div>
            <h1 id="title" onClick={() => { redirectToSite("https://github.com/rodrigo-mvs") }}>Taskerr</h1>

            <form id="prompt" onSubmit={addEvent}>
                <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Enter a task" />
                <button className="add" type="submit"><FaPaperPlane /></button>
                <button className="delall" type="button" onClick={() => { delAll() }}><FaTrashAlt /></button>
            </form>
            

            
            <div className="lista">
                { taskList.length < 1 ? <div id="empty">NO TASKS ADDED</div> :

                taskList.map((task, index) => (

                    <div key={index} className={task.done ? "item done" : "item"}>
                        <span>{task.text}</span>


                        {task.done
                        ?
                        <form className="buttons">
                            <button className="redo" type="button" onClick={() => { inverter(index) }}> <FaUndoAlt /></button>
                            <button className="delete-done" type="button" onClick={() => { eliminar(index) }}> <FaTrash /></button>
                        </form>
                        :
                        <form className="buttons">
                            <button className="tick" type="button" onClick={() => { inverter(index) }}> <FaCheck /></button>
                            <button className="delete" type="button" onClick={() => { eliminar(index) }}> <FaTrash /></button>
                        </form>}

                    </div>))}


            </div>

        </div>
    );

}


export default ToDoList;