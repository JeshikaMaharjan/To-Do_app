import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles/TaskInput.css";

export default function TaskInput() {
  const baseURL = `${import.meta.env.VITE_API_URL}`;
  const [tasks, setTasks] = useState();
  const userId = 2;
  useEffect(() => {
    async function getAllTasks() {
      const { data } = await axios.get(`${baseURL}/viewtask/${userId}`);
      setTasks(data.data);
      console.log(data);
    }

    getAllTasks();
  }, []);
  console.log(tasks);

  const [task, setTask] = useState();
  const [priority, setPriority] = useState();

  function handleInput(e) {
    setTask(e.target.value);
  }
  function handlePriority(e) {
    setPriority(e.target.value);
  }
  function handleSubmit(e) {
    async function postData() {
      const postdata = {
        task: task,
        priority: parseInt(priority),
        userId: "2",
      };
      try {
        console.log(postdata);
        const result = await axios.post(`${baseURL}/addtask`, postdata);
        if (result?.data?.status == "ok") console.log(result.data.message);
        else console.log(result.data.message);
      } catch (err) {
        console.log(err);
      }
    }
    postData();
    location.reload();
  }
  function DeleteTask(e) {
    const taskId = e.target.name;
    async function postData() {
      try {
        const result = await axios.delete(
          `${baseURL}/delete/${userId}/${taskId}`
        );
        console.log(result);
      } catch (err) {
        console.log(err);
      }
    }
    postData();
    location.reload();
  }
  return (
    <>
      <div className="container">
        <div className="form">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <span>Enter Task</span>
            <input type="text" onChange={handleInput} />
            <span>Assign priority</span>
            <select onChange={handlePriority}>
              <option value={"--Choose--"} disabled />
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
            </select>
            <input type="submit" />
          </form>
        </div>
        {tasks && tasks.length != 0 && (
          <div className="viewTasks">
            <span>Tasks:</span>
            <span>Priority</span>
            {tasks.map((task) => {
              return (
                <>
                  <div>
                    <p>
                      {task.task} {task.priority}
                    </p>
                    <input
                      type="submit"
                      value="Delete"
                      onClick={DeleteTask}
                      name={task.id}
                    />
                  </div>
                </>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
