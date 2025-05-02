import "tailwindcss";

export default function GerenciadorTarefas() {
  return (
    <div className='min-h-screen bg-black/10 flex justify-center'>
        <div className='bg-white w-[600px] h-[130px] mt-[30px]
        rounded-[10px] shadow-lg'>
            <h1 className="mt-[10px] mb-[15px] text-[22px] font-extrabold text-center ">Lista de Tarefas</h1>
            <div className="flex justify-center items-center space-x-4">
              <input type="text" className="bg-black/10 pl-2 w-100 h-8
              border-none outline-none placeholder:italic placeholder:text-[15px]
              placeholder:text-white/400 " placeholder="Digite a tarefa aqui"/>
              <button className="bg-blue-500 pl-3 pr-3 h-8 text-white
              cursor-pointer hover:bg-blue-400">Adicionar</button>

            </div>
        </div>

    </div>
  )
}
