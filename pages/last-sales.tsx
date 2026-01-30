import { useState, useEffect } from "react"
import useSWR from "swr"

type User = {
    id: string;
    username: string;
    volume: number;
}

type Response = {
    [key: string]: Omit<User, "id">
}

function normalizeData(data: Response) {
    const dataArr: User[] = []
    for (const key in data) {
        dataArr.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume
        })
    }
    return dataArr;
}

export default function LastSales(props: { data: User[] }) {
    const [sales, setSales] = useState<User[]>(props.data);
    // const [isLoading, setLoading] = useState(false)

    const { data, error, isLoading } = useSWR("https://belajar-firebase-ea75b.firebaseio.com/sales.json", (url) => fetch(url).then(res => res.json()))

    useEffect(() => {
        if (data) {
        setSales(normalizeData(data));
      }
    }, [data]);

    /*useEffect(() => {
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
    }, [])*/

    
    if (error) {
        return <p>Failed to load data</p>
    }

    if (!sales && !data) {
        return <p>Empty data</p>;
    }

    return (
      <ul>
        {sales.map((item: User) => (
          <li key={item.id}>
            <p>{item.id}</p>
            <p>{item.username}</p>
            <p>{item.volume}</p>
          </li>
        ))}
      </ul>
    );
}

export async function getStaticProps() {
    const response = await fetch("https://belajar-firebase-ea75b.firebaseio.com/sales.json")
    const data: Response = await response.json();
    const res = normalizeData(data)
    
    return {
        props: {
            data: res
        }
    }
}