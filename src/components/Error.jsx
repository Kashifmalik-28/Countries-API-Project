import { useRouteError } from 'react-router-dom'

const Error = () => {
  const error = useRouteError()
  console.log(error)
  return <div>Something Went Wrong {error.status}</div>
}

export default Error
