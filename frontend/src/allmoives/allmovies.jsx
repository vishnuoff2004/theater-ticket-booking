// import React, { useEffect,useState,useContext } from 'react'
// import "./allmovies.css"
// import axios from "axios"
// import {MovieContext} from "../contextApi/MovieProvider"
// import {useNavigate} from "react-router-dom"

// export  default function Allmovies(){

//     const [allMovies,setAllMovies] = useState([])
//     const [rating,setRating] = useState(null)
//     const [inpRating,setInpRating] = useState(0)
//         const navigate = useNavigate()


//     const {movies} = useContext(MovieContext)

//     const api = "http://localhost:5000"

//     useEffect( ()=>{
//       getData()
//     },[])

//     async function getData(){
//      try{
//         let res = await axios.get(`${api}/movies/fetch`)
//         setAllMovies(res.data.movie)
//      } 
//      catch(error){
//         if(error.response.data){
//             console.log(error.response.data.message)
//         }
//      }
//     }
//     console.log(allMovies)


//    async function likeChange(id,like){
//         const res = await axios.put(`${api}/movies/movie/${id}`,{like})

//         setAllMovies(prev => prev.map(i => (i.movie._id === id ? {...i,movie:res.data.updateMovie}:i )))
//     }


//     function ratings(id){
//         if(rating == null){
//            setRating(id)
//         }
//         else{
//            setRating(null)
//         }
//     }

//     async function rateHandling(id){
//      try{
//         if(!inpRating){
//             alert("plz rate out of 10")
//         }
//         let res = await axios.put(`${api}/movies/rating/${id}`,{inpRating})
//         console.log(res.data.movies)
//      }
//      catch(error){
//         console.log(error)
//      }
        
//     }

//     function choosedMovie(item){
//         movies(item)
//         navigate("/selected")
//     }


//   return (
//        <>

//        <div className="container-fluid mt-5">
//             <div className="container">
//                 <div className="col">
//                     <div className="row">
//                         <h3>Our Movies Collection</h3>

//                            {
//                             allMovies.map((item,index)=>(
//                         <div className="col col-lg-2 col-md-3 col-sm-4 my-2 " key={index} onClick={()=>(choosedMovie(item))}>
//                             <div className="card bg-dark theater-card" style={{maxHeight:"",maxWidth:""}} >
//                                 <img src={`http://localhost:5000/movieImages/${item.image}`} alt="" className='card-img-top theater-card-img'/>
//                                 <div className="card-body text-light fw-bold">
//                                     <h5 className='card-title '>{item.movie_name}</h5>
//                                     <div className='d-flex justify-content-between ' style={{height:'20px'}}>
//                                     <p className='small' onClick={()=>(ratings(item.movie._id))}><ion-icon name="star" className="gold me-1"></ion-icon>{item.ratings}/10</p>
//                                     <p className='small' onClick={()=>(likeChange(item.movie?._id,item.movie?.like))}><ion-icon name="thumbs-up-outline" className="gold me-1 "></ion-icon>{item.like}</p>
//                                     </div>
//                                     {
//                                         rating && 
//                                         rating === item._id ? 
//                                         <div className=''> 
//                                         <p className='pb-1 m-0'>rate out of 10</p> 
//                                         <div className='d-flex justify-content-between gap-2'>
//                                         <input type="number" max={10} className='w-50' onChange={(e)=>(setInpRating(e.target.value))} value={inpRating}/> 
//                                         <button className='fw-bold' style={{backgroundColor:'gold'}} onClick={()=>(rateHandling(item._id,item.ratings))}>submit</button>
//                                         </div>
//                                         </div> : ""
//                                     }
//                                 </div>
//                             </div>
//                         </div>

//                             ))
//                            }
//                         </div>

//                 </div>
//             </div>
//        </div>
//        </>
//   )
// }

import React, { useEffect, useState, useContext } from 'react'
import "./allmovies.css"
import axios from "axios"
import { MovieContext } from "../contextApi/MovieProvider"
import { useNavigate } from "react-router-dom"

export default function Allmovies(){

    const [allMovies, setAllMovies] = useState([]);

    const { movies, searchQuery } = useContext(MovieContext); // ⭐ Read search text
    const navigate = useNavigate();

    const api = "http://localhost:5000";

    useEffect(() => { getData(); }, []);

    async function getData(){
        try{
            let res = await axios.get(`${api}/movies/fetch`);
            setAllMovies(res.data.movie);
        } catch(error){
            console.log(error.response?.data?.message);
        }
    }

    // ⭐ Filter Movies
    const filteredMovies = allMovies.filter(item =>
        item.movie_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    function choosedMovie(item){
        movies(item);
        navigate("/selected");
    }

    return (
        <div className="container-fluid mt-5">
            <div className="container">
                <h3>Our Movies Collection</h3>

                <div className="row">
                    {filteredMovies.map((item, index) => (
                        <div
                            className="col col-lg-2 col-md-3 col-sm-4 my-2"
                            key={index}
                            onClick={() => choosedMovie(item)}
                        >
                            <div className="card bg-dark theater-card">
                                <img 
                                    src={`http://localhost:5000/movieImages/${item.image}`} 
                                    className='card-img-top theater-card-img'
                                />
                                <div className="card-body text-light fw-bold">
                                    <h5>{item.movie_name}</h5>
                                </div>
                            </div>
                        </div>
                    ))}

                    {filteredMovies.length === 0 && (
                        <p className="text-center text-light mt-3">No movies found 😞</p>
                    )}
                </div>
            </div>
        </div>
    )
}

