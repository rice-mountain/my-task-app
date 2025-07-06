import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Box } from "@mantine/core";
import AppNav from "./components/AppNav";
import SideNav from "./components/SideNav";
import { useTasks } from "./hooks/useTasks";
import AppRoutes from "./routes/AppRoutes";
import FirestoreTestButton from "./components/FirestoreTestButton";
const App = () => {
  const location = useLocation();

  const { tasks, addTask, updateTask, deleteTask } = useTasks();


  return (
    <Box style={{ minHeight: "100vh", background: "#fff" }}>
      {/* 上部ナビ */}
      <AppNav />
      <Box style={{ display: "flex", paddingTop: 64, paddingLeft: 200 }}>
        <SideNav />
        <Box style={{ flex: 1 }}>
          {/* ContainerをBoxに変更し、余白を調整 */}
          <Box style={{ padding: "32px 24px" }}>
            <Box
              style={{
                background: "#fff",
                borderRadius: 12,
                padding: 32,
                boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
                color: "#222",
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  <AppRoutes
                    tasks={tasks}
                    onAdd={addTask}
                    onUpdate={updateTask}
                    onDelete={deleteTask}
                  />
                </motion.div>
              </AnimatePresence>
            </Box>
          </Box>
        </Box>
      </Box>
      <FirestoreTestButton />
    </Box>
    
  );
};

export default App;
