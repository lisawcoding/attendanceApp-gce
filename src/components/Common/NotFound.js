import "./NotFound.scss"
function NotFound(props) {
     const clickBackBtn = () => {
          props.history.goBack()
     }

     return (
          <main id="NotFound">
               <h1> 404 Error.</h1>
               <p> We can't find the page you're looking for.</p>
               <button onClick={clickBackBtn}>Back</button>
          </main>          
     )
}

export default NotFound;
