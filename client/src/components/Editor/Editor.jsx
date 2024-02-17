import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Prism from "prismjs";
import styles from "./Editor.module.css";
import "../prism-themes/prism-gruvbox-dark.css";
import { SERVER_BASE_URL, SUPPORTED_LANGUAGES } from "../../utils/constants";

const Editor = () => {
  const navigate = useNavigate();
  const [text, setText] = useState("");
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("js");
  const textareaRef = useRef(null);
  const lineNumberRef = useRef(null);

  const handleTextChange = (event) => {
    setText(event.target.value);
    setCode(
      Prism.highlight(
        event.target.value,
        Prism.languages[language],
        language.toString()
      )
    );
  };

  const handleScroll = () => {
    if (textareaRef.current && lineNumberRef.current) {
      lineNumberRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleClick = () => {
    fetch(`${SERVER_BASE_URL}/bin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        html_content: text,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        navigate(`/${data.id}`);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
    setCode(
      Prism.highlight(
        text,
        Prism.languages[event.target.value],
        event.target.value.toString()
      )
    );
  }


  const lines = text.split("\n");

  return (
    <div className={styles.container}>
      <select onChange={(event) => handleLanguageChange(event)}>
        {Object.keys(SUPPORTED_LANGUAGES).map((language) => (
          <option key={language} value={language}>
            {SUPPORTED_LANGUAGES[language]}
          </option>
        ))}
      </select>
      <button onClick={() => handleClick()}>Click me</button>
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
          <textarea
            className={styles.codespace__textarea}
            onChange={handleTextChange}
            onScroll={handleScroll}
            ref={textareaRef}
            placeholder="Type your text here..."
          />
          <pre className={styles.codespace__pre}>
            <code
              className={`${styles.codespace__code} language-javascript`}
              dangerouslySetInnerHTML={{ __html: code }}
            />
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Editor;
