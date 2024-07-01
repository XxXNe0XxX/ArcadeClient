import { Routes, Route } from "react-router-dom";
import RequireAuth from "./components/RequireAuth";
import Layout from "./components/Layout";
import Public from "./components/Public";
import Unauthorized from "./components/Unauthorized";
import Register from "./features/auth/Register";
import Login from "./features/auth/Login";
import DashLayout from "./components/admin/DashLayout";
import Welcome from "./components/admin/Welcome";
import ClientDashLayout from "./components/client/ClientDashLayout";
import WelcomeClient from "./components/client/WelcomeClient";
import PersistLogin from "./components/PersistLogin";
import ClientTransactions from "./components/client/ClientTransactions";
import RecoverQR from "./features/recoverQR/RecoverQR";
import GenerateQR from "./components/client/GenerateQR";
import ClientGameSessions from "./components/client/ClientGameSessions";
import ClientMachineStatistics from "./components/client/ClientMachineStatistics";
import ClientQrCodes from "./components/client/ClientQrCodes";
import ClientProfile from "./components/client/ClientProfile";
import EditBalance from "./components/admin/EditBalance";
import CreateArcade from "./components/admin/CreateArcade";
import Machines from "./components/admin/Machines";
import EditMachine from "./components/admin/EditMachine";
import MachineUsage from "./components/admin/MachineUsage";
import Accounting from "./components/admin/Accounting";
import GameInfo from "./components/GameInfo";
import Contact from "./components/Contact";
import EditTransaction from "./components/admin/EditTransaction";
import Transactions from "./components/admin/Transactions";
import CreateExpense from "./components/admin/CreateExpense";
import HowItWorks from "./components/HowItWorks";
import FAQ from "./components/FAQ";
import StoreLocator from "./components/StoreLocator";
import EmailContact from "./components/EmailContact";
import CreateUser from "./components/admin/CreateUser";
import Users from "./components/admin/Users";
import EditUser from "./components/admin/EditUser";
import Sessions from "./components/admin/Sessions";
import QrCodes from "./components/admin/QrCodes";
import ExchangeRates from "./components/admin/ExchangeRates";
import Phrase from "./components/Phrase";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public routes */}
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="unauthorized" element={<Unauthorized />} />
        <Route path="recoverqr" element={<RecoverQR />} />
        <Route path="contact" element={<Contact />} />
        <Route path="howitworks" element={<HowItWorks />} />
        <Route path="locations" element={<StoreLocator />} />
        <Route path="faq" element={<FAQ />} />
        <Route
          path="gameinfo/:game/:creditsPerGame/:running"
          element={<GameInfo />}
        />
        <Route path="phrase" element={<Phrase></Phrase>}></Route>

        {/* Admin Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={["ADMIN"]} />}>
            <Route path="dash" element={<DashLayout />}>
              <Route index element={<Welcome />} />
              <Route path="users" element={<Users />} />
              <Route path="createuser" element={<CreateUser />} />
              <Route path="edit-user/:userId" element={<EditUser />} />
              <Route path="edit-balance/:userId" element={<EditBalance />} />
              <Route path="createarcade" element={<CreateArcade />} />
              <Route path="machines" element={<Machines />} />
              <Route path="edit-machine/:machineId" element={<EditMachine />} />
              <Route path="transactions" element={<Transactions />} />
              <Route
                path="edit-transaction/:transactionId"
                element={<EditTransaction />}
              />
              <Route path="sessions" element={<Sessions />} />
              <Route path="expense" element={<CreateExpense />} />
              <Route path="qrcodes" element={<QrCodes />} />
              <Route path="rates" element={<ExchangeRates />} />

              <Route path="usage/:machineId" element={<MachineUsage />} />
              <Route path="accounting" element={<Accounting />} />
            </Route>
            {/* End Dash */}
          </Route>
        </Route>

        {/* Client Routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={["CLIENT", "ADMIN"]} />}>
            <Route path="clientdash" element={<ClientDashLayout />}>
              <Route index element={<WelcomeClient />} />
              <Route path="transactions" element={<ClientTransactions />} />
              <Route path="generate" element={<GenerateQR />} />
              <Route path="recoverqr/:id" element={<RecoverQR />}></Route>
              <Route path="sessions" element={<ClientGameSessions />}></Route>
              <Route path="statistics" element={<ClientMachineStatistics />} />
              <Route path="qrcodes" element={<ClientQrCodes />} />
              <Route path="profile" element={<ClientProfile />} />
              <Route path="support" element={<EmailContact />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
