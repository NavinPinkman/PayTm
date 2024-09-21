export function Button({label,onClick}){
    return <div>
        <button onClick={onClick} className="bg-black hover:bg-yellow-400 w-full  text-white mb-4 py-2 px-2 rounded font-bold">{label}</button>
    </div>
}