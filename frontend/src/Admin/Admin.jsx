import {useState,useContext} from "react"
import axios from "axios"
import Admin1 from "./Admin1"

export default function Admin({sendToparent}){

    const [carouselDetails,setCarouselDetails] = useState({
        title:'',
        action:false,
        crime:false,
        thriller:false,
        comedy:false,
        date:0,
        duration:'',
        movieType:'',
        director:'',
        stars:'',
        theme:'',
        image:''
    })

    const api = "http://localhost:5000/display"

    function oc(e){
        const {name,value,type,files,checked} = e.target
        setCarouselDetails(prev =>({
            ...prev,
            [name]:type==="checkbox"? checked :type === "file" ? files[0] : value
        }))
    }

   async function os(e){
    e.preventDefault();
    try{
        const formData = new FormData()
        for (const key in carouselDetails){
            formData.append(key,carouselDetails[key])
        }

        const res = await axios.post(`${api}/dis`,formData,{
            headers:{
                "Content-Type":"multipart/form-data"
            }
        })

        // setCarouselGlobal(prev => ([...prev,res.data]))
        console.log(res.data.message)
    }
    catch(error){
        console.log(error)
    }

    }

function sendData(){
    sendToparent(null)
}

    return(
        <>         
          <div className="text-light col-lg-10 col-md-10 mx-auto" style={{backgroundColor:"rgba(205, 91, 91, 0.3)"}}>
            <div className="carousel-inp-con  px-4 py-2 rounded-3" style={{boxShadow:"2px 2px 10px black"}}>
            <h5 className="text-center">carousel item</h5>
             movie title : <input type="text" name="title" onChange={oc} value={carouselDetails.title}/> <br />
             action: <input type="checkbox" name="action" onChange={oc} checked={carouselDetails.action} /><br />
             crime:<input type="checkbox" name="crime" onChange={oc} checked={carouselDetails.crime}/><br />
             thriller:<input type="checkbox" name="thriller" onChange={oc} checked={carouselDetails.thriller}/><br />
             comedy:<input type="checkbox" name="comedy" onChange={oc} checked={carouselDetails.comedy}/><br />
             date: <input type="number" name="date" onChange={oc} value={carouselDetails.date}/><br />
             duration: <input type="text" name="duration" onChange={oc} value={carouselDetails.duration}/><br />
             <select name="movieType" onChange={oc} id="" value={carouselDetails.movieType}>
                <option value="pg">pg</option>
                <option value="pg-13">pg-13</option>
             </select><br />

             director: <input type="text" name="director" id="" onChange={oc} value={carouselDetails.director}/><br />
             stars: <input type="text" name="stars" onChange={oc} value={carouselDetails.stars}/><br />
             theme: <input type="text"  name="theme" onChange={oc} value={carouselDetails.theme}/><br />
             bgimage: <input type="file"  name="image" onChange={oc}/><br />
             <div className="d-flex">
               <button className="btn btn-danger px-4 py-1 mt-4 ms-auto" onClick={os}>Add</button><br />
             </div>
          </div>      
            </div> 
</>

    )
}