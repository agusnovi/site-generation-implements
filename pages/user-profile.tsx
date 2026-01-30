export default function UserProfile({ username }) {
    return <h1>{username}</h1>
}

export async function getServerSideProps(context) {
    return {
        props: {
            username: "agus"
        }
    }
}