import React, { useEffect, useState } from "react";
import { slide as Menu } from "react-burger-menu";
import { useNavigate } from "react-router-dom";
// icons
import { GiHamburgerMenu } from "react-icons/gi";
import { RiAdminLine } from "react-icons/ri";
import { BiDonateBlood } from "react-icons/bi";
import {
    MdLock,
    MdDocumentScanner,
    MdPersonalInjury,
    MdPersonAddAlt1,
    MdBloodtype,
    MdHealthAndSafety,
} from "react-icons/md";

var styles = {
    bmBurgerButton: {
        position: "fixed",
        width: "30px",
        height: "24px",
        right: "26px",
        top: "16px",
    },
    bmCrossButton: {
        height: "24px",
        width: "24px",
    },
    bmCross: {
        background: "var(--textColor)",
    },
    bmMenuWrap: {
        position: "fixed",
        height: "100%",
        top: "0",
    },
    bmMenu: {
        background: "var(--themeColor)",
        border: "5px solid var(--bodyColor)",
    },
    bmItemList: {
        color: "var(--textColor)",
        padding: "var(--smallGap)",
    },
    bmItem: {
        display: "flex",
        flexDirection: "column",
    },
};

const patientnavlist = [
    {
        name: "YOUR RECORDS",
        icon: <MdDocumentScanner />,
        path: "/patient/records",
    },
    {
        name: "ACCESSIBILITY",
        icon: <MdLock />,
        path: "/patient/access",
    },
    {
        name: "DONATE BLOOD",
        icon: <BiDonateBlood />,
        path: "/patient/access",
    },
    {
        name: "GET BLOOD",
        icon: <MdBloodtype />,
        path: "/patient/access",
    },
];

const doctornavlist = [
    {
        name: "NEW PATIENT",
        icon: <MdPersonalInjury />,
        path: "/doctor/add-patient",
    },
    {
        name: "PATIENT RECORDS",
        icon: <MdDocumentScanner />,
        path: "/doctor/patient-records",
    },
];

const hospitalnavlist = [
    {
        name: "NEW DOCTOR",
        icon: <MdPersonAddAlt1 />,
        path: "/admin/add-doctor",
    },
    {
        name: "DOCTOR DETAILS",
        icon: <MdDocumentScanner />,
        path: "/admin/doctor-records",
    },
];

const generalNavlist = [
    {
        name: "Home",
        icon: <RiAdminLine />,
        path: "/",
    },
];

const getAccount = (A) => {
    const len = A.length;
    return A[0] + A[1] + A[2] + "...." + A[len - 4] + A[len - 3] + A[len - 2] + A[len - 1];
};

const Navbar = ({ loggedIn, account, role }) => {
    const [navbarState, setNavbarState] = useState({
        mobileView: false,
        drawerOpen: false,
    });
    const { mobileView } = navbarState;
    const history = useNavigate();

    const getNavList = () => {
        if (role === "h") return hospitalnavlist;
        if (role === "d") return doctornavlist;
        if (role === "p") return patientnavlist;
    };

    // when in desktop view
    const DisplayDesktop = () => {
        return (
            <div className="links">
                <p>{!loggedIn ? "Not Loggedin" : "YOUR ACCOUNT: " + getAccount(account)}</p>
                {(loggedIn ? getNavList() : generalNavlist).map((item, index) => {
                    return (
                        <p
                            key={index}
                            onClick={() => {
                                // history.push(`${item.path}`);
                                history(`${item.path}`);
                            }}
                        >
                            <div className="menu_item">
                                <div style={{ marginTop: "5px" }}>{item.icon}</div>
                                <div>{item.name}</div>
                            </div>
                        </p>
                    );
                })}
            </div>
        );
    };

    //when in mobile view
    const DisplayMobile = () => {
        //functions to handle states
        const handleDrawerOpen = () => {
            setNavbarState((prevState) => ({ ...prevState, drawerOpen: true }));
        };
        const handleDrawerClose = (state) => {
            setNavbarState((prevState) => ({ ...prevState, drawerOpen: state }));
        };

        return (
            <div className="mobile_navbar">
                <Menu
                    styles={styles}
                    width={"40%"}
                    isOpen={navbarState.drawerOpen}
                    className={"slider"}
                    customBurgerIcon={
                        <GiHamburgerMenu
                            onClick={() => {
                                handleDrawerOpen();
                            }}
                        />
                    }
                    onStateChange={(state) => handleDrawerClose(state.isOpen)}
                    right
                >
                    <p>{!loggedIn ? "Not Loggedin" : "YOUR ACCOUNT: " + getAccount(account)}</p>
                    <div>
                        {(loggedIn ? getNavList() : generalNavlist).map((item, index) => {
                            return (
                                <p
                                    key={index}
                                    onClick={() => {
                                        handleDrawerClose(false);
                                        history.push(`${item.path}`);
                                    }}
                                >
                                    <div className="menu_item">
                                        <div style={{ marginTop: "5px" }}>{item.icon}</div>
                                        <div>{item.name}</div>
                                    </div>
                                </p>
                            );
                        })}
                    </div>
                </Menu>
            </div>
        );
    };

    useEffect(() => {
        const setResponsiveness = () => {
            return window.innerWidth < 948
                ? setNavbarState((prevState) => ({ ...prevState, mobileView: true }))
                : setNavbarState((prevState) => ({ ...prevState, mobileView: false }));
        };
        setResponsiveness();
        window.addEventListener("resize", () => setResponsiveness());
        return function cleanup() {
            window.removeEventListener("resize", () => setResponsiveness());
        };
    }, []);

    return (
        <div className="navbar">
            <div className="common_btn">
                <a href="/" rel="noreferrer">
                    <button>
                        {!loggedIn ? (
                            <div className="menu_item">
                                <div style={{ marginTop: "5px" }}>
                                    <MdHealthAndSafety />
                                </div>
                                <div>Health-Wallet</div>
                            </div>
                        ) : (
                            "Logout"
                        )}
                    </button>
                </a>
            </div>
            {mobileView ? DisplayMobile() : DisplayDesktop()}
        </div>
    );
};

export default Navbar;
