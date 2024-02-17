import { Routes, Route } from "react-router-dom";
import styles from "./Home.module.css";
import Header from "../../components/Header/Header";
import Editor from "../../components/Editor/Editor";
import Output from "../../components/Output/Output";

const Home = () => {
  return (
    <div className={styles.home}>
      <Header />
      <Routes>
        <Route path="/" element={<Editor />} />
        <Route path="/:id" element={<Output />} />
      </Routes>
    </div>
  );
};

export default Home;
