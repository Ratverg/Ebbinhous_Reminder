import React from "react";
import FooterBlock from "./components/layout/FooterBlock";
import HeaderBlock from "./components/layout/HeaderBlock";
import { UserProvider } from "./features/auth/context/UserProvider";
import ContentMainFrameBlockUserPage from "./components/layout/ContentMainFrameBlockUserPage";
import { NotificationProvider } from "./features/notification-manager/context/NotificationProvider";
// import { Test } from "./features/notification-manager/components/Test";
import { TGBotProvider } from "./features/tg-bot/context/TGBotProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContentSection01 from "./features/content/components/ContentSection01";
import ContentMainFrameBlock from "./components/layout/ContentMainFrameBlock";
import HeroBlock from "./components/layout/HeroBlock";
import HeroBackground from "./components/layout/HeroBackground";
import ContentMainFrameAboutBlock from "./components/layout/ContentMainFrameBlockAboutPage";


const Home = () => (
  <div className="bg-background w-auto min-h-screen flex flex-col gap-4 ">
    <HeroBackground />
    <HeaderBlock />
    <HeroBlock />
    <ContentMainFrameBlock />
    <FooterBlock />
  </div>
)
const About = () => (
  <div className="bg-background w-auto h-auto flex flex-col gap-4">
    {/* <HeroBackground/> */}
    <HeaderBlock />
    <ContentMainFrameAboutBlock />
    <FooterBlock />
  </div>
)
const Userpage = () => (
  <div className="bg-background w-auto h-auto flex flex-col gap-4">
    {/* <HeroBackground/> */}
    <HeaderBlock />
    <ContentMainFrameBlockUserPage />
    <FooterBlock />
  </div>
)


function App() {

  return (
    <BrowserRouter>
      <UserProvider>
        <NotificationProvider>
          <TGBotProvider>
            {/* <Test /> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/userpage" element={<Userpage />} />
            </Routes>
            {/* <HeroBlock /> */}
            {/* <ContentMainFrameBlock /> */}
            {/* <ContentMainFrameBlockUserPage /> */}
          </TGBotProvider>
        </NotificationProvider>
      </UserProvider>
    </BrowserRouter>
  )
}
export default App;

// function App() {

//   return (
//     <Test />
//   )
// }




