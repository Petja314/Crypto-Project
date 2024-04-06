import {Grid, Skeleton} from "@mui/material";
import React from "react";

export const ListSkeleton = ({columns , skeletonClass , variant }: any) => {
    return (
        <>
            {Array(columns)
                .fill(1)
                .map((card,index) => (
                    <Skeleton
                        animation="wave"
                        variant={variant}
                        key={index}
                        className={skeletonClass}
                    />
                ))

            }
        </>
    )
}

export const ListSkeletonNews = ({columns , skeletonClass , variant }: any) => {
    return (
        <>
            <Grid container spacing={2}>
                {Array(columns)
                    .fill(1)
                    .map((card,index) => (
                        <Grid key={index} item xs={12} md={6}> {/* Assuming you want this item to span the full width */}
                            <Skeleton
                                animation="wave"
                                variant={variant}
                                key={index}
                                className={skeletonClass}
                            />
                        </Grid>

                    ))

                }

            </Grid>

        </>

    )
}