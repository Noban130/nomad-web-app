import React, { useEffect, useState } from 'react'
import CountryFlag from './CountryFlag'
import CountryMap from './CountryMap'
import { FranceFlag } from '../../../api/CountriesFlags'
import { useContextApi } from '../../../api/ContextApi'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const VisitedCountriesList = () => {
    const [SlidePerView, setSlidePerView] = useState(8)
    let state = useContextApi()
    let [Colors] = state.Colors
    let styles = style(Colors)

    let windowSize = () => {
        let WindowWidth = window.innerWidth
        let slide = WindowWidth > 1000 ? 8 : (WindowWidth < 1000 && WindowWidth > 700) ? 6 : 4
        setSlidePerView(slide)
    }

    window.addEventListener('resize', () => {
        windowSize()
    })

    useEffect(() => {
        windowSize()
    }, [])

    let slides = new Array(20).fill(0)
    
    return (
        <div style={styles.container}>            
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={20}
                slidesPerView={SlidePerView}
                scrollbar={{ draggable: true }}
                style={styles.horizontalScrollView}
            >
                {
                    slides.map((slide, i) => {
                        return (
                            <SwiperSlide key={i} styles={styles}>
                                <Item styles={styles} />
                            </SwiperSlide>
                        )
                    })
                }
            </Swiper>

            <CountryFlag />
            <CountryMap />
        </div>
    )
}

let Item = ({ styles, active }) => {
    return (
        <button style={!active ? styles.itemContainer : styles.activeItemContainer}>
            <FranceFlag width={20} height={15} />
            <p style={styles.text}>united state</p>
        </button>
    )
}

let style = (Colors) => {
    
    return {
        container: {
            width: '100%',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        },
        horizontalScrollView: {
            marginTop: 0,
            marginBottom: 20,
            marginLeft: 'auto',
            marginRight: 'auto',

            width: '100%',
            maxWidth: 700,
            display: 'flex',
            justifyContent: 'flex-start',
            flexDirection: 'row',

            overflow: 'hidden',
            userSelect: 'none',
        },
    
        itemContainer: {
            marginRight: 10,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 15,
            paddingBottom: 15,
            
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            
            borderRadius: 8,
        },
        activeItemContainer: {
            marginRight: 10,
            paddingLeft: 10,
            paddingRight: 10,
            paddingTop: 15,
            paddingBottom: 15,
            
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            
            borderRadius: 8,
            backgroundColor: Colors.transparentBlack,
        },
        flag: {
            width: 20,
            height: 15,
            objectFit: 'contain',
        },
        text: {
            marginTop: 3,
            
            fontFamily: 'Poppins',
            fontWeight: 300,
            color: Colors.black,
            fontSize: 12,
            textAlign: 'center',
        },
    }
}

export default VisitedCountriesList