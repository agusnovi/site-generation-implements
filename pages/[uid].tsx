export default function UIdPage(props: { uid: string }) {
    return <h1>{props.uid}</h1>
}

export async function getServerSideProps(context) {
    const { params, res, req } = context;

    if (!params) {
        return {
            redirect: "/"
        }
    }

    if(!params.uid) {
        return {
            notFound: true
        }
    }

     return {
         props: {
             uid: params.uid
         }
     }
 }