import { Group, Button, Box } from "@mantine/core";
import { Link, useLocation } from "react-router-dom";

const AppNav = () => {
  const location = useLocation();

  return (
    <Box
      component="nav"
      style={{
        width: "100%",
        height: 64,
        background: "#111112",
        borderBottom: "1px solid #222",
        padding: 0,
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 200,
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* タイトルを一番左に固定 */}
      <Box
        style={{
          minWidth: 200,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingLeft: 24,
        }}
      >
        <Link
          to="/"
          style={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: 22,
            letterSpacing: 1,
          }}
        >
          backlog風アプリ
        </Link>
      </Box>
      {/* 右側のナビゲーションボタン */}
      <Box style={{ flex: 1, display: "flex", justifyContent: "flex-end", paddingRight: 32 }}>
        <Group gap="md">
          <Button
            component={Link}
            to="/"
            variant={location.pathname === "/" ? "filled" : "subtle"}
            color="dark"
            radius="md"
            style={{
              background: location.pathname === "/" ? "#27272a" : undefined,
              color: "#fff",
            }}
          >
            タスク一覧
          </Button>
          <Button
            component={Link}
            to="/add"
            variant={location.pathname === "/add" ? "filled" : "subtle"}
            color="dark"
            radius="md"
            style={{
              background: location.pathname === "/add" ? "#27272a" : undefined,
              color: "#fff",
            }}
          >
            タスク追加
          </Button>
        </Group>
      </Box>
    </Box>
  );
};

export default AppNav;