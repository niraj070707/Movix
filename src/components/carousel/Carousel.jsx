import React, { useRef } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";

import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import "./style.scss";
import Img from "../lazyLoadImage/img";


const Carousel = ( {data,loading,endpoint} ) => {
    const carouselContainer = useRef();
    const {url} = useSelector((state)=>state.home);
    const navigate = useNavigate();
    
    const Navigation = (dir)=>{
        const container = carouselContainer.current;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    }

    const Sktype = ()=>{
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton">
                    <div className="textBlock">
                        <div className="title skeleton"></div>
                        <div className="date skeleton"></div>
                    </div>
                    
                </div>
            </div>
        )
    }
    return (
        <div className="carousel">
            <ContentWrapper>
                <BsFillArrowLeftCircleFill className="carouselLeftNav arrow" onClick={()=>Navigation("left")} />
                <BsFillArrowRightCircleFill className="carouselRighttNav arrow" onClick={()=>Navigation("right")} />

                {!loading ? (
                    <div className="carouselItems" ref={carouselContainer}>
                        {data?.map((item)=>{
                            const posterurl = item.poster_path ? url.poster+item.poster_path : PosterFallback;
                            return (
                                <div key = {item.id} className="carouselItem " onClick={()=>{
                                    navigate(`/${item.media_type || endpoint}/${item.id}`)
                                }}>
                                    <div className="posterBlock">
                                        <Img src={posterurl} alt="" />
                                        <CircleRating rating={item.vote_average.toFixed(1)}/>
                                        <Genres data = {item.genre_ids.slice(0,2)} />
                                    </div>
                                    <div className="textBlock">
                                        <div className="title">
                                            {item.title || item.name}
                                        </div>
                                        <div className="date">
                                            {dayjs(item.release_date).format("MMM ,D YYYY")}
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) : (
                    <div className="loadingSkeleton">
                        {Sktype()}
                        {Sktype()}
                        {Sktype()}
                        {Sktype()}
                        {Sktype()}
                        {Sktype()}
                        {Sktype()}
                    </div>
                )}
            </ContentWrapper>

        </div>
    )
}

export default Carousel