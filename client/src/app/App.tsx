import { Routes, Route } from "react-router"
import { Sidebar } from "../features/sidebar/Sidebar"
import DashboardPage from "./routes/DashboardPage"
import SettingsPage from "./routes/SettingsPage"
import NotFoundPage from "./routes/NotFoundPage"

export default function App() {
  return (
    <div className="flex min-h-screen bg-(--color-bg)">
      <Sidebar />
      <main className="flex-1 min-w-0">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </div>
  );
}
