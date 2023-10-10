import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom"
import { fetchDataFromApi } from "./utils/api"

import { useSelector, useDispatch } from 'react-redux'
import { getApiConfiguration,getGenres } from './store/homeSlice'
import Footer from './components/footer/Footer'
import Home from './pages/home/Home'
import SearchForResult from './pages/searchResult/SearchResult'
import Explore from './pages/explore/Explore'
import PageNotFound from './pages/404/PageNotFound'
import Header from './components/header/Header'
import Details from './pages/details/Details'


function App() {
    const dispatch = useDispatch()
    const {url} = useSelector((state)=>state.home)

    useEffect(() => {fetchApiConfiq();genersCall()}, []);

    const fetchApiConfiq = () => {
        fetchDataFromApi('/configuration')
            .then((res) => { 
                console.log(res);
                
                const url = {
                    backdrop: res.images.secure_base_url + "original",
                    poster: res.images.secure_base_url + "original",
                    profile: res.images.secure_base_url + "original",
                };
                
                dispatch(getApiConfiguration(url));
            })
    }

    const genersCall = async ()=>{
        let promises = [];
        let endPoints = ["tv","movie"];
        let allGeneres = {}

        endPoints.forEach((url)=>{
            promises.push(fetchDataFromApi(`/genre/${url}/list`))
        });

        const data  = await Promise.all(promises);
        data.map(({genres})=>{
            return (
                genres.map((item)=>{
                    allGeneres[item.id] = item;
                })
            )
        })
        console.log(allGeneres);

        console.log(data);
        dispatch(getGenres(allGeneres));
    }
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path="/:mediaType/:id" element={<Details />} />
                <Route path="/search/:query" element={<SearchForResult />} />
                <Route path="/explore/:mediaType" element={<Explore />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App
