import { Link } from "react-router-dom";
import { BiFace, BiImageAlt } from "react-icons/bi";
// import "../../styles/Card_model.scss";
import "./Card_model.scss";

function Card_model(props) {
     // const toCanvas = () => {
     //     var url='../images/emma002.jpg'
     //     var canvas = document.querySelector('canvas');
     //     var dataURL = canvas.toDataURL();
     //     console.log(dataURL);
     //     setDataUrl(dataURL)
     //     // var newdata=toDataURL(url, 0.5)
     //     // console.log()
     // }

     // const tryRequire = (path) => {
     //      try {
     //           console.log(path);
     //           return require(`../style/images/${props.elm.name}${props.elm.id}.jpg`).default;
     //      } catch (err) {
     //           return require(`../style/images/fox.png`).default;
     //      }
     // };

     return (
          <div id="Card_model" className="card">
               {/* <Link to={`/employees/${props.elm._id}`}> */}
               {/* <Link to={{ pathname: '/route', state: { foo: 'bar'} }}>My route</Link> */}
               <Link to={{ pathname: `/employees/${props.elm._id}`, state: props.elm }}>
                    <h1>{props.elm.name}</h1>
                    <p>{props.elm._id}</p>
                    <div className="img-wrapper">
                         {/* <img src={tryRequire(`../images/${props.elm.name}${props.elm.id}.jpg`)} alt={`${props.elm.name}'s image`} /> */}
                         {/* <img src={require(`../images/${props.elm.name}${props.elm.id}.jpg`).default} /> */}
                         {props.elm.image.length > 0 ? <img src={props.elm.image} /> : <BiImageAlt />}

                         {/* <img src={require(`../images/${props.elm.name}${props.elm.id}.jpg`).default} /> */}
                    </div>
               </Link>
          </div>
     );
}

export default Card_model;
