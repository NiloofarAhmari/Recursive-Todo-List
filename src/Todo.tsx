import { useState } from "react";


interface IList {
    todo: string;
    done: boolean;
    id: number;
    subTodo: IList[]
}
function Todo({ propsItems }: any) {
    const [inputTask, setInputTask] = useState('');
    const [inputTaskItem, setInputTaskItem] = useState('');
    const [list, setList] = useState<IList[]>(propsItems || []);

    const handleAddTodo = () => {
        const newTask = {
            id: Math.random(),
            todo: inputTask,
            done: true,
            subTodo: []
        };

        setList([...list, newTask]);
        setInputTask('');
    };

    const handleAddTodoitem = (id: number) => {
        var result = [...list];
        const findIndex = result.findIndex(item => item.id === id)
        result[findIndex].subTodo.push({
            todo: inputTaskItem,
            done: true,
            id: Math.random(),
            subTodo: []
        });
        setList(result);
    };


    const handleDeleteTodo = (id: number) => {
        setList((crt: IList[]) => crt.filter((todo: IList) => todo.id !== id));
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputTask(event.target.value);
    };
    const handleInputChangeitem = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputTaskItem(event.target.value);
    };


    const handleLoopInputChange = (e: React.ChangeEvent<HTMLInputElement>, id: number) => {
        var result = [...list];
        result = result.map((x) => {
            if (x.id === id) x.todo = e.target.value;
            return x;
        });
        setList(result);
    };
    const handleDone = (id: number) => {

        var result = [...list]
        const findIndex = result.findIndex(item => item.id === id)
        result[findIndex]['done'] = !!!result[findIndex]['done']
        setList(result);
    }


    console.log("list", list)
    return (
        <div>
            <div className="Top">
                <input className="input" type="text" value={inputTask}
                    onChange={handleInputChange} placeholder={"Enter a task"} />
                <button className="btn" onClick={handleAddTodo}>ADD</button>
            </div>

            <ul>
                {list.map((todo: IList) => (
                    <li key={todo.id}>
                        <input type="text" value={todo.todo} onChange={(e) => handleLoopInputChange(e, todo.id)} disabled={todo?.done}
                        />
                        <button onClick={() => handleDeleteTodo(todo?.id)}>
                            Delete
                        </button>
                        <button onClick={() => handleDone(todo?.id)}>
                            {todo?.done ? "edit" : "done"}
                        </button>
                        {todo.subTodo?.length ? <Todo propsItems={todo.subTodo} /> : ""}
                        {!todo.subTodo?.length && <div>
                            <input value={inputTaskItem} onChange={handleInputChangeitem}
                                type="text" placeholder={"Add item"} />
                            <button className="btn" onClick={() => handleAddTodoitem(todo?.id)}>ADD</button>
                        </div>}
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default Todo;