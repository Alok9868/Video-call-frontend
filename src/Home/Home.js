import React ,{useEffect} from "react";
import Header from "./Header/Header.jsx";
import Container from "./Container/Container.jsx";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import './Home.css';
import {setIsRoomHost} from '../store/actions';
import store from '../store/store'

const Home = ({signin}) =>
{

    useEffect(() => {
        store.dispatch(setIsRoomHost(false));
       
    }, [])

    return(
        <>
        <Header
        signin={signin}
        />
        <Container/>
        </>
    );
}
export default Home;