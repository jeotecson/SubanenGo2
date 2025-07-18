import { Datagrid, TextField, List } from "react-admin"

export const CourseList = () => {
    return (
        <List>
            <Datagrid rowClick="edit">
                <TextField source="id" />
                <TextField source="title" />
                <TextField source="imageSrc" />
            </Datagrid>
        </List>
    )
}