// import { useState } from "react";
// import "./App.css";
// import Prism from "prismjs";
// import Editor from "react-simple-code-editor";
// import "prismjs/themes/prism-tomorrow.css";
// import "prismjs/components/prism-jsx";
// import "highlight.js/styles/github-dark.css";
// import Markdown from "react-markdown";
// import remarkGfm from "remark-gfm"; 
// import axios from "axios";

// function App() {
//   const [code, setCode] = useState(`function sum() {
//   return 1 + 1;
// }`);

//   const [review, setReview] = useState("Click 'Review' to analyze the code.");

//   async function reviewCode() {
//     try {
//       const response = await axios.post("http://localhost:3000/ai/get-review", { code });
//       setReview(response.data.response || "No review received.");
//     } catch (error) {
//       console.error("Error fetching review:", error);
//       setReview("❌ Error: Unable to fetch AI review.");
//     }
//   }

//   return (
//     <main className="container">
//       <div className="left">
//         <div className="code">
//           <Editor
//             value={code}
//             onValueChange={(newCode) => setCode(newCode)}
//             highlight={(code) => Prism.highlight(code, Prism.languages.javascript, "javascript")}
//             padding={10}
//             style={{
//               fontFamily: '"Fira Code", "Fira Mono", monospace',
//               fontSize: 16,
//               color: "#ffffff",
//               borderRadius: "5px",
//               background: "#2d2d2d",
//               minHeight: "200px",
//             }}
//           />
//         </div>
//         <div onClick={reviewCode} className="review">
//           Review
//         </div>
//       </div>
//       <div className="right">
//         <Markdown remarkPlugins={[remarkGfm]}>{review}</Markdown>
//       </div>
//     </main>
//   );
// }

// export default App;

import { useState } from "react";
import "./App.css";
import Prism from "prismjs";
import Editor from "react-simple-code-editor";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-jsx";
import "highlight.js/styles/github-dark.css";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import axios from "axios";

function App() {
  const [code, setCode] = useState("");
  const [review, setReview] = useState("");
  const [showReview, setShowReview] = useState(false);
  const [animatedReview, setAnimatedReview] = useState("");

  async function reviewCode() {
    try {
      console.log("Sending request with code:", code);
      const response = await axios.post("http://localhost:3000/ai/get-review", { code });

      if (response.data.response) {
        setReview(response.data.response);
        setShowReview(true);
        animateReview(response.data.response);
      } else {
        setReview("⚠️ No review received.");
      }
    } catch (error) {
      console.error("Error fetching review:", error.response?.data || error.message);
      setReview("❌ Error: Unable to fetch AI review.");
      setShowReview(true);
      animateReview("❌ Error: Unable to fetch AI review.");
    }
  }

  function animateReview(fullText) {
    setAnimatedReview("");
    let i = 0;
    const interval = setInterval(() => {
      if (i < fullText.length) {
        setAnimatedReview((prev) => prev + fullText[i]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 25); // Adjust speed for effect
  }

  return (
    <main className="container">
      <div className="left">
        <div className="code">
          <Editor
            value={code}
            onValueChange={(newCode) => setCode(newCode)}
            highlight={(code) => Prism.highlight(code, Prism.languages.javascript, "javascript")}
            padding={10}
            placeholder="Paste your code here..."
            style={{
              fontFamily: '"Fira Code", "Fira Mono", monospace',
              fontSize: 16,
              color: "#ffffff",
              borderRadius: "5px",
              background: "#2d2d2d",
              minHeight: "200px",
            }}
          />
        </div>
        <button onClick={reviewCode} className="review">Review</button>
      </div>
      <div className={`right ${showReview ? "show" : ""}`}>
        <Markdown remarkPlugins={[remarkGfm]}>{animatedReview}</Markdown>
      </div>
    </main>
  );
}

export default App;
