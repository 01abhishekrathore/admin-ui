import TableHeading from "./TableHeading";
import User from './User';
import React ,{useState} from 'react';

const Table = (props)=>{

const [editedUserValues ,setEditedUserValues] = useState({});

const userEditingHandler = (event)=>{
    setEditedUserValues({
        ...editedUserValues,
        [event.target.name]:event.target.value,
    });
};
    return (

        <table>
           <TableHeading getAllSelectedFlag={props.getAllSelectedFlag} onSelectAll={props.onSelectAll} getItemsPerPage={props.getItemsPerPage}/>

            <tbody>
            {
               props.getItemsPerPage().map((items,idx)=>(
                    <User
                       key={idx}
                       user={items}
                       onDeleteClick={props.onDelete.bind(null,items.id)}
                       onConfirmEdit={props.onEditValues.bind(null,items,editedUserValues)}
                       onSelect={props.onSelect}
                       handleEdit={userEditingHandler}
                       onEditClick = {props.onEdit.bind(null ,items)}
                    />
                ))
            }

            </tbody>

        </table>
    );
}

export default Table;