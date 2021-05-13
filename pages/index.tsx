import { Todo } from ".prisma/client";
import axios, { AxiosRequestConfig } from "axios";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Swal from "sweetalert2"
import ItemList from "../src/components/itemlist";
type TodoInputs = {
  title: string,
  detail: string,
};
const Home = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const [version, setVersion] = useState<number>(0)
  const [items, setItems] = useState<Todo[]>([])
  const { register, handleSubmit, setValue } = useForm<TodoInputs>();
  const setNewVersion = () => {
    setVersion(new Date('2012.08.10').getTime() / 1000)
  }
  const fetchAllTodo = async () => {
    setLoading(true)
    try {
      const allItem = await axios({
        method: 'GET',
        url: '/api/v1/todos'
      })

      if (allItem.data) {
        setItems(allItem?.data?.todo)
      }
    } catch (error) {
      Swal.fire({
        title: 'Load Todo Error.',
        icon: 'error'
      })
    } finally {
      setLoading(false)
    }
  }
  const clearForm = () => {
    setValue("title", "")
    setValue("detail", "")
  }
  const onSubmit: SubmitHandler<TodoInputs> = async (value) => {
    setLoading(true)
    const config: AxiosRequestConfig = {
      method: 'post',
      url: '/api/v1/todos',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(value)
    }
    try {
      const createTodo = await axios(config)
      if (createTodo.data) {
        Swal.fire({
          title: 'Add Todo Success.',
          icon: 'success'
        })
        clearForm()
        setNewVersion()
      }
    } catch (error) {
      Swal.fire({
        title: 'Add Todo Error.',
        text: error,
        icon: 'error'
      })
    } finally {
      setLoading(false)
    }
  };

  // Life cycle
  useEffect(() => {
    fetchAllTodo()
    return () => {
      return
    }
  }, [version])
  return (
    <div className=" h-screen w-full flex items-center justify-center bg-teal-lightest font-sansbg-gray-200">
      <div className="rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg bg-gray-100">
        <div className="mb-4">
          <h1 className="text-grey-darkest">Todo List</h1>
          <div className="flex mt-4 flex-col">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input {...register("title")} className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Title." />
              <textarea {...register("detail")} className="shadow appearance-none border rounded w-full py-2 px-3 mt-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="Detail."></textarea>
              <button type="submit" disabled={loading} className="p-2 w-full border-2 mt-2 rounded text-black hover:border-green-600 hover:text-white hover:bg-green-500">{loading ? "Loading..." : "Add"}</button>
            </form>
          </div>
        </div>
        <div>
          {
            items.length > 0 ? items.map((item, index: number) => {
              return <ItemList status={item.status} title={item.title} detail={item.detail} key={"List-todo-Item-" + item.title + "-" + index} />
            }) : null
          }
        </div>
      </div>
    </div>
  )
}
export default Home