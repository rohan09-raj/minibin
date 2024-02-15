import { useState, useRef } from "react";
import Prism from "prismjs";
import styles from "./Editor.module.css";
import './prism-gruvbox-dark.css';

const Editor = () => {
  const [text, setText] = useState("");
  const textareaRef = useRef(null);
  const lineNumberRef = useRef(null);

  const handleTextChange = (event) => {
    const code = Prism.highlight(
      event.target.value,
      Prism.languages.javascript,
      "javascript"
    );
    setText(code);
  };

  const handleScroll = () => {
    if (textareaRef.current && lineNumberRef.current) {
      lineNumberRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const lines = text.split("\n");

  return (
    <div className={styles.editor}>
      <div
        className={styles.line__numbers}
        ref={lineNumberRef}
        onScroll={handleScroll}
      >
        {lines.map((_, index) => (
          <div key={index + 1} className="line-number">
            {index + 1}
          </div>
        ))}
      </div>
      <textarea
        className={styles.editor__textarea}
        onChange={handleTextChange}
        onScroll={handleScroll}
        ref={textareaRef}
        placeholder="Type your text here..."
      />
      <div>
        <pre className={styles.code}>
          <code
            className="language-javascript"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </pre>
      </div>
    </div>
  );
};

export default Editor;
