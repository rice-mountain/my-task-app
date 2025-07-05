import { NavLink } from "react-router-dom";
import { Box, Stack } from "@mantine/core";

const SideNav = () => (
  <Box
    component="nav"
    style={{
      width: 200,
      height: "calc(100vh - 64px)", // 上部ナビの高さ分引く
      background: "#111112",
      borderRight: "1px solid #222",
      position: "fixed",
      top: 64, // 上部ナビの高さ
      left: 0,
      paddingTop: 24,
      zIndex: 100,
    }}
  >
    <Stack gap="md">
      <NavLink
        to="/"
        style={({ isActive }) => ({
          color: "#fff",
          background: isActive ? "#27272a" : "transparent",
          padding: "12px 24px",
          textDecoration: "none",
          borderRadius: 8,
          fontWeight: 500,
        })}
      >
        タスク一覧
      </NavLink>
      <NavLink
        to="/add"
        style={({ isActive }) => ({
          color: "#fff",
          background: isActive ? "#27272a" : "transparent",
          padding: "12px 24px",
          textDecoration: "none",
          borderRadius: 8,
          fontWeight: 500,
        })}
      >
        タスク追加
      </NavLink>
    </Stack>
  </Box>
);

export default SideNav;