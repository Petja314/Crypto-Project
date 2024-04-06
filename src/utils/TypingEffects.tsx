import React, {useEffect, useMemo, useRef, useState} from 'react';
import {Typography} from "@mui/material";
import styles from "../css/widgets/allocation-chart.module.css";

type  EffectProps = {
    text: string
    speed: number
}
export const TypingEffects = ({text, speed}: EffectProps) => {
    const [displayText, setDisplayText] = useState<string>('');
    useEffect(() => {
        let currentIndex : number = 0;
        const intervalId = setInterval(() => {
            setDisplayText( text.slice(0, currentIndex + 1));
            currentIndex += 1;

            if (currentIndex === text.length) {
                clearInterval(intervalId);
            }
        }, speed);

        return () => clearInterval(intervalId);
    }, [text, speed]);
    return (
        <Typography className={styles.chartDescription}>
            {displayText}
        </Typography>
    )
};

