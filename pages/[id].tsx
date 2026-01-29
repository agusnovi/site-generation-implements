import fs from "fs/promises"
import path from "path"
import { Product } from "."
export default function DetailPage({ products }: { products: Product[] }) {
    if (!products || products.length === 0) {
        return <p>Loading.......</p>
    }
    
    return (
      <>
        <h1>Detail Page</h1>
        <p>{products[0].name}</p>
        <p>{products[0].description}</p>
      </>
    );
}

async function getFile(): Promise<Product[]> {
    const filePath = path.join(process.cwd(), "", "products.json")
    const fileData = await fs.readFile(filePath, "utf8")
    const data: { products: Product[] } = JSON.parse(fileData)
    
    return data.products
}

async function getDetail(id: string): Promise<Product[]> {
  const file = await getFile();

  return file.filter((product) => product.id.toString() === id);
}
export async function getStaticProps(context: { params: { id: string } }) {
    const {params} = context
    const detail = await getDetail(params.id)

    if (!detail) {
        return {
            redirect: "/"
        }
    }

    if (detail.length === 0) {
        return {
            notFound: true
        }
    }

    return {
      props: {
        products: detail,
      },
      revalidate: 10
    };
}

export async function getStaticPaths() {
    const fileData = await getFile();

    const params: { params: { id: string} }[] = fileData.map(data => ({ params: { id: data.id.toString() } }));
    
    return {
      paths: [params[0]],
      fallback: true,
    };
}