const Filter = ( {filterHandler} ) => {
	return (
	  <form>
		<div>
		  filter shown with: <input onChange={filterHandler}/>
		</div>
	  </form>
	)
}

export default Filter