import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import WelcomeView from "./components/templates/WelcomeView"
import LoginForm from "./components/templates/LoginForm"
import RegisterForm from "./components/templates/RegisterForm"
import RecoverPassForm from "./components/templates/RecoverPassForm"
import ResetPassForm from "./components/templates/ResetPassForm"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />}>
        <Route index element={<WelcomeView />} />
        <Route path="login"  element={<LoginForm />} />
        <Route path="register"  element={<RegisterForm />} />
        <Route path="recover-password" element={<RecoverPassForm />} />
        <Route path="reset-password" element={<ResetPassForm />} />
      </Route>
    </Routes>
  )
}

export default App
