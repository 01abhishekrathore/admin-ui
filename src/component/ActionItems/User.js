import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CircularButton from '../UI/CirCularButton';

const User=(props)=>{
    if(props.user.visible && !props.user.deleted){
        return (
            <tr>
                <td>
                    <input type='checkbox' nme={props.user.name} style={{cursor:'pointer'}} onChange={(event)=> props.onSelect(event,props.user)} checked={props.user.checked}/>
                </td>
                {
                    props.user.edit &&(
                        <>
                            <td>
                                <input type='text' name='name' defaultValues={props.user.name} onChange={props.handleEdit}/>  
                            </td>

                            <td>
                              <input type='email' name='email' defaultValues={props.user.email} onChange={props.handleEdit}/>  
                            </td>

                            <td>
                              <input type='text' name='role' defaultValues={props.user.role} onChange={props.handleEdit}/>  
                            </td>
                        </>
                   )
                }
                {
                  !props.user.edit && (
                    <>
                        <td>{props.user.name}</td>
                        <td>{props.user.email}</td>
                        <td>{props.user.role}</td>
                    </>
                  )
                }
                {
                    props.user.edit && (
                        <td>
                            <CircularButton content={String.fromCharCode(10003)} isDisabled={false} isSelected={false} onClick={props.onConfirmEdit}/>
                        </td>
                    )
                }
                {
                    !props.user.edit && (
                        <td>

                            <div>
                                <FontAwesomeIcon icon={faEdit} style={{marginRight:'2rem',cursor:'pointer'}} onClick={props.onEditClick}/>
                                <FontAwesomeIcon icon={faTrash} color='red' style={{curor:'pointer'}} onClick={props.onDeleteClick}/>
                            </div>
                        </td>
                    )
                }
            </tr>
        )
    }else{
        return false;
    }

}

export default User;