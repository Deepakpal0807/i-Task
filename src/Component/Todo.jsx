import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";



function Todo() {
    const [todo, settodo] = useState('');
    const [todos, settodos] = useState([]);
    const [showfinished, setshowfinished] = useState("false");


    // useEffect(() => {
    //     let alltodos = localStorage.getItem("todos");
    //     if (alltodos) {
    //         try {
    //             let newtodos = JSON.parse(alltodos);
    //             newtodos.forEach(todo => {
    //                 todo.iscomplete = Boolean(todo.iscomplete); // Convert to boolean
    //             });
    //             settodos(newtodos);
    //         } catch (error) {
    //             console.error("Error parsing todos from localStorage:", error);
    //         }
    //     }
    // }, []);


    useEffect(() => {
        const todosall = localStorage.getItem("todos");
        if (todosall) {
            const newtodos = JSON.parse(todosall);
            settodos(newtodos);
        }

    }, []);

    const handleChange = (e) => {
        settodo(e.target.value);
    }
    const savetols = (newTodos) => {
        localStorage.setItem("todos", JSON.stringify(newTodos));
    };

    const handleAdd = () => {
        if (todo != '') { // Check if the todo input is not empty or whitespace
            const newtodos = [...todos, { id: uuidv4(), todo, iscomplete: false }];
            settodos(newtodos);

            //   localStorage.setItem("todos", JSON.stringify(newtodos)); // Update local storage after setting state
            localStorage.setItem("todos", JSON.stringify(newtodos));

            settodo(''); // Clear the todo input after adding
        }
    }


    const handleclick = (e) => {
        let id = e.target.name;
        let index = todos.findIndex((el) => id === el.id);
        const newTodos = [...todos];
        newTodos[index].iscomplete = !(newTodos[index].iscomplete);
       

        settodos(newTodos);
        localStorage.setItem("todos", JSON.stringify(newTodos));
    }
    const handleedit = (e) => {
        const id = e.target.name;
        const index = todos.findIndex((el) => id === el.id);

        const newTodos = [...todos];
        const val = newTodos[index].todo;
        newTodos.splice(index, 1);
        settodos(newTodos);
        settodo(val);
        localStorage.setItem("todos", JSON.stringify(newTodos));

    }

    const handledelete = (e) => {
        let id = e.target.value;
        const confirmdelete = confirm("Are you want to delete the todo?");
        if (confirmdelete) {

            const newtodos = [...todos];
            let index = newtodos.findIndex((el) => {
                id === el.id;
            })
            newtodos.splice(index, 1);
            localStorage.setItem("todos", JSON.stringify(newtodos));
            settodos(newtodos);
        }

    }
   const handleshow=() => {
      setshowfinished(!showfinished);
   }
   



    return (
        <div className="container bg bg-violet-200 rounded-xl my-5 mx-auto p-5 max-w-lg"> {/* Use max-width for responsiveness */}
            <div className='font-bold text-black  m-auto text-center font-semibold font-serif mb-5 text-xl'><span className='text-red-600'>i</span>Task - Manage your todo at one place </div>
            <div className="heading font-bold mb-4">Add Todo</div>
            <div className="top w-full flex flex-col md:flex-row justify-around mb-5 border-b-2 border-black pb-5"> {/* Use flex layout */}
                <input type="text" value={todo} onChange={handleChange} className='border border-black border-2 rounded-md w-full md:w-3/4 mb-2 md:mb-0' placeholder='Enter your Todo here!' /> {/* Adjust width for small screens */}
                <button onClick={handleAdd}  
                className='bg-violet-600 hover:bg-violet-900 hover:scale-110 rounded-md text-white py-1 px-2'>Add</button>
            </div>

     <div className="show flex justify-start"  >
     <input type="checkbox"  className="mr-5" onClick={handleshow} checked={showfinished} />
     <p className='font-bold'>Show finished</p>
     </div>

            <div className="yourtodo ">
                <h4 className='font-bold text-lg'>Your Todo</h4>
                {todos.length === 0 && <div className='mx-4'><h3>No Todos to display.</h3></div>}
                {todos.map((el, index) => (

                  (showfinished || !el.iscomplete)&&  <div key={index} className="my-4 todo flex justify-between items-center w-full font-semibold"> {/* Use flex layout */}
                        <input type="checkbox" name={el.id} checked={el.iscomplete} onChange={handleclick} />
                        <div className={el.iscomplete ? "line-through" : ""}>
                            {el.todo}
                        </div>
                        <div className="todo_button flex items-center"> {/* Use flex layout */}
                            <button name={el.id} className='bg-violet-600 hover:bg-violet-900 text-white hover:scale-110 p-2 rounded-md mr-2' onClick={handleedit}><FaEdit /></button> {/* Adjust padding for small screens */}
                            <button name={el.id} className='bg-violet-600 hover:bg-violet-900 text-white hover:scale-110 p-2 rounded-md' onClick={handledelete} >
                            <MdDelete/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default Todo;
