import MainLayout from "../components/Common/MainLayout";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (


    <div className="2xl:max-w-7xl 2xl:mx-auto ">
      <div className="bg-white">
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
      </div>
    </div>
  );
}

export default MyApp;
