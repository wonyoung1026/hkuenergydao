import React from "react";

function Content() {
    return (
        <div>
            <div className="container content">
                <div className="row">
                    <div className="col-sm-4 talk">
                        <h3>Vote</h3>
                        <br />
                        <h6 className="bold-four">
                    </h6>
                        <br />
                        <h6><a className="btn btn-dark start start-two" href="#">Vote</a></h6>
                    </div>
                    <div className="col-sm-4 talk">
                        <h3>Redeem</h3>
                        <br />
                        <h6 className="bold-four">
                    </h6>
                        <br />
                        <h6><a className="btn btn-dark start start-two" href="#">Redeem</a></h6>
                    </div>
                    <div className="col-sm-4 talk">
                        <h3>Stake</h3>
                        <br />
                        <h6 className="bold-four">
                    </h6>
                        <br />
                        <h6><a className="btn btn-dark start start-two" href="#">Stake</a></h6>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Content;