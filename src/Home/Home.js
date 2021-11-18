import React from "react";
import Header from "./Header/Header.jsx";
import Container from "./Container/Container.jsx";
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/bootstrap/dist/js/bootstrap.min.js';
import './Home.css'
const Home = ({signin}) =>
{
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