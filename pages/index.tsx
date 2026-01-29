import fs from "fs/promises"
import path from "path"
import Link from "next/link"

export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export default function HomePage({ products }: { products: Product[] }) {

    if (!products || products.length === 0) {
        return <p>Empty Data!</p>
    }

    return (
      <>
        <h1>Home Page</h1>
        {products.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <h4>{product.description}</h4>
            <p>{product.price}</p>
            <Link href={`/${product.id}`}>See Detail</Link>
          </div>
        ))}
      </>
    );
}

export async function getStaticProps(context) {
    const filePath = path.join(process.cwd(), "", "products.json")
    const fileData = await fs.readFile(filePath, "utf8")

    const data: { products: Product[] } = JSON.parse(fileData)

    if (!data.products) {
        return {
            redirect: "/"
        }
    }

    if (data.products.length === 0) {
        return {
            notFound: true
        }
    }

    return {
      props: {
            products: data.products,
        },
    };
}