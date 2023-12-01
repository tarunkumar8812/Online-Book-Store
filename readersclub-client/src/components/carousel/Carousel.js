import { useEffect, useState } from 'react'
import { arr } from '../../staticData/data'
import './carousel.css'
const Carousel = ({ index }) => {

    // const arr = [
    //     { name: "first", desc: "first img desc", imgSrc: "https://www.bookswagon.com/bannerimages/86_inr.jpg?v=2.5" },
    //     { name: "second", desc: "second img desc", imgSrc: "https://www.bookswagon.com/bannerimages/88_inr.jpg" },
    //     { name: "third", desc: "third img desc", imgSrc: "https://www.bookswagon.com/bannerimages/80_inr.jpg?v=2.1" },
    //     { name: "fourth", desc: "fourth img desc", imgSrc: "https://www.bookswagon.com/bannerimages/79_inr.jpg?v=2.5" },
    //     { name: "fifth", desc: "fifth img desc", imgSrc: "https://bc-img.s3.ap-south-1.amazonaws.com/web_banners/2023090261162.webp" }
    // ]

    let [display, setDisplay] = useState(index || 0)

    const handleArrowClick = (direction) => {
        if (direction === "l") {
            display >= 1 ? setDisplay(display - 1) : setDisplay(arr.length - 1)
        } else {
            setDisplay((display + 1) % (arr.length))
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            handleArrowClick("r")
        }, 5000)

        return (() => {
            clearTimeout(timer)
        })
    }, [display])


    return (
        <>
            <div className='carousel'>

                {/* ------------ images ----------- */}

                <div className='main-slide'>
                    <div className='imgBox'>
                        {arr.map((images, i) => {
                            return (<>
                                <img key={images.name} className={i === display ? "carousel-img" : "hide"} src={images.imgSrc} alt='iSrc' />
                                {/* <lable className="lab">{arr[display].desc}</lable> */}
                            </>)
                        })}


                    </div>


                    {/* ------------ arrows ----------- */}
                    <div className='arrows'>
                        <div className='l-arrow arrow' onClick={() => { handleArrowClick("l") }}>
                            <img src='https://cdn-icons-png.flaticon.com/512/271/271220.png' alt='abcg'></img>
                        </div>
                        <div className='r-arrow arrow' onClick={() => { handleArrowClick("r") }}>
                            <img src='https://cdn-icons-png.flaticon.com/512/32/32213.png' alt='abcg'></img>
                        </div>
                    </div>

                    {/* ------------ bottom dots ----------- */}
                    <div className='dots'>
                        {
                            arr.map((item, index) => {
                                return (
                                    <div
                                        className={index === display ? "active-dot" : "dot"}
                                        key={index}
                                    ></div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Carousel