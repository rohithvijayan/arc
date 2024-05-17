const fetchSearch = async ({browseMe}:{browseMe:string})=>{
    const res = await fetch(`https://www.searchapi.io/api/v1/search?engine=google&q=${browseMe}&api_key=provide`,{
      method:'GET',
      headers:{
        'Accept':'application/json'
      }
    });
    const response = await res.json();
    return await response;
  }

export default fetchSearch;
