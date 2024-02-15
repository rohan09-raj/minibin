import { useState, useRef } from 'react'
import styles from './Editor.module.css'

const Editor = () => {
  const [text, setText] = useState('')
  const textareaRef = useRef(null)
  const lineNumberRef = useRef(null)

  const handleTextChange = (event) => {
    setText(event.target.value)
  }

  const handleScroll = () => {
    if (textareaRef.current && lineNumberRef.current) {
      lineNumberRef.current.scrollTop = textareaRef.current.scrollTop
    }
  }

  const lines = text.split('\n')

  return (
    <div className={styles.editor__container}>
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
        value={text}
        onChange={handleTextChange}
        onScroll={handleScroll}
        ref={textareaRef}
        placeholder="Type your text here..."
      />
    </div>
  )
}

export default Editor
