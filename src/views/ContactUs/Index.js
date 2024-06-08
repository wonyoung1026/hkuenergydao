import React, { Component } from "react"
// import logo from '../../components/Logo/logo.svg';

import Header from '../../components/Header/Header';
import Content from './Content';
import Footer from '../../components/Footer/Footer';

class Governance extends Component {
    render() {
        return (
            <div className="main-container">
                <Header />
                <Content />
                <Footer />
            </div>

        )
    }
}

export default Governance;