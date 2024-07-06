import React, { Component, useState, useEffect } from "react"
import Header from '../../components/Header/Header';
import Content from './Content';
import Footer from '../../components/Footer/Footer';

class ManagePool extends Component {
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

export default ManagePool