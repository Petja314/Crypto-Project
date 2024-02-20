import React from 'react';
import {Paper, Button} from '@mui/material'
import Carousel from "react-material-ui-carousel";


const CarouselMui = () => {
    const items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        }
    ]

    return (
        <Carousel
        sx={{
            border : "2px solid #333",
            borderRadius : "12px",
            height : "100%",

        }}
        >
            {
                items.map((item, i) => <Item key={i} item={item}/>)
            }
        </Carousel>
    )
};
export default CarouselMui;


export const Item = (props: any) => {
    return (
        <Paper>
            <h2>{props.item.name}</h2>
            <p>{props.item.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}
