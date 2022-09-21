import classes from './searchBar.module.css';

const SearchBar = (props)=>{
    return (
     <div>
        <input type='text' className={classes.search}  onChange={props.onChange}/>
     </div>
    );
}

export default SearchBar;