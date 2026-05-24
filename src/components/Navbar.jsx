import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

import {
  Zap,
  LogOut,
  Bell,
  ChevronDown,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

import toast from "react-hot-toast";

export default function Navbar() {

  const [userMenuOpen, setUserMenuOpen] =
    useState(false);

  const [notificationsOpen, setNotificationsOpen] =
    useState(false);

  const {
    user,
    role,
    logout,
  } = useAuth();

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {

      await logout();

      toast.success(
        "Signed out successfully"
      );

      navigate("/");

    } catch (error) {

      toast.error("Logout failed");
    }
  };

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background:
          "rgba(255,255,255,0.92)",
        backdropFilter: "blur(16px)",
        borderBottom:
          "1px solid #e8e4dc",
      }}
    >
      <div
        style={{
          maxWidth: 1160,
          margin: "0 auto",
          padding: "0 24px",
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent:
            "space-between",
        }}
      >

        {/* LOGO */}
        <Link
          to="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 10,
              background:
                "linear-gradient(135deg,#e8622a,#f5a623)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
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
              fontFamily:
                "Plus Jakarta Sans",
              fontWeight: 800,
              fontSize: "1.08rem",
              color: "#1a1814",
            }}
          >
            Vendor
            <span
              style={{
                color: "#e8622a",
              }}
            >
              Bridge
            </span>
          </span>
        </Link>

        {/* CENTER LINKS */}
        <div
          className="nav-links"
          style={{
            display: "flex",
            gap: 28,
            alignItems: "center",
          }}
        >
          {[
            "Features",
            "How It Works",
            "Roadmap",
          ].map((item) => (
            <a
              key={item}
              href={`#${item
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              style={{
                color: "#6b6560",
                textDecoration: "none",
                fontSize: "0.875rem",
                fontWeight: 500,
              }}
            >
              {item}
            </a>
          ))}
        </div>

        {/* RIGHT SECTION */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
          }}
        >

          {/* NOTIFICATIONS */}
          {user && (
            <div
              style={{
                position: "relative",
              }}
            >
              <button
                onClick={() =>
                  setNotificationsOpen(
                    !notificationsOpen
                  )
                }
                style={{
                  border: "none",
                  background:
                    "transparent",
                  cursor: "pointer",
                  position: "relative",
                  padding: 6,
                }}
              >
                <Bell
                  size={20}
                  color="#444"
                />

                <span
                  style={{
                    position:
                      "absolute",
                    top: 3,
                    right: 3,
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
                      y: -5,
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
                      top: 44,
                      right: 0,
                      width: 300,
                      background:
                        "#fff",
                      borderRadius: 16,
                      border:
                        "1px solid #eee",
                      padding: 16,
                      boxShadow:
                        "0 10px 30px rgba(0,0,0,0.12)",
                      zIndex: 200,
                    }}
                  >
                    <h4
                      style={{
                        marginBottom: 14,
                        fontSize:
                          "0.95rem",
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
          )}

          {/* USER MENU */}
          {user ? (
            <div
              style={{
                position: "relative",
              }}
            >
              <button
                onClick={() =>
                  setUserMenuOpen(
                    !userMenuOpen
                  )
                }
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#fff",
                  border:
                    "1px solid #e5e5e5",
                  borderRadius: 10,
                  padding:
                    "8px 12px",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                <div
                  style={{
                    width: 26,
                    height: 26,
                    borderRadius:
                      "50%",
                    background:
                      "linear-gradient(135deg,#e8622a,#f5a623)",
                    display: "flex",
                    alignItems:
                      "center",
                    justifyContent:
                      "center",
                    color: "#fff",
                    fontSize:
                      "0.78rem",
                    fontWeight: 700,
                  }}
                >
                  {user?.displayName?.[0] ||
                    "U"}
                </div>

                {user?.displayName?.split(
                  " "
                )[0] || "User"}

                <ChevronDown
                  size={14}
                />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
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
                      width: 220,
                      background:
                        "#fff",
                      border:
                        "1px solid #eee",
                      borderRadius: 14,
                      overflow:
                        "hidden",
                      boxShadow:
                        "0 10px 30px rgba(0,0,0,0.1)",
                      zIndex: 300,
                    }}
                  >

                    <div
                      style={{
                        padding: 14,
                        borderBottom:
                          "1px solid #f1f1f1",
                      }}
                    >
                      <div
                        style={{
                          fontSize:
                            "0.78rem",
                          color:
                            "#888",
                          marginBottom: 3,
                        }}
                      >
                        Signed in as
                      </div>

                      <div
                        style={{
                          fontSize:
                            "0.86rem",
                          fontWeight: 600,
                        }}
                      >
                        {user.email}
                      </div>

                      {role && (
                        <div
                          style={{
                            marginTop: 7,
                            fontSize:
                              "0.75rem",
                            background:
                              "#fff4e8",
                            color:
                              "#e8622a",
                            padding:
                              "4px 8px",
                            borderRadius: 999,
                            display:
                              "inline-block",
                            fontWeight: 600,
                          }}
                        >
                          {role}
                        </div>
                      )}
                    </div>

                    {role && (
                      <button
                        onClick={() => {
                          navigate(
                            `/${role}`
                          );

                          setUserMenuOpen(
                            false
                          );
                        }}
                        style={{
                          width: "100%",
                          padding:
                            "12px 14px",
                          border: "none",
                          background:
                            "#fff",
                          textAlign:
                            "left",
                          cursor:
                            "pointer",
                          fontSize:
                            "0.88rem",
                        }}
                      >
                        Dashboard
                      </button>
                    )}

                    <button
                      onClick={
                        handleLogout
                      }
                      style={{
                        width: "100%",
                        padding:
                          "12px 14px",
                        border: "none",
                        background:
                          "#fff",
                        textAlign:
                          "left",
                        cursor:
                          "pointer",
                        color:
                          "#dc2626",
                        display:
                          "flex",
                        alignItems:
                          "center",
                        gap: 8,
                        fontSize:
                          "0.88rem",
                        fontWeight: 600,
                      }}
                    >
                      <LogOut
                        size={15}
                      />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link to="/auth">
                <button
                  style={{
                    padding:
                      "8px 16px",
                    borderRadius: 10,
                    border:
                      "1px solid #ddd",
                    background:
                      "#fff",
                    cursor:
                      "pointer",
                    fontWeight: 600,
                  }}
                >
                  Sign In
                </button>
              </Link>

              <Link to="/auth">
                <button
                  style={{
                    padding:
                      "8px 16px",
                    borderRadius: 10,
                    border: "none",
                    background:
                      "linear-gradient(135deg,#e8622a,#f5a623)",
                    color: "#fff",
                    cursor:
                      "pointer",
                    fontWeight: 700,
                  }}
                >
                  Get Started
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      <style>
        {`
        @media(max-width:700px){
          .nav-links{
            display:none!important;
          }
        }
      `}
      </style>
    </nav>
  );
}