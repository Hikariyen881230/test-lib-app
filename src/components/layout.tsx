import { Box } from "@mui/material";
import React from "react";
import { Link, Outlet } from "react-router";

function Layout() {
  const navItems = [
    { lable: "Home", url: "/" },
    { lable: "Intl", url: "/intl" },
    { lable: "DnD", url: "/dnd" },
    { lable: "HTML5-QRCode", url: "/html5-qrcode" },
  ];
  return (
    <Box sx={{ maxWidth: 1440, margin: "0 auto" }}>
      <nav>
        <Box
          role="ul"
          sx={{
            display: "flex",
            gap: 2,
            listStyle: "none",
            marginY: 1,
            fontWeight: "bold",
            "& li": {
              padding: 2,
              "&:hover": {
                color: "#30c4ef",
              },
            },
          }}
        >
          {navItems.map((item) => (
            <li key={item.lable}>
              <Link to={item.url}>{item.lable}</Link>
            </li>
          ))}
        </Box>
        <hr />
      </nav>
      <Box sx={{ paddingY: 2 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
