import React, {useEffect} from 'react';
import {Avatar, Box, CircularProgress, Container, Grid, Paper, Skeleton, Typography} from "@mui/material";
import bear from "../../assets/images/news/bearish.jpg"
import bull from "../../assets/images/news/bullish.jpg"
import trend from "../../assets/images/news/trending.jpg"
import latest from "../../assets/images/news/latest.png"
import imgComingSoon from "../../assets/images/news/comingsoon.png"
import {StyledCard} from "../../App";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../redux/ReduxStore";
import {clearNewsDataAC, fetchCryptoNewsThunk, newsDataType, setCurrentPageAC, setIsLoadingAC, setTypeAC} from "../../redux/NewsReducer";
import {ListSkeleton, ListSkeletonNews} from "../widgets/ListSkeleton";
import styles from "../../css/news/skeleton-news.module.css"
import ParticleBackgroundAnimation from "../hooks/particle-background/ParticleBackgroundAnimation";


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
            <Container
                sx={{marginBottom: "50px"}}
            >
                <Typography variant='h3' sx={{marginTop: "50px", marginBottom: "20px", color: "#fff", textAlign: "center"}}>News</Typography>

                <Box sx={{display: "flex", justifyContent: "space-between",flexWrap : "wrap" , gap : 3 ,marginBottom: "40px"}}>
                    {newsType.map((item) => (
                        <Box
                            onClick={() => {
                                newsTypeHandler(item.value)
                            }}
                            sx={{
                                cursor: "pointer",
                                border: item.value === type ? "2px solid #e0f64b" : ""
                            }}>
                            <StyledCard>
                                <Typography variant={'h5'} sx={{textAlign: "center", marginBottom: "10px"}}>{item.type}</Typography>
                                <Avatar sx={{width: "100px", height: "100px"}} src={item.image}/>
                            </StyledCard>
                        </Box>
                    ))}
                </Box>

                {isLoading ? (
                            <ListSkeletonNews columns={20} skeletonClass={styles.skeletonNews} variant={"rectangle"}/>
                ) : (
                    <>
                        <Grid container spacing={2}>
                            {
                                newsData.map((item: newsDataType, index: number) => (
                                    <Grid item xs={12} md={6}> {/* Assuming you want this item to span the full width */}
                                        <Paper sx={{borderRadius: '20px', marginBottom: "30px", height: {md : "650px" , xs : "auto"}, position: "relative"}} key={index}>
                                            <Box sx={{display: "flex", flexDirection: "column", gap: 3,}}>
                                                <a href={item.shareURL} style={{textDecoration: "none", color: "black"}}>
                                                    <Typography variant='h5'
                                                                sx={{
                                                                    fontWeight: "bold",
                                                                    backgroundColor: "#e0f64b",
                                                                    color: "black",
                                                                    padding: "3px",
                                                                    borderRadius: "5px",
                                                                    textAlign: "center",
                                                                }}>
                                                        {item.title !== '' ? item.title : titleMock}
                                                    </Typography>
                                                </a>
                                                <Box sx={{overflow: 'hidden', width: '100%', borderRadius: '10px', border: "2px solid #e0f64b", margin: "0 auto"}}>
                                                    <img src={item.imgUrl.includes("undefined") ? imgComingSoon : item.imgUrl} alt=""
                                                         style={{width: "100%", height: "250px", objectFit: "cover", borderRadius: '10px'}}/>
                                                </Box>
                                                <Box sx={{marginBottom : "40px"}} >{item.description !== '' ? item.description : descriptionMock}</Box>

                                                <Box sx={{position: "absolute", bottom: "20px"}}>Source: {item.source}</Box>
                                            </Box>
                                        </Paper>
                                    </Grid>
                                ))
                            }
                        </Grid>


                        <Box sx={{display: "flex", justifyContent: "center"}}>
                            {isLoading && <CircularProgress sx={{width: "80px !important", height: "80px  !important"}}/>}
                        </Box>
                    </>
                )
                }
            </Container>

        </Box>
    )
};

export default React.memo(News);


// <Grid container>
//     {/*<Grid item sx={{display: "flex", justifyContent: "space-between", gap: 10}}>*/}
//     <Grid item sx={{display: "flex", justifyContent: "space-between", gap: 10}}>
//         <Box sx={{
//             // position: 'relative',
//             overflow: 'hidden',
//             width: '400px',
//             maxWidth: '100%',
//             height: '250px',
//             borderRadius: '10px',
//             border: "2px solid #e0f64b",
//             marginTop : "30px"
//         }}>
//             <img
//                 src={item.imgUrl.includes("undefined") ? imgComingSoon : item.imgUrl}
//                 alt=""
//                 style={{width: '100%', height: '100%', objectFit: 'cover', borderRadius: '10px'}}
//             />
//         </Box>
//         {/*width : "50%"*/}
//         <Box sx={{width: "50%", position: "relative" , marginBottom : "20px" }}>
//             <a href={item.shareURL} style={{textDecoration: "none", color: "black"}}>
//                 <Typography variant='h5'
//                             sx={{
//                                 marginBottom: "20px", fontWeight: "bold",
//                                 backgroundColor: "#e0f64b", color: "black", padding: "3px", borderRadius: "5px", textAlign: "center"
//                             }}>
//                     {item.title !== '' ? item.title : titleMock}
//                 </Typography>
//             </a>
//
//             <Box>{item.description !== '' ? item.description : descriptionMock}</Box>
//
//             <Box sx={{position: "absolute", bottom: "5px", right: "20px"}}>
//                 Source: {item.source}
//             </Box>
//         </Box>
//
//
//     </Grid>
// </Grid>


