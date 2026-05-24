import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  LayoutDashboard,
  Search,
  Package,
  BarChart3,
  LogOut,
  Zap,
  PlusCircle,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

import {
  useState,
  useEffect,
} from "react";

import { motion, AnimatePresence } from "framer-motion";

import { useAuth } from "../context/AuthContext";

import toast from "react-hot-toast";

const VENDOR_NAV = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/vendor",
  },
  {
    icon: Search,
    label: "Discover Suppliers",
    path: "/vendor/suppliers",
  },
  {
    icon: Package,
    label: "Products",
    path: "/vendor/products",
  },
  {
    icon: BarChart3,
    label: "Analytics",
    path: "/vendor/analytics",
  },
];

const SUPPLIER_NAV = [
  {
    icon: LayoutDashboard,
    label: "Dashboard",
    path: "/supplier",
  },
  {
    icon: Package,
    label: "My Products",
    path: "/supplier/products",
  },
  {
    icon: PlusCircle,
    label: "Add Product",
    path: "/supplier/add",
  },
  {
    icon: BarChart3,
    label: "Analytics",
    path: "/supplier/analytics",
  },
];

export default function Sidebar({
  collapsed,
}) {

  const {
    user,
    role,
    logout,
  } = useAuth();

  const location =
    useLocation();

  const navigate =
    useNavigate();

  const [mobileOpen, setMobileOpen] =
    useState(false);

  const navItems =
    role === "supplier"
      ? SUPPLIER_NAV
      : VENDOR_NAV;

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

  useEffect(() => {

    const handleResize = () => {

      if (
        window.innerWidth > 768
      ) {
        setMobileOpen(false);
      }
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () =>
      window.removeEventListener(
        "resize",
        handleResize
      );

  }, []);

  return (
    <>
      {/* MOBILE TOPBAR */}
      <div
        className="mobile-topbar"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 60,
          background: "#1e1c19",
          display: "none",
          alignItems: "center",
          justifyContent:
            "space-between",
          padding: "0 16px",
          zIndex: 1200,
          borderBottom:
            "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background:
                "linear-gradient(135deg,#e8622a,#f5a623)",
              display: "flex",
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
              color: "#fff",
              fontWeight: 800,
              fontFamily:
                "Plus Jakarta Sans",
            }}
          >
            VendorBridge
          </span>
        </div>

        <button
          onClick={() =>
            setMobileOpen(
              !mobileOpen
            )
          }
          style={{
            border: "none",
            background:
              "transparent",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          {mobileOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>
      </div>

      {/* OVERLAY */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            onClick={() =>
              setMobileOpen(
                false
              )
            }
            style={{
              position:
                "fixed",
              inset: 0,
              background:
                "rgba(0,0,0,0.45)",
              zIndex: 1100,
            }}
          />
        )}
      </AnimatePresence>

      {/* SIDEBAR */}
      <AnimatePresence>
        {(mobileOpen ||
          window.innerWidth >
            768) && (
          <motion.aside
            initial={{
              x: -260,
            }}
            animate={{
              x: 0,
            }}
            exit={{
              x: -260,
            }}
            transition={{
              duration: 0.25,
            }}
            style={{
              width: collapsed
                ? 70
                : 224,
              minHeight:
                "100vh",
              background:
                "#1e1c19",
              display: "flex",
              flexDirection:
                "column",
              flexShrink: 0,
              transition:
                "width 0.25s ease",
              position:
                window.innerWidth <=
                768
                  ? "fixed"
                  : "sticky",
              top: 0,
              left: 0,
              zIndex: 1201,
            }}
          >

            {/* LOGO */}
            <div
              style={{
                padding: collapsed
                  ? "18px 14px"
                  : "18px 16px",
                borderBottom:
                  "1px solid rgba(255,255,255,0.07)",
                display: "flex",
                alignItems:
                  "center",
                gap: 9,
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background:
                    "linear-gradient(135deg,#e8622a,#f5a623)",
                  display:
                    "flex",
                  alignItems:
                    "center",
                  justifyContent:
                    "center",
                  flexShrink: 0,
                }}
              >
                <Zap
                  size={16}
                  color="#fff"
                  fill="#fff"
                />
              </div>

              {!collapsed && (
                <span
                  style={{
                    fontFamily:
                      "Plus Jakarta Sans",
                    fontWeight: 800,
                    fontSize:
                      "1rem",
                    color: "#fff",
                    whiteSpace:
                      "nowrap",
                  }}
                >
                  Vendor
                  <span
                    style={{
                      color:
                        "#f5885a",
                    }}
                  >
                    Bridge
                  </span>
                </span>
              )}
            </div>

            {/* USER */}
            {!collapsed && (
              <div
                style={{
                  padding:
                    "14px 12px",
                  borderBottom:
                    "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  style={{
                    background:
                      "rgba(255,255,255,0.06)",
                    borderRadius:
                      10,
                    padding:
                      "10px 12px",
                    display:
                      "flex",
                    alignItems:
                      "center",
                    gap: 9,
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius:
                        8,
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
                      fontWeight: 700,
                    }}
                  >
                    {user?.displayName?.[0] ||
                      "U"}
                  </div>

                  <div
                    style={{
                      overflow:
                        "hidden",
                    }}
                  >
                    <div
                      style={{
                        fontSize:
                          "0.82rem",
                        fontWeight: 600,
                        color:
                          "#e8e4dc",
                        whiteSpace:
                          "nowrap",
                        overflow:
                          "hidden",
                        textOverflow:
                          "ellipsis",
                      }}
                    >
                      {user?.displayName ||
                        "Demo User"}
                    </div>

                    <span
                      style={{
                        display:
                          "inline-block",
                        marginTop: 4,
                        background:
                          "#fff4e8",
                        color:
                          "#e8622a",
                        padding:
                          "2px 8px",
                        borderRadius:
                          999,
                        fontSize:
                          "0.68rem",
                        fontWeight: 700,
                        textTransform:
                          "capitalize",
                      }}
                    >
                      {role}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* NAVIGATION */}
            <nav
              style={{
                flex: 1,
                padding:
                  "10px 8px",
                display: "flex",
                flexDirection:
                  "column",
                gap: 4,
              }}
            >
              {navItems.map(
                ({
                  icon: Icon,
                  label,
                  path,
                }) => {

                  const active =
                    location.pathname ===
                    path;

                  return (
                    <Link
                      key={path}
                      to={path}
                      onClick={() =>
                        setMobileOpen(
                          false
                        )
                      }
                      style={{
                        display:
                          "flex",
                        alignItems:
                          "center",
                        gap: 12,
                        padding:
                          collapsed
                            ? "12px"
                            : "12px 14px",
                        borderRadius:
                          12,
                        textDecoration:
                          "none",
                        color: active
                          ? "#fff"
                          : "#d6d0ca",
                        background:
                          active
                            ? "linear-gradient(135deg,#e8622a,#f5a623)"
                            : "transparent",
                        fontWeight:
                          active
                            ? 700
                            : 500,
                        transition:
                          "0.2s",
                      }}
                    >
                      <Icon
                        size={17}
                        style={{
                          flexShrink: 0,
                        }}
                      />

                      {!collapsed && (
                        <>
                          <span>
                            {label}
                          </span>

                          {active && (
                            <ChevronRight
                              size={
                                13
                              }
                              style={{
                                marginLeft:
                                  "auto",
                                opacity:
                                  0.7,
                              }}
                            />
                          )}
                        </>
                      )}
                    </Link>
                  );
                }
              )}
            </nav>

            {/* LOGOUT */}
            <div
              style={{
                padding: 10,
                borderTop:
                  "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <button
                onClick={
                  handleLogout
                }
                style={{
                  width: "100%",
                  padding:
                    "12px 14px",
                  borderRadius: 12,
                  border:
                    "1px solid rgba(255,255,255,0.08)",
                  background:
                    "#2a2723",
                  color: "#ff8f8f",
                  cursor:
                    "pointer",
                  display: "flex",
                  alignItems:
                    "center",
                  gap: 10,
                  fontWeight: 600,
                  transition:
                    "0.2s",
                }}
              >
                <LogOut
                  size={16}
                />

                {!collapsed && (
                  <span>
                    Sign Out
                  </span>
                )}
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <style>
        {`
          @media(max-width:768px){

            .mobile-topbar{
              display:flex!important;
            }
          }
        `}
      </style>
    </>
  );
}
