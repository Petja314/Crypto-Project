import React, {useEffect} from 'react';
import {Avatar, Box, CircularProgress, Container, Grid, Paper, Typography} from "@mui/material";
import bear from "../../assets/images/news/bearish.jpg"
import bull from "../../assets/images/news/bullish.jpg"
import trend from "../../assets/images/news/trending.jpg"
import latest from "../../assets/images/news/latest.png"
import imgComingSoon from "../../assets/images/news/comingsoon.png"
import {StyledCard} from "../../App";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/ReduxStore";
import {clearNewsDataAC, fetchCryptoNewsThunk, newsDataType, setCurrentPageAC, setIsLoadingAC, setTypeAC} from "../../redux/NewsReducer";
import {ListSkeletonNews} from "../widgets/ListSkeleton";
import stylesSkeleton from "../../css/news/skeleton-news.module.css"
import ParticleBackgroundAnimation from "../hooks/particle-background/ParticleBackgroundAnimation";
import styles from "../../css/news/news.module.css"

type NewsType = {
    type: string,
    image: string,
    value: string
}

/**
 * News Component:
 * Fetches and displays news articles via API calls.
 * Provides the ability to select news types such as bullish, bearish, trending, etc. The selected type is sent to the API to retrieve the latest news data.
 */
const News = () => {
    const {newsData, type, currentPage, isLoading} = useSelector((state: RootState) => state.newsReducer)
    const dispatch: AppDispatch = useDispatch()

    //Array with type of news to select
    const newsType: NewsType[] = [
        {type: "Bearish", image: bear, value: "bearish"},
        {type: "Bullish", image: bull, value: "bullish"},
        {type: "Trending", image: trend, value: "trending"},
        {type: "Latest", image: latest, value: "latest"},
    ]

    //Dispatching the selected type of news to make an API call , reset current page and Loading state to default (page - 1 , loading - true)
    const newsTypeHandler = (value: string) => {
        if (value) {
            dispatch(setTypeAC(value))
            dispatch(clearNewsDataAC())
            dispatch(setCurrentPageAC(1))
            dispatch(setIsLoadingAC(true))
        }
        return;
    }
    //Dispatching next portion of news if type or isLoading state was changed (scroll or type)
    useEffect(() => {
        if (isLoading) {
            dispatch(fetchCryptoNewsThunk({type, currentPage}))
        }
    }, [type, isLoading])


    //Add event listener for a scroll
    useEffect(() => {
        document.addEventListener('scroll', scrollHandler)
        return () => {
            document.removeEventListener('scroll', scrollHandler)
        }
    }, [])
    const scrollHandler = (event: Event) => {
        const target = event.target as any
        const bottomPage: number = target.documentElement.scrollHeight - (target.documentElement.scrollTop + window.innerHeight)
        if (bottomPage < 200) {
            dispatch(setIsLoadingAC(true))
        }
    }


    const descriptionMock: string = 'For detailed information on the latest news, kindly visit the source website by clicking on title. There, you will find comprehensive details regarding the post.'
    const titleMock: string = 'Title is coming soon...'
    return (
        <Box>
            <ParticleBackgroundAnimation/>
            <Container className={styles.container}>
                <Typography variant='h3' className={styles.newsMainTitle}>News</Typography>
                <Box className={styles.newsTypeBox}>
                    {newsType.map((item) => (
                        <Box onClick={() => {
                            newsTypeHandler(item.value)
                        }}
                             sx={{cursor: "pointer", border: item.value === type ? "2px solid #e0f64b" : "" , borderRadius : "20px"}}
                        >
                            <StyledCard>
                                <Typography variant={'h5'} className={styles.newsTypeTitle}>{item.type}</Typography>
                                <Avatar className={styles.newsTypeAvatar} src={item.image}/>
                            </StyledCard>
                        </Box>
                    ))}
                </Box>

                {isLoading ? (
                    <ListSkeletonNews columns={20} skeletonClass={stylesSkeleton.skeletonNews} variant={"rectangle"}/>
                ) : (
                    <>
                        <Grid container spacing={2}>
                            {
                                newsData.map((item: newsDataType, index: number) => (
                                    <Grid item xs={12} md={6}>
                                        <Paper className={styles.paperNewsSection} key={index}>
                                            <Box className={styles.newsContentSection}>
                                                <a href={item.shareURL}>
                                                    <Typography variant='h5' className={styles.newsContentTitle}>
                                                        {item.title !== '' ? item.title : titleMock}
                                                    </Typography>
                                                </a>
                                                <Box className={styles.newsImageBox}>
                                                    <img src={item.imgUrl.includes("undefined") ? imgComingSoon : item.imgUrl} alt="news_image"/>
                                                </Box>
                                                <Box className={styles.newsDescription}>{item.description !== '' ? item.description : descriptionMock}</Box>
                                                <Box className={styles.newsSource}>Source: {item.source}</Box>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                ))
                            }
                        </Grid>

                        <Box className={styles.preLoaderBox}>
                            {!isLoading && <CircularProgress className={styles.preloaderIcon}/>}
                        </Box>
                    </>
                )
                }
            </Container>

        </Box>
    )
};

export default React.memo(News);


