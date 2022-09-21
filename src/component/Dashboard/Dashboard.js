import classes from './dashboard.module.css';
import React ,{useState ,useEffect} from 'react';
import config from '../../config/config';
import ActionButton from '../ActionItems/ActionButton/ActionButton';
import SearchBar from '../ActionItems/Search/SearchBar';
import Table from '../ActionItems/Table';

const Dashboard = (props)=>{

    const [currentPageIndex ,setCurrentPageIndex] = useState(1);
    const [noOfPages ,setNoOfPages] = useState(1);
    const [pageLimit ,setPageLimit] = useState(1);

    useEffect(()=>{
        let totalUser = props.userDetails.reduce((total,user)=>{
            if(user.visible && !user.deleted){
                return (total +=1);
            }
            return total
        },0);

       let totalPages = Math.ceil(totalUser/props.rowLimit);
       setNoOfPages(totalPages);
       if(totalPages<=config.page_limit){
        if(totalPages<=0) totalPages =1;
        setPageLimit(totalPages);
        return ;

       }
       setPageLimit(config.page_limit);

    },[props.rowLimit, props.userDetails]);


    const getToFirstPage = ()=>{
        setCurrentPageIndex(1);
    }

    const moveToPage=(event)=>{
        event.preventDefault();
        setCurrentPageIndex(Number(event.target.innerText));

    }

    const getToLastPage=()=>{
        setCurrentPageIndex(noOfPages);
    }

    const getToNextPage=()=>{
        setCurrentPageIndex((prevIndex)=> prevIndex+1);
    }

    const getToPreviousPage=()=>{
        setCurrentPageIndex((curIndex)=>curIndex-1);
    }

    const getPaginationCluster=()=>{
        let startValue = Math.floor((currentPageIndex-1)/pageLimit)*pageLimit;
        const paginationCluster = [];

        for(let index=0; index<pageLimit;index++){
            let val =index+startValue+1;
            paginationCluster.push(val);
        }

        if(paginationCluster.at(0)>noOfPages){
            if(startValue<=0){
                return paginationCluster;
            }
            setCurrentPageIndex(startValue)
        }
        return paginationCluster;
    }

    const getItemsPerPage=()=>{
          const noOfData = props.userDetails.filter((user)=>user.visible && !user.deleted);
          let startIndex = currentPageIndex*props.rowLimit-props.rowLimit;
          return noOfData.splice(startIndex ,props.rowLimit);
    }

    const getSelectedCount=()=>{
        const usersVisible = getItemsPerPage();
        let flag = usersVisible.every((user)=> !user.checked);
        return flag;
    }

    const getAllSelectedFlag=()=>{
        const usersVisible = getItemsPerPage();
        let flag = usersVisible.every((user)=> user.checked);
        return flag;

    }

    return (
        <div className={classes.dashboardContainer}>

            <SearchBar onChange={props.onSearch}/>

            <Table
              getAllSelectedFlag={getAllSelectedFlag}
              onDelete={props.onDelete}
              onEditValues={props.onEditValues}
              onSelectAll={props.onSelectAll}
              getItemsPerPage={getItemsPerPage}
              onSelect={props.onSelect}
              onEdit={props.onEdit}
            />

            <ActionButton
             currentPageIndex={currentPageIndex}
             getSelectedCount={getSelectedCount}
             getPaginationCluster={getPaginationCluster}
             onBunchDelete={props.onBunchDelete.bind(null,getItemsPerPage())}
             noOfPages={noOfPages}
             getToFirstPage={getToFirstPage}
             getToPreviousPage={getToPreviousPage}
             moveToPage={moveToPage}
             getToNextPage={getToNextPage}
             getToLastPage={getToLastPage}
            />


        </div>
    );
}

export default Dashboard;