import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import Prism from "prismjs";
import styles from "./Output.module.css";
import "../prism-themes/prism-gruvbox-dark.css";
import { SERVER_BASE_URL } from "../../utils/constants";

const Output = ({ id }) => {
  const params = useParams();
  const textareaRef = useRef(null);
  const lineNumberRef = useRef(null);
  const [lines, setLines] = useState([]);
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("");

  const handleScroll = () => {
    if (textareaRef.current && lineNumberRef.current) {
      lineNumberRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  useEffect(() => {
    fetchData();
  }, [params.id]);

  useEffect(() => {
    Prism.highlightAll();
  }, [text, language]);

  const fetchData = async () => {
    const response = await fetch(`${SERVER_BASE_URL}/bin/${params.id}`);
    const data = await response.json();
    if (response.ok) {
      setLanguage(data.language);
      setLines(data.content.split("\n"));
      setText(data.content);
    }
  };

  return (
    <div className={styles.editor}>
      <div
        className={styles.line__numbers}
        ref={lineNumberRef}
        onScroll={handleScroll}
      >
        {lines.map((_, index) => (
          <div key={index + 1} className={styles.line__number}>
            {index + 1}
          </div>
        ))}
      </div>
      <div className={styles.codespace}>
        <pre className={styles.codespace__pre}>
          <code className={`${styles.codespace__code} language-${language}`}>
            {text}
          </code>
        </pre>
      </div>
    </div>
  );
};

export default Output;
