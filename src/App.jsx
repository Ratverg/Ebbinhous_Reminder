import HeaderBlock from "./components/HeaderBlock";
import HeroBlock from "./components/HeroBlock";
import ContentMainFrameBlock from "./components/ContentMainFrameBlock";
import FooterBlock from "./components/FooterBlock";
import ContentMainFrameBlockUserPage from "./components/ContentMainFrameBlockUserPage";


function App() {

  return (
    <>
      <HeaderBlock />
      {/* <HeroBlock /> */}
      {/* <ContentMainFrameBlock /> */}
      <ContentMainFrameBlockUserPage />
      <FooterBlock />
    </>
  )
}

export default App;
