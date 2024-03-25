import React, {useEffect, useState} from 'react';
import styles from "../css/transition/transition.module.css"
import {useLocation} from "react-router-dom";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const FadeTransition = ({children} : any) => {
    const location = useLocation()
    const [key,setKey] = useState('')

    // const handlerLocationChange = () => {
    //     // debugger // doesn't work
    //     setKey(location.pathname)
    // }
    console.log('key : ' , key) //empty
    // console.log('location.pathname : ' , location.pathname)

    useEffect(() => {
        setKey(location.pathname)
    },[location])


    return (
        <TransitionGroup>
            <CSSTransition
                key={key}
                timeout={500}
                classNames={{
                    enter: styles.fadeEnter,
                    enterActive: styles.fadeEnterActive,
                    exit: styles.fadeExit,
                    exitActive: styles.fadeExitActive,
                }}
                unmountOnExit
                // onEnter={() => handlerLocationChange()}
            >
                {children}
            </CSSTransition>
        </TransitionGroup>
    );
};

export default FadeTransition;