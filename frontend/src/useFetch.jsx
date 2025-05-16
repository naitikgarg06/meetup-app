import { useEffect, useState } from "react"

const useFetch = (url, initalData) => {
    const [data, setData] = useState(initalData)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(() => {
        setLoading(true)
        fetch(url)
        .then((res) => res.json())
        .then((data) => { setData(data)})
        .catch((err) => setError(err))
        .finally(() => {setLoading(false)})
    }, [url])

    return {data, loading, error}
}

export default useFetch