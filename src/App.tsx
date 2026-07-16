import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";

import BhxhTable from "./pages/Tables/BhxhTable";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Dashboard/Home";
import UserManagement from "./pages/Tables/UserManagement";

import CreateUser from "./pages/User/CreateUser";
import EditUser from "./pages/User/EditUser";
import ViewUser from "./pages/User/ViewUser";
import RevenueCalendar from "./pages/Revenue/RevenueCalendar";
import RevenueDayDetail from "./pages/Revenue/RevenueDayDetail";
import BhxhPage from "./pages/BHXH/index";
import NotificationPage from "./pages/Notification";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="/users" element={<UserManagement />} />

            <Route path="/users/create" element={<CreateUser />} />

            <Route path="/users/edit/:id" element={<EditUser />} />

            <Route path="/users/view/:id" element={<ViewUser />} />

            {/* <Route
              path="/revenue-dashboard"
              element={
                <ProtectedRoute>
                  <RevenueDashboard />
                </ProtectedRoute>
              }
            /> */}

            <Route path="/notifications" element={<NotificationPage />} />

            <Route
              path="/revenue-report"
              element={
                <ProtectedRoute>
                  <RevenueCalendar />
                </ProtectedRoute>
              }
            />

            <Route
              path="/revenue-report/day/:date"
              element={
                <ProtectedRoute>
                  <RevenueDayDetail />
                </ProtectedRoute>
              }
            />

            {/* Others Page */}
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/blank" element={<Blank />} />

            {/* Forms */}
            <Route path="/form-elements" element={<FormElements />} />

            {/* Tables */}
            {/* <Route path="/user-management" element={<BasicTables />} /> */}
            <Route
              path="/bhxh-tables"
              element={
                <ProtectedRoute>
                  <BhxhTable />
                </ProtectedRoute>
              }
            />
            <Route path="/bhxh" element={<BhxhPage />} />

            {/* Ui Elements */}
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />

            {/* Charts */}
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
