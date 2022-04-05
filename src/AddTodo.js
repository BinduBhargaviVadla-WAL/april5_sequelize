import axios from "axios";
import { useState } from "react";
const AddTodo = () => {
  let [todos, setTodos] = useState([]);
  let [view, setView] = useState();
  const addTodo = (event) => {
    event.preventDefault();
    const obj = {
      status: event.target.status.value,
      title: event.target.title.value,
      description: event.target.description.value,
    };
    axios.post("/sqTodo/create", obj).then((res) => {
      console.log(res.data);
      alert("Todo Added");
    });
  };
  const viewTodo = () => {
    if (view) {
      setView(0);
    } else {
      setView(1);
    }
    axios
      .get("/sqTodo")
      .then((res) => {
        console.log(res);
        setTodos(res.data);
        console.log(todos);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className='text-center'>
      <form
        onSubmit={addTodo}
        className='w-50 m-auto p-3 mt-4 text-center border border-dark rounded'
      >
        <h1>Registration Form</h1>
        <div className='form-group'>
          <input
            type='text'
            name='title'
            placeholder='Enter Title'
            className='form-control w-75 m-auto mt-3 mb-4'
          />
          <select name='status' className='form-control w-75 m-auto mt-3 mb-4'>
            <option value={1}>Complete</option>
            <option value={0}>Incomplete</option>
          </select>
          <input
            type='text'
            name='description'
            placeholder='Enter Description'
            className='form-control w-75 m-auto mt-3 mb-4'
          />
          <button className='btn btn-primary m-5'>Add Todo</button>
        </div>
      </form>
      <button className='btn btn-success m-5' onClick={viewTodo}>
        View Todo
      </button>

      {todos.length > 0 ? (
        <div>
          <table class='table table-striped table-bordered text-left mt-5 w-50 m-auto'>
            <thead>
              <tr>
                <th scope='col'>S.No</th>
                <th scope='col'>Todo</th>
                <th scope='col'>Status</th>
                <th scope='col'>Description</th>
                <th scope='col'>Created At</th>
                <th scope='col'>Updated At</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((val, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{val.title}</td>
                    <td>{val.status ? <>Complete</> : <>Incomplete</>}</td>
                    <td>{val.description}</td>
                    <td>{val.createdAt}</td>
                    <td>{val.updatedAt}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default AddTodo;
