import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const Home = () => {
  const [idea, setIdea] = useState("");
  const [category, setCategory] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    setResult("");
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openai/gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Write a clean and responsive HTML landing page for a ${category} product called '${idea}'.
                The page should include:
                - A Bold heading
                - A short subheading
                - Three features card
                - A call-to-action button
                Use plain HTML and Tailwind CSS. Return only valid HTML.
                `,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );
    setResult(response.data.choices[0].message.content);
    setLoading(false);
  };
  const copyCode = () => {
    navigator.clipboard.writeText(result);
    toast.success("Copied to Clipboard");
  };

  return (
    <div className="min-h-screen bg-[rgb(246,245,255)] px-4 py-10 font-sans">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl border-2 border-gray-100 p-8 ">
        <h1 className="text-2xl text-purple-800 font-bold text-center mb-6">
          AI Landing Page Generator
        </h1>
        <input
          type="text"
          placeholder="Enter your idea.."
          className="w-full p-2.5 border border-gray-300 rounded shadow-lg mt-4"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
        />
        <select
          className="w-full p-2.5 border border-gray-300 rounded shadow-lg mt-4"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="AI Saas">AI Saas</option>
          <option value="Productivity Tool">Productivity Tool</option>
          <option value="Startup">Startup</option>
        </select>
        <button
          className="w-full p-2.5 bg-purple-700 hover:bg-purple-800 rounded shadow-lg mt-4 text-white font-bold cursor-pointer"
          onClick={handleGenerate}
        >
          {loading ? "Generating..." : "Generate Landing Page"}
        </button>
        {result && (
          <div className="mt-10">
            <h1 className="text-xl font-bold mb-3">Live Preview</h1>
            <div
              dangerouslySetInnerHTML={{ __html: result }}
              className="border p-5 rounded-lg shadow-xl"
            />
            <div className="mt-6">
              <h1 className="text-lg font-semibold mb-2">HTML Code:</h1>
              <button
                className="bg-gray-700 hover:bg-gray-800 px-4 py-2 rounded shadow-lg fnt-bold text-white"
                onClick={copyCode}
              >
                Copy Code
              </button>
              <pre className="bg-black p-4 rounded-md shadow-lg overflow-x-auto mt-6 text-sm text-white">
                {result}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
