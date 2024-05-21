export default function Project({ params } : { params: { id: string } }) {
    return <p>Project: { params.id } </p>
}