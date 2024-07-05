import React from "react";

import Staker from "../../contracts/Staker.sol/Staker.json";

// TODO: contract address hard coded for now
const stakerAddress = "0x5459278815CEFB554919E16646D201Db10ffD7cd";
console.log(stakerAddress, "Staker ABI: ", Staker.abi);

function Content() {
    return (
            <div>
            <section className="features-icons text-center det-ails">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-4">
                                <h4>This is admin-only page</h4>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Content;