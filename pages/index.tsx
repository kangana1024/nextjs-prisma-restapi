import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
type TodoInputs = {
  title: string,
  detail: string,
};
const Home = () => {
  const [loading, setLoading] = useState<boolean>(false)
  const { register, handleSubmit } = useForm<TodoInputs>();
  const onSubmit: SubmitHandler<TodoInputs> = async (value) => {
    setLoading(true)
    const config: AxiosRequestConfig = {
      method: 'post',
      url: 'http://localhost:3000/api/v1/todos',
      headers: {
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(value)
    }
    try {
      const createTodo = await axios(config)
      if (createTodo.data) {
        window && window.alert("Success")
      }
    } catch (error) {
      window && window.alert("Fail : " + error)
    } finally {
      setLoading(false)
    }
  };
  return (
    <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
      <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
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
          <div className="flex mb-4 items-center shadow-md p-5">
            <div className="flex w-full flex-col">
              <p className="w-full text-grey-darkest">
                <strong>Title</strong>

              </p>
              <p className="w-full text-grey-500">
                Detail
            </p>
            </div>

            <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green-500 border-green-500 hover:bg-green-500">Done</button>
            <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red-500 border-red-500 hover:text-white hover:bg-red-500">Remove</button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Home