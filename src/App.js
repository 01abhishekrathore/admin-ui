import React ,{useState ,useEffect}from 'react';
import './App.css';
import config from './config/config';
import axios from 'axios';
import Dashboard from './component/Dashboard/Dashboard';


function App() {
  const [userDetails ,setUserDetails] = useState([]);
  const [error ,setError]  = useState({});

  useEffect(()=>{
    fetchUserData();

  },[]);

  const fetchUserData =async ()=>{
    let response;
    try {
      response = await axios.get(config.base_url);
      if(response.status !== 200){
         throw new Error('Something happend while making api call');
      }

      response.data = response.data.map((item)=>({ ...item , visible:true,checked:false,deleted:false,edit:false

      }));
      setUserDetails(response.data)
      
    } catch (error) {
      const statusCode = error.response.status?error.response.status :400;
      setError({statusCode ,message:error.message}); 
    }
  }

 const searchHandler =(event)=>{
  let searchText = event.target.value.toLowerCase();
  let noOfUsers = [...userDetails];
  let nUserDetails = noOfUsers.map((data)=>{
    if(data.name.toLowerCase().includes(searchText) ||  data.role.toLowerCase().includes(searchText) || data.email.toLowerCase().includes(searchText)){
      return {...data ,visible:true};
    }else{
      return {...data ,visible:false};
    }
  })
  setUserDetails(nUserDetails);
 }

 const editHandler=(user)=>{
  let nthUserDetails = [...userDetails];
  let userIndex = nthUserDetails.indexOf(user);
  nthUserDetails[userIndex].edit = true;
  setUserDetails(nthUserDetails);

 }

 const selectHandler=(event,user)=>{
  let currUser = event.target;
  let nthUserDetails = [...userDetails];
  let userIndex = nthUserDetails.indexOf(user);
  if(currUser.checked){
    nthUserDetails[userIndex].checked =true;
  }else{
    nthUserDetails[userIndex].checked = false;
  }
 setUserDetails(nthUserDetails);
 }

 const deleteHandler=(id)=>{
  let totalData = [...userDetails];
  let nthUserDetails = totalData.map((data)=>{
    if(data.id === id){
      return {...data ,deleted:true}
    }
    return data;
  })

setUserDetails(nthUserDetails);
 }

 const selectAllHandler=(event ,items)=>{
  let curr = event.target;
  let nthUserDetails = [...userDetails];
  if(curr.checked){
    nthUserDetails.forEach((userDetail)=>{
      items.forEach((item)=>{
        if(item.id === userDetail.id){
          userDetail.checked = true;
        }
      })
    })
  }else{
    nthUserDetails.forEach((userDetail)=>{
      items.forEach((item)=>{
        if(item.id === userDetail.id){
          userDetail.checked=false;
        }
      })
    })
  }

  setUserDetails(nthUserDetails);
 }

 const valueEditHandler=(user,editedValues)=>{
  let nthUserDetails = [...userDetails];
  let userIndex = nthUserDetails.indexOf(user);
  if(editedValues['role']){
    nthUserDetails[userIndex].role = editedValues.role;
  }
  if(editedValues['name']){
    nthUserDetails[userIndex].name = editedValues.name;
  }
  
  if(editedValues['email']){
    nthUserDetails[userIndex].email = editedValues.email;
  }
  

  nthUserDetails[userIndex].edit=false;
  setUserDetails(nthUserDetails);

 }
const bunchDeleteHandler=(items)=>{
  let nthUserDetails=[...userDetails];
  nthUserDetails.forEach((userDetail)=>{
    items.forEach((item)=>{
      if(item.id === userDetail.id && item.checked){
        userDetail.deleted=true;
      }
    })
  })
setUserDetails(nthUserDetails);
}

  return (
    <div className='app'>
      {error.message && <h1>{error.message}</h1>}
      {userDetails.length !==0 &&
       <Dashboard 
       onSearch={searchHandler}
       rowLimit={config.row_limit}
       userDetails={userDetails}
       onEdit={editHandler}
       onSelect={selectHandler}
       onDelete={deleteHandler}
       onSelectAll={selectAllHandler}
       onEditValues={valueEditHandler}
       onBunchDelete={bunchDeleteHandler}

       />
      }

    </div>
  );
}

export default App;




