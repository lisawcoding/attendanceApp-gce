function Card_model({elm, Link, IconImage, IconSchedule, IconUserPin}) {

     return (
          <div id="Card_model" className="card">
               <h1>{elm.name}</h1>
               <p>{elm._id}</p>
               <div className="img-wrapper">
                    {elm.image && elm.image.length > 0 ? <img src={elm.image} /> : <IconImage />}
               </div>
               <div className="icon-div">
                    <Link to={{ pathname: `/employees/edit/${elm._id}/records`, state: elm }}><IconSchedule/></Link>
                    <Link to={{ pathname: `/employees/edit/${elm._id}`, state: elm }}><IconUserPin/></Link>
               </div>
          </div>
     );
}

export default Card_model;