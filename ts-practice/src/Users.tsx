//interface used to create custom types that define objects
//expanding from the regular string, boolean, number, etc.
export interface Users {
    name: string;
    age: number;
}

export const Users = (props: Users) => {
    return (
    <div>
        <p>Name: {props.name}</p>
        <p>Age: {props.age}</p>
    </div>
);}