import React from "react";

function Content() {
    return (
            <div>
            <section className="features-icons text-center det-ails">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                            <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                <div className="features-icons-icon d-flex  icon-bra-ails">
                                    <a className="m-auto text-primary icon-ails" href="https://t.me/+1sKwm55C76cxZmM9"><img src="images/telegram-icon.svg" style={{width: '40px'}} /></a>
                                </div>
                                <h4>Telegram</h4>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="features-icons-item mx-auto mb-5 mb-lg-0 mb-lg-3">
                                <div className="features-icons-icon d-flex  icon-bra-ails">
                                    <a className="m-auto text-primary icon-ails" href="https://t.me/+1sKwm55C76cxZmM9"><img src="images/discord-icon.svg" style={{width: '40px'}} /></a>
                                </div>
                                <h4>Discord</h4>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Content;