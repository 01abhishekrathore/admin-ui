const TableHeading = (props)=>{
    return(
        <thead>
            <tr>
                <th>
                    <input type='checkbox' name='selectAll'  checked={props.getAllSelectedFlag()} style={{cursor:'pointer'}} onchange={(event)=>{props.onSelectAll(event , props.getItemsPerPage())}}/>
                 </th>
                 <th>Name</th>
                 <th>Email</th>
                 <th>Role</th>
                 <th>Actions</th>
            </tr>
        </thead>
    )
}

export default TableHeading;