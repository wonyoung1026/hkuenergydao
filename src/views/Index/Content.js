import React from "react";

function Content() {
    return (
        <div>
            <div className="container content">
                <div className="row">
                    <div className="col-sm-6 talk">
                        <h1>Energy DAO</h1>
                        <br />
                        <h6 className="bold-four">
                        <b>Energy DAO</b> is a community that aims to reimagine the traditional universal basic income (UBI) model by leveraging renewable energy sources as its backbone. <b>Energy DAO</b> ensures fair and sustainable distribution of resources such as wind, solar, and hydroelectric energy. Through our transformative ecosystem, we hope to not only address income inequality but also accelerate the global transition towards a cleaner, greener future.
                    </h6>
                        <br />
                        <h6><a className="btn btn-dark start start-two" href="https://app.aragon.org/#/daos/polygon/0xb5499a94970440b6d6894fa26da3bf1c258fccd8">Check out DAO</a></h6>
                    </div>
                    <div className="col-sm-6 showcase-img">
                        
                    </div>
                </div>
            </div>

            <section class="features-icons bg-light text-center det-ails">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-4">
                            <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                <div class="features-icons-icon d-flex  icon-bra-ails">
                                    <i class="icon-screen-desktop m-auto text-primary icon-ails"></i>
                                </div>
                                <h5>Placeholder</h5>
                                <p class="lead mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                <div class="features-icons-icon d-flex  icon-bra-ails">
                                    <i class="icon-layers m-auto text-primary icon-ails"></i>
                                </div>
                                <h5>Placeholder</h5>
                                <p class="lead mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            </div>
                        </div>
                        <div class="col-lg-4">
                            <div class="features-icons-item mx-auto mb-0 mb-lg-3">
                                <div class="features-icons-icon d-flex  icon-bra-ails">
                                    <i class="icon-check m-auto text-primary icon-ails"></i>
                                </div>
                                <h5>Placeholder</h5>
                                <p class="lead mb-0">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Content;