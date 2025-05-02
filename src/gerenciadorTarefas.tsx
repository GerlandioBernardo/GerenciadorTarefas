import { useReducer, useRef } from "react";
import "tailwindcss";
import {v4 as uuidv4} from "uuid";
import {FaTrash, FaEdit, FaCheck} from "react-icons/fa";

type Tarefa  = {
  titulo: string;
  id: string;
  concluida?: boolean;
}
type StateTarefa = {
  tarefas: Tarefa[];
}
type ActionTarefa = {
  type: 'add' | 'remove' | 'complement';
  payload: string;
}
const InitialState: StateTarefa = {
  tarefas: [],
} 
function reducer(state: StateTarefa, action: ActionTarefa): StateTarefa {
  if (action.type === 'add') {
    const newTask: Tarefa = {
      titulo: action.payload,
      id: uuidv4(),
    };
    return {
      ...state,
      tarefas: [...state.tarefas, newTask],
    }
  }
  else if (action.type === 'remove') {
    return {
      ...state,
      tarefas: state.tarefas.filter((task) => task.id !== action.payload),
    };
  } else {
    return{
      ...state,
      tarefas: state.tarefas.filter((task)=>
        task.id === action.payload
          ? {...task, concluida: !task.concluida}: task
      )
    }

  }
}

export default function GerenciadorTarefas() {
  const [state, dispatch] = useReducer(reducer, InitialState)

  const inputRef = useRef<HTMLInputElement>(null)

  function saveTask(){
    const valeu = inputRef.current?.value || '';
    dispatch({payload: valeu, type: 'add'});
    console.log(state);
  }

  return (
    <div className='min-h-screen bg-black/10 flex justify-center'>
        <div className='bg-white w-[600px] h-[130px] mt-[30px]
        rounded-[10px] shadow-lg'>
            <h1 className="mt-[10px] mb-[15px] text-[22px] font-extrabold text-center ">Lista de Tarefas</h1>
            <div className="flex justify-center items-center space-x-4">
              <input ref={inputRef} type="text" className="bg-black/10 pl-2 w-100 h-8
              border-none outline-none placeholder:italic placeholder:text-[15px]
              placeholder:text-white/400 rounded " placeholder="Digite a tarefa aqui"/>
              <button className="bg-blue-500 pl-3 pr-3 h-8 text-white
              cursor-pointer hover:bg-blue-400" onClick={saveTask}>Adicionar</button>

            </div>
            <div className="mt-20 space-y-2">
          {state.tarefas.map((task)=>(
            <div key={task.id} className="w-150 h-10 pt-2 pl-5 bg-white rounded shadow
            italic flex justify-between ">
               <span className={task.concluida ? "line-through text-gray-500" : ""}>
                  {task.titulo}
               </span>
              <div>
                <button className="pr-5  text-green-500 cursor-pointer"
                onClick={()=>
                  dispatch({type: 'complement', payload: task.id})
                }>
                    <FaCheck/> 
                </button>
                <button className="pr-5 pb-1 text-blue-500 cursor-pointer">
                    <FaEdit/> 
                </button>
                <button className="pr-5 pb-1 text-red-500 cursor-pointer"
                onClick={()=>
                  dispatch({type: 'remove', payload: task.id})
                }>
                    <FaTrash/> 
                </button>
              </div>
            </div>
  
          ))}

        </div>
        </div>

    </div>
  )
}
