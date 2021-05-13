import { Todo, TodoStatus } from ".prisma/client"
import { SyntheticEvent } from "react"
interface ItemListProps {
  todo: Todo
  handleChangeStatus: (id: number, status: TodoStatus) => (e: SyntheticEvent) => Promise<void>
}
const ItemList = ({ todo: { title, detail, status = TodoStatus.PENDING, id }, handleChangeStatus }: ItemListProps) => {
  return (<div className="flex mb-4 items-center shadow-md p-5 mt-3 bg-white">
    <div className="flex w-full flex-col">
      <p className={"w-full" + (status === TodoStatus.DONE ? " line-through text-green-500" : "")}>
        <strong>{title}</strong>

      </p>
      <p className={"w-full text-grey-500" + (status === TodoStatus.DONE ? " line-through text-green-500" : "")}>
        {detail}
      </p>
    </div>

    {status === TodoStatus.PENDING ? <button onClick={handleChangeStatus(id, TodoStatus.DONE)} className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-500 border-green-500 hover:bg-green-500">Done</button> : <button onClick={handleChangeStatus(id, TodoStatus.PENDING)} className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-500 border-green-500 hover:bg-green-500">Not Done</button>}
    <button onClick={handleChangeStatus(id, TodoStatus.DELETE)} className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-500 border-red-500 hover:text-white hover:bg-red-500">Remove</button>
  </div>)
}
export default ItemList