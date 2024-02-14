import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, deleteTodo, updateTodo } from "./utils/todoSlice";

function App() {
  const [value, setValue] = useState("");
  const [updateText, setUpdateText] = useState("");
  const [updateId, setUpdateId] = useState(null);

  const todoList = useSelector((state) => state.todo.todos);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (updateId !== null) {
      dispatch(updateTodo({ id: updateId, newText: value }));
      setUpdateId(null);
    } else {
      dispatch(
        addTodo({
          text: value,
          id: Date.now(),
        })
      );
    }
    setValue("");
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  const handleEdit = (id, text) => {
    setUpdateId(id);
    setUpdateText(text);
    setValue(text);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-500">
      <div className="border border-l-amber-500 w-[500px] h-[600px] overflow-y-auto overflow-hidden shadow-lg p-6">
        <h1 className="text-3xl text-center font-bold mb-4 text-white">
          Todo App
        </h1>
        <form onSubmit={handleSubmit} className="flex items-center mb-4">
          <input
            className="border p-2 w-full outline-none bg-pink-200 border-none rounded-md"
            onChange={(e) => setValue(e.target.value)}
            type="text"
            placeholder="Enter your task..."
            value={value}
            
          />
          <button
            type="submit"
            className="bg-purple-600 text-white py-2 px-4 rounded ml-2 flex-shrink-0"
          >
            {updateId !== null ? "Update" : "Add"}
          </button>
        </form>

        {todoList.map((todo) => (
          <div key={todo.id} className="p-4 border-b flex justify-between">
            <h1 className="text-lg mb-2">{todo.text}</h1>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(todo.id, todo.text)}
                className="bg-blue-400 text-white py-1 px-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(todo.id)}
                className="bg-red-400 text-white py-1 px-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
