import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Layout from "./common/Layout";
import Login from "./pages/auth/Login";
import Registration from "./pages/auth/Registration";
import Dashboard from "./pages/dashboard/Dashboard";
import DashboardFirm from "./pages/dashboard/DashboardFirm";
import { ToastContainer } from "react-toastify";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AdminLogin from "./pages/auth/AdminLogin";
import AdminLayout from "./common/AdminLayout";
import AddEquipment from "./pages/equipments/AddEquipment";
import EquipmentList from "./pages/equipments/EquipmentList";
import EquipmentDetails from "./pages/equipments/EquipmentDetails";
import EditEquipment from "./pages/equipments/EditEquipment";
import MyEquipment from "./pages/equipments/MyEquipment";
import MyFavoriteEquipment from "./pages/equipments/MyFavoriteEquipment";
import MyEquipmentRequest from "./pages/equipments/MyEquipmentRequest";
import AddEquipmentRequest from "./pages/equipments/AddEquipmentRequest";
import EquipmentRequestDetails from "./pages/equipments/EquipmentRequestDetails";
import EditEquipmentRequest from "./pages/equipments/EditEquipmentRequest";
import MyEquipmentRelatedRequest from "./pages/equipments/MyEquipmentRelatedRequest";
import MyContact from "./pages/equipments/MyContact";
import MyProfile from "./pages/auth/MyProfile";
import MyWishlist from "./pages/auth/MyWishlist";
import Chat from "./pages/equipments/Chat";
import AllChats from "./pages/equipments/AllChats";
import PendingRequest from "./pages/equipments/PendingRequest";
import CompletedRequest from "./pages/equipments/CompletedRequest";

function ProtectRoute() {
  return localStorage.getItem("token") ? <Outlet /> : <Navigate to="/login" />;
}

function App() {
  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="colored"
      />
      <BrowserRouter>
        <Routes>
          {/* <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          /> */}

          {/* AUTH ROUTE */}

          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/registration"
            element={
              <AdminLayout>
                <Registration />
              </AdminLayout>
            }
          />

          <Route
            path="/change-password/:token"
            element={
              <Layout>
                <ForgotPassword />
              </Layout>
            }
          />

          <Route
            path="/admin"
            element={
              <AdminLayout>
                <AdminLogin />
              </AdminLayout>
            }
          />

          {/* END AUTH ROUTE */}

          <Route element={<ProtectRoute />}>
            <Route
              path="/"
              element={
                <Layout>
                  <Dashboard />
                </Layout>
              }
            />

            <Route
              path="/firm-dashboard"
              element={
                <Layout>
                  <DashboardFirm />
                </Layout>
              }
            />

            <Route
              path="/add-equipment"
              element={
                <Layout>
                  <AddEquipment />
                </Layout>
              }
            />
            <Route
              path="/equipment-list"
              element={
                <Layout>
                  <EquipmentList />
                </Layout>
              }
            />
            <Route
              path="/my-equipment"
              element={
                <Layout>
                  <MyEquipment />
                </Layout>
              }
            />
            <Route
              path="/equipment-details/:id"
              element={
                <Layout>
                  <EquipmentDetails />
                </Layout>
              }
            />
            <Route
              path="/edit-equipment/:id"
              element={
                <Layout>
                  <EditEquipment />
                </Layout>
              }
            />
            <Route
              path="/my-favorite-equipment"
              element={
                <Layout>
                  <MyFavoriteEquipment />
                </Layout>
              }
            />
          </Route>
          <Route
            path="/my-request"
            element={
              <Layout>
                <MyEquipmentRequest />
              </Layout>
            }
          />
          <Route
            path="/pending-request"
            element={
              <Layout>
                <PendingRequest />
              </Layout>
            }
          />
          <Route
            path="/completed-request"
            element={
              <Layout>
                <CompletedRequest />
              </Layout>
            }
          />

          <Route
            path="/add-equipment-request"
            element={
              <Layout>
                <AddEquipmentRequest />
              </Layout>
            }
          />
          <Route
            path="/equipment-request-details/:id"
            element={
              <Layout>
                <EquipmentRequestDetails />
              </Layout>
            }
          />
          <Route
            path="/edit-equipment-request/:id"
            element={
              <Layout>
                <EditEquipmentRequest />
              </Layout>
            }
          />
          <Route
            path="/my-equipment-related-request"
            element={
              <Layout>
                <MyEquipmentRelatedRequest />
              </Layout>
            }
          />
          <Route
            path="/my-contact"
            element={
              <Layout>
                <MyContact />
              </Layout>
            }
          />
          <Route
            path="/chat/:id"
            element={
              <Layout>
                <Chat />
              </Layout>
            }
          />
          <Route
            path="/all-chats"
            element={
              <Layout>
                <AllChats />
              </Layout>
            }
          />
          <Route
            path="/my-profile"
            element={
              <Layout>
                <MyProfile />
              </Layout>
            }
          />
          <Route
            path="/my-wishlist"
            element={
              <Layout>
                <MyWishlist />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
