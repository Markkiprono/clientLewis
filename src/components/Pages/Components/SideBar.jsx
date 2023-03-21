import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AppBar, IconButton, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
const navRoute = [
  {
    name: "Attendances",
    icon: <BiHome />,
    to: "/admin",
  },
  {
    name: "Create User",
    icon: <AiFillTags />,
    to: "/admin/CreateUser",
  },

  {
    name: "View Salary",
    icon: <BiWalletAlt />,
    to: "/admin/Salary",
  },
  {
    name: "Users",
    icon: <BiUserCircle />,
    to: "/admin/ViewUsers",
  },
];

const showAnimation = {
  hidden: {
    width: 0,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
  show: {
    width: "auto",

    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
};

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1000) {
        setMobile(true);
      } else {
        setMobile(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mobile]);

  return (
    <>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            onClick={toggle}
            color="inherit"
            aria-label="menu"
          >
            <RiMenu5Fill />
          </IconButton>
        </Toolbar>
      </AppBar>

      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : !mobile ? "40px" : "0px",
            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className="sidebar"
        >
          <div className="top_section">
            {isOpen && <motion.h1 className="logo">Attendance</motion.h1>}

            {!mobile && (
              <div className="bars">
                <RiMenu5Fill onClick={toggle} />
              </div>
            )}
          </div>
          <section className="navRoute">
            {" "}
            {!mobile && (
              <>
                {navRoute.map((route) => (
                  <NavLink
                    activeClassName="active"
                    to={route.to}
                    key={route.name}
                    className="Link"
                  >
                    {" "}
                    <div className="icon">{route.icon}</div>
                    <AnimatePresence>
                      {" "}
                      {isOpen && (
                        <motion.p
                          variants={showAnimation}
                          inital="hidden"
                          animate="show"
                          exit="hidden"
                          className="Link_Text"
                        >
                          {route.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </NavLink>
                ))}
              </>
            )}
          </section>
        </motion.div>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};
export default SideBar;
