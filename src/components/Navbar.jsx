import { useState } from "react";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  X,
  Zap,
} from "lucide-react";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import { useAuth } from "../context/AuthContext";

import toast from "react-hot-toast";

export default function Navbar() {

  const [profileOpen, setProfileOpen] =
    useState(false);

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const [notificationsOpen, setNotificationsOpen] =
    useState(false);

  const {
    user,
    role,
    logout,
  } = useAuth();

  const navigate =
    useNavigate();

  const handleLogout =
    async () => {

      try {

        await logout();

        toast.success(
          "Signed out successfully"
        );

        navigate("/");

      } catch {

        toast.error(
          "Logout failed"
        );
      }
    };

  return (
    <>
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background:
            "rgba(255,255,255,0.94)",
          backdropFilter:
            "blur(12px)",
          borderBottom:
            "1px solid #ebe7df",
        }}
      >
        <div
          style={{
            height: 68,
            padding: "0 22px",
            display: "flex",
            alignItems: "center",
            justifyContent:
              "space-between",
          }}
        >

          {/* LEFT */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >

            <button
              className="mobile-btn"
              onClick={() =>
                setMobileOpen(
                  !mobileOpen
                )
              }
              style={{
                border: "none",
                background:
                  "transparent",
                cursor: "pointer",
                display: "none",
              }}
            >
              {mobileOpen ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}
            </button>

            <Link
              to="/"
              style={{
                display: "flex",
                alignItems:
                  "center",
                gap: 8,
                textDecoration:
                  "none",
              }}
            >
              <div
                style={{
                  width: 34,
                  height: 34,
                  borderRadius: 10,
                  background:
                    "linear-gradient(135deg,#e8622a,#f5a623)",
                  display:
                    "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                }}
              >
                <Zap
                  size={16}
                  color="#fff"
                  fill="#fff"
                />
              </div>

              <span
                style={{
                  fontWeight: 800,
                  fontFamily:
                    "Plus Jakarta Sans",
                  color: "#1c1a17",
                }}
              >
                Vendor
                <span
                  style={{
                    color:
                      "#e8622a",
                  }}
                >
                  Bridge
                </span>
              </span>
            </Link>
          </div>

          {/* RIGHT */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 14,
            }}
          >

            {/* LIVE */}
            <div
              style={{
                padding:
                  "6px 12px",
                borderRadius: 999,
                background:
                  "#e8f7ee",
                color: "#16a34a",
                fontWeight: 700,
                fontSize: "0.8rem",
              }}
            >
              ● Live
            </div>

            {/* NOTIFICATIONS */}
            <div
              style={{
                position:
                  "relative",
              }}
            >
              <button
                onClick={() =>
                  setNotificationsOpen(
                    !notificationsOpen
                  )
                }
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 12,
                  border:
                    "1px solid #ece7df",
                  background:
                    "#fff",
                  cursor:
                    "pointer",
                  position:
                    "relative",
                }}
              >
                <Bell
                  size={18}
                />

                <span
                  style={{
                    position:
                      "absolute",
                    top: 8,
                    right: 8,
                    width: 8,
                    height: 8,
                    borderRadius:
                      "50%",
                    background:
                      "#ef4444",
                  }}
                />
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: -6,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    exit={{
                      opacity: 0,
                    }}
                    style={{
                      position:
                        "absolute",
                      top: 48,
                      right: 0,
                      width: 260,
                      background:
                        "#fff",
                      borderRadius: 16,
                      border:
                        "1px solid #eee",
                      padding: 16,
                      boxShadow:
                        "0 10px 30px rgba(0,0,0,0.12)",
                    }}
                  >
                    <h4
                      style={{
                        marginBottom: 12,
                      }}
                    >
                      Notifications
                    </h4>

                    <div
                      style={{
                        fontSize: 14,
                        marginBottom: 10,
                      }}
                    >
                      📦 Tomato prices updated
                    </div>

                    <div
                      style={{
                        fontSize: 14,
                      }}
                    >
                      ⚠️ Low stock alert
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* PROFILE */}
            {user && (
              <div
                style={{
                  position:
                    "relative",
                }}
              >
                <button
                  onClick={() =>
                    setProfileOpen(
                      !profileOpen
                    )
                  }
                  style={{
                    display:
                      "flex",
                    alignItems:
                      "center",
                    gap: 10,
                    border:
                      "1px solid #ece7df",
                    background:
                      "#fff",
                    borderRadius: 14,
                    padding:
                      "6px 10px",
                    cursor:
                      "pointer",
                  }}
                >
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius:
                        10,
                      background:
                        "linear-gradient(135deg,#e8622a,#f5a623)",
                      display:
                        "flex",
                      alignItems:
                        "center",
                      justifyContent:
                        "center",
                      color:
                        "#fff",
                      fontWeight: 800,
                    }}
                  >
                    {user
                      ?.displayName?.[0] ||
                      "S"}
                  </div>

                  <ChevronDown
                    size={14}
                  />
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: -6,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                      }}
                      style={{
                        position:
                          "absolute",
                        top: 52,
                        right: 0,
                        width: 230,
                        background:
                          "#fff",
                        borderRadius: 18,
                        border:
                          "1px solid #eee",
                        overflow:
                          "hidden",
                        boxShadow:
                          "0 10px 30px rgba(0,0,0,0.12)",
                      }}
                    >

                      {/* USER */}
                      <div
                        style={{
                          padding: 16,
                          borderBottom:
                            "1px solid #f3f3f3",
                        }}
                      >
                        <div
                          style={{
                            fontWeight: 700,
                            marginBottom: 4,
                          }}
                        >
                          {user?.displayName}
                        </div>

                        <div
                          style={{
                            fontSize:
                              "0.82rem",
                            color:
                              "#777",
                          }}
                        >
                          {user?.email}
                        </div>
                      </div>

                      {/* DASHBOARD */}
                      <button
                        onClick={() => {
                          navigate(
                            `/${role}`
                          );

                          setProfileOpen(
                            false
                          );
                        }}
                        style={{
                          width:
                            "100%",
                          padding:
                            "13px 16px",
                          border:
                            "none",
                          background:
                            "#fff",
                          textAlign:
                            "left",
                          cursor:
                            "pointer",
                        }}
                      >
                        Dashboard
                      </button>

                      {/* LOGOUT */}
                      <button
                        onClick={
                          handleLogout
                        }
                        style={{
                          width:
                            "100%",
                          padding:
                            "13px 16px",
                          border:
                            "none",
                          background:
                            "#fff5f5",
                          textAlign:
                            "left",
                          cursor:
                            "pointer",
                          color:
                            "#dc2626",
                          fontWeight: 700,
                          display:
                            "flex",
                          alignItems:
                            "center",
                          gap: 8,
                        }}
                      >
                        <LogOut
                          size={15}
                        />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
              }}
              style={{
                background:
                  "#fff",
                borderTop:
                  "1px solid #eee",
                padding: 20,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection:
                    "column",
                  gap: 14,
                }}
              >
                <a href="#features">
                  Features
                </a>

                <a href="#roadmap">
                  Roadmap
                </a>

                <button
                  onClick={
                    handleLogout
                  }
                  style={{
                    marginTop: 10,
                    padding: 12,
                    borderRadius: 12,
                    border:
                      "1px solid #eee",
                    background:
                      "#fff5f5",
                    color:
                      "#dc2626",
                    fontWeight: 700,
                  }}
                >
                  Logout
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <style>
          {`
            @media(max-width:768px){

              .mobile-btn{
                display:block!important;
              }
            }
          `}
        </style>
      </nav>
    </>
  );
}
