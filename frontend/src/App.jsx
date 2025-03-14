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
//   const [showReview, setShowReview] = useState(false); // 👈 State for animation

//   async function reviewCode() {
//     console.log("Review button clicked! Sending request...");
//     try {
//       const response = await axios.post("http://localhost:3000/ai/get-review", { code });
//       console.log("Response received:", response.data);
//       setReview(response.data.response || "No review received.");
//       setShowReview(true); // 👈 Trigger animation
//     } catch (error) {
//       console.error("Error fetching review:", error);
//       setReview("❌ Error: Unable to fetch AI review.");
//       setShowReview(true); // 👈 Show error message with animation
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
//       <div className={`right ${showReview ? "show" : ""}`}>  {/* 👈 Dynamic class */}
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
  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`);
  const [review, setReview] = useState("Click 'Review' to analyze the code.");
  const [showReview, setShowReview] = useState(false);

  async function reviewCode() {
    console.log("Review button clicked! Sending request...");
    try {
      const response = await axios.post("http://localhost:3000/ai/get-review", { code });
      console.log("Response received:", response.data);
      setReview(response.data.response || "No review received.");
      setShowReview(true);
    } catch (error) {
      console.error("Error fetching review:", error);
      setReview("❌ Error: Unable to fetch the AI review.");
      setShowReview(true);
    }
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
        <div onClick={reviewCode} className="review">
          Review
        </div>
      </div>
      <div className={`right ${showReview ? "show" : ""}`}>
        <Markdown remarkPlugins={[remarkGfm]}>{review}</Markdown>
      </div>
    </main>
  );
}

export default App;

