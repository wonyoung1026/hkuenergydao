import React from "react";

function Content() {
    return (
        <div>
            <div className="container content">
                <div className="row">
                    <div className="col-sm-6 talk">
                        <h1>ENER DAO</h1>
                        <br />
                        <h6 className="bold-four" style={{ lineHeight: 1.6 }}>
                        Welcome to <b>ENER DAO</b>, a pioneering community dedicated to transforming traditional energy systems into efficient, transparent, and decentralized models. Leveraging blockchain technology, <b>ENER DAO</b> empowers members to invest in renewable energy assets and earn rewards, supporting sustainable and equitable energy distribution. Join us today in driving the global transition towards a cleaner, greener future and realizing the benefits of energy autonomy.
                    </h6>
                        <br />
                        <h6><a className="btn btn-dark start start-two" href="https://app.aragon.org/#/daos/polygon/0xb5499a94970440b6d6894fa26da3bf1c258fccd8">Check out DAO</a></h6>
                    </div>
                    <div className="col-sm-6 showcase-img">
                        
                    </div>
                </div>
            </div>

            <section className="features-icons bg-light text-center det-ails">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                <div className="features-icons-icon d-flex  icon-bra-ails">
                                    <i className="icon-screen-desktop m-auto text-primary icon-ails"></i>
                                </div>
                                <h5>Global Green Energy Investment</h5>
                                <p>Through ENER DAO, our community can easily access rewarding returns from renewable energy assets of wind, solar, and hydroelectric power etc.</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                <div className="features-icons-icon d-flex  icon-bra-ails">
                                    <i className="icon-layers m-auto text-primary icon-ails"></i>
                                </div>
                                <h5>Climate Change Mitigation</h5>
                                <p>Carbon neutrality is essential. ENER DAO provides state-of-the-art mechanisms to mitigate climate risks through innovative renewable energy investments.</p>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="features-icons-item mx-auto mb-0 mb-lg-3">
                                <div className="features-icons-icon d-flex  icon-bra-ails">
                                    <i className="icon-check m-auto text-primary icon-ails"></i>
                                </div>
                                <h5>Promoting Energy Autonomy</h5>
                                <p>ENER DAO builds a truly decentralized platform to support renewable energy, ensuring sustainable and equitable distribution within our community.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Content;