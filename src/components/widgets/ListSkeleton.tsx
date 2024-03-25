import {Skeleton} from "@mui/material";
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