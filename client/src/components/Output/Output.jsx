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
  const [code, setCode] = useState("");

  console.log(params.id);

  const handleScroll = () => {
    if (textareaRef.current && lineNumberRef.current) {
      lineNumberRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`${SERVER_BASE_URL}/bin/${params.id}`);
      const data = await response.json();
      setCode(Prism.highlight(
        data.html_content,
        Prism.languages.javascript,
        "javascript"
      ));
      setLines(data.html_content.split("\n"));
    };

    fetchData();
  }, [params.id]);



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
          <code
            className={`${styles.codespace__code} language-javascript`}
            dangerouslySetInnerHTML={{ __html: code }}
          />
        </pre>
      </div>
    </div>
  );
};

export default Output;
