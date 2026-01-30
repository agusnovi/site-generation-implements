import { useState, useEffect } from "react"

type User = {
    id: string;
    username: string;
    volume: number;
}

type Response = {
    [key: string]: Omit<User, "id">
}
export default function LastSales() {
    const [data, setData] = useState<User[]>([]);
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetch('https://belajar-firebase-ea75b.firebaseio.com/sales.json')
            .then(res => res.json())
            .then((data: Response) => {
                setLoading(false)
                const dataArr: User[] = [];

                for(const key in data) {
                    dataArr.push({
                        id: key,
                        username: data[key].username,
                        volume: data[key].volume
                    })
                }
                
                setData(dataArr);
            })
            .catch((err) => {
                setLoading(false)
                throw err
            })
    }, [])

    if (isLoading) {
        return <p>Loading...</p>
    }
    
    if (!data) {
        return <p>Empty Data</p>
    }

    return (
      <ul>
        {data.map((item) => (
          <li key={item.id}>
                <p>{item.username}</p>
                <p>{item.volume}</p>
          </li>
        ))}
      </ul>
    );
}