import React from "react";

const HomePage = () => {
    return (
        <>
            <div className="my_container2">
                <div className="welcome-font">
                    <p className="site-name">WELCOME to EHR</p>
                    <p>Store and access your medical records anywhere, anytime</p>
                    <p className="description">
                        This project is developed with the aim to store patient healthcare records
                        over blockchain. The DApp build provides a patient centric system in which
                        patient has control over his data i.e. patient themselves decide who can
                        view their profiles/data.
                    </p>
                </div>
            </div>
        </>
    );
};

export default HomePage;

/*
<div className="tickets">
                        {props.tickets.map((ticket) => {
                            if (ticket.owner === EMPTY_ADDRESS) {
                                return (
                                    <div key={ticket.id} className="ticket">
                                        <p>Ticket ID: 00{ticket.id}</p>
                                        <p>Ticket Price: {ticket.price / 1e18}</p>
                                        <button
                                            onClick={() => {
                                                props.buyTicket(ticket);
                                            }}
                                        >
                                            Buy Now
                                        </button>
                                    </div>
                                );
                            } else {
                                return <></>;
                            }
                        })}
                    </div>
                    */
