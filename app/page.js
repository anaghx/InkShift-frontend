"use client";

import React from "react";

// Assuming Header and other main components are defined in MainComponent.jsx
// or this is part of your main page.js file.

function MainComponent() {
  const [currentPage, setCurrentPage] = React.useState("home");

  const Header = ({ setCurrentPage }) => (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div
          onClick={() => setCurrentPage("home")}
          className="text-4xl font-bold text-gray-800 cursor-pointer"
        >
          InkShift
        </div>
        <nav className="flex space-x-8">
          <div
            onClick={() => setCurrentPage("blog")}
            className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
          >
            Blog Writer
          </div>
          <div
            onClick={() => setCurrentPage("report")}
            className="text-gray-600 hover:text-green-600 hover:bg-green-50 px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
          >
            Report Generator
          </div>
          <div
            onClick={() => setCurrentPage("marketing")}
            className="text-gray-600 hover:text-purple-600 hover:bg-purple-50 px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
          >
            Marketing Strategy
          </div>
        </nav>
      </div>
    </header>
  );










  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header setCurrentPage={setCurrentPage} />
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            AI-Powered Content Creation Suite
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Transform your content strategy with our intelligent AI tools
            designed for modern businesses
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-pen-nib text-3xl text-blue-600"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Blog Writer
            </h3>
            <p className="text-gray-600 mb-6">
              Generate engaging blog ideas, create detailed outlines, and write
              complete blog posts with AI assistance
            </p>
            <button
              onClick={() => setCurrentPage("blog")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200"
            >
              Try Now
            </button>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-chart-line text-3xl text-green-600"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Report Generator
            </h3>
            <p className="text-gray-600 mb-6">
              Create comprehensive reports and analysis documents with
              intelligent data processing and insights
            </p>
            <button
              onClick={() => setCurrentPage("report")}
              className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200"
            >
              Try Now
            </button>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 text-center">
            <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <i className="fas fa-bullseye text-3xl text-purple-600"></i>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Marketing Strategy
            </h3>
            <p className="text-gray-600 mb-6">
              Develop data-driven marketing strategies and campaigns tailored to
              your business goals
            </p>
            <button
              onClick={() => setCurrentPage("marketing")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-colors duration-200"
            >
              Try Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

















  const BlogWriterPage = () => {
    const [currentStep, setCurrentStep] = React.useState(1);
    const [input, setInput] = React.useState("");
    const [blogTitle, setBlogTitle] = React.useState(""); // To store generated title for next step
    const [blogOutline, setBlogOutline] = React.useState(""); // To store generated outline for next step
    const [tone, setTone] = React.useState(""); // For the 'Full Blog' step
    const [output, setOutput] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    // *** UPDATED API BASE URL ***
    const API_BASE_URL = "https://gw-clone.onrender.com";




    const steps = [
      {
        id: 1,
        title: "Generate Blog Ideas",
        placeholder: "Enter your topic or niche (e.g., 'sustainable living', 'AI in healthcare')...",
        apiEndpoint: `${API_BASE_URL}/blog_workflow/generate_blog_ideas`,
        inputKey: "blog_topic",
      },
      {
        id: 2,
        title: "Blog Outline",
        placeholder: "Enter your chosen blog idea or title (e.g., 'The Future of Remote Work')...",
        apiEndpoint: `${API_BASE_URL}/blog_workflow/generate_blog_outline`,
        inputKey: "blog_title",
      },
      {
        id: 3,
        title: "Full Blog",
        placeholder: "Review the outline and enter any specific requirements or details...",
        apiEndpoint: `${API_BASE_URL}/blog_workflow/generate_blog_content`,
        inputKey: "outline",
      },
    ];

    const currentStepConfig = steps.find((s) => s.id === currentStep);

    const handleGenerate = async () => {
      setIsLoading(true);
      setError(null);
      setOutput(""); // Clear previous output

      // Input validation based on step requirements
      if (currentStepConfig.inputKey === "blog_topic" && !input.trim()) {
        setError("Please enter a blog topic to generate ideas.");
        setIsLoading(false);
        return;
      }
      if (currentStepConfig.inputKey === "blog_title" && !input.trim()) {
        setError("Please enter a blog title to generate the outline.");
        setIsLoading(false);
        return;
      }
      if (currentStep === 3) {
        if (!blogTitle.trim()) {
            setError("Please provide the blog title for the full blog generation.");
            setIsLoading(false);
            return;
        }
        if (!input.trim()) { // input will hold the outline for step 3
            setError("Please provide the blog outline for the full blog generation.");
            setIsLoading(false);
            return;
        }
        if (!tone.trim()) {
            setError("Please provide a tone for the full blog generation.");
            setIsLoading(false);
            return;
        }
      }

      try {
        let requestBody = {};
        let apiEndpoint = currentStepConfig.apiEndpoint;

        if (currentStep === 1) {
          requestBody = { blog_topic: input };
        } else if (currentStep === 2) {
          requestBody = { blog_title: input };
        } else if (currentStep === 3) {
          requestBody = {
            title: blogTitle,
            outline: input,
            tone: tone,
          };
        }

        const response = await fetch(apiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'accept': 'application/json' // Add the accept header as seen in your curl
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          const errorData = await response.json();
          const errorMessage = errorData.detail?.[0]?.msg || response.statusText || "Failed to generate content.";
          throw new Error(errorMessage);
        }

        const data = await response.json();
        // Assuming the API returns a string directly (e.g., "Generated idea string")
        setOutput(data);

        // Store outputs for subsequent steps
        if (currentStep === 2) {
          setBlogOutline(data); // Store the generated outline
        }

      } catch (err) {
        console.error("API call error:", err);
        setError(err.message || "An unexpected error occurred during generation.");
        setOutput("");
      } finally {
        setIsLoading(false);
      }
    };




    const TextEditor = () => (
      <div className="flex space-x-2 mb-4 p-2 bg-gray-50 rounded-lg">
        <button className="p-2 hover: bg-gray-200 rounded" title="Bold">
          <i className="fas fa-bold"></i>
        </button>
        <button className="p-2 hover:bg-gray-200 rounded" title="Italic">
          <i className="fas fa-italic text-black"></i>
        </button>
        <button className="p-2 hover:bg-gray-200 rounded" title="Underline">
          <i className="fas fa-underline"></i>
        </button>
        <button className="p-2 hover:bg-gray-200 rounded" title="Bullet List">
          <i className="fas fa-list-ul"></i>
        </button>
        <button className="p-2 hover:bg-gray-200 rounded" title="Numbered List">
          <i className="fas fa-list-ol"></i>
        </button>
      </div>
    );

    // Effect to reset input/output/error when step changes
    React.useEffect(() => {
        setError(null);
        setIsLoading(false);
        setOutput("");
        if (currentStep === 1) {
            setInput("");
            setBlogTitle("");
            setBlogOutline("");
            setTone("");
        } else if (currentStep === 2) {
            setInput(blogTitle || ""); // Could pre-fill if title was set
        } else if (currentStep === 3) {
            setInput(blogOutline || ""); // Pre-fill with generated outline
        }
    }, [currentStep, blogOutline]);





    return (
      <div className="min-h-screen bg-gray-50">
        <Header setCurrentPage={setCurrentPage} />
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Blog Writer
            </h1>
            <div className="flex space-x-4">
              {steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(step.id)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                    currentStep === step.id
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-900 hover:bg-blue-50"
                  }`}
                >
                  {step.title}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Card */}
            <div className="bg-white rounded-lg shadow-md p-6 h-[470px] flex flex-col">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Input
              </h3>
              {/* Input field for blogTitle, visible only in Step 3 */}
              {currentStep === 3 && (
                <div className="mb-4">
                    <label htmlFor="blogTitle" className="block text-sm font-bold text-gray-900 mb-1 ">
                        Blog Title (from Step 1 ideas)
                    </label>
                    <input
                        type="text"
                        id="blogTitle"
                        value={blogTitle}
                        onChange={(e) => setBlogTitle(e.target.value)}
                        placeholder="e.g., '10 Ways AI Transforms Healthcare'"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-black placeholder-gray-500"
                    />
                </div>
              )}
              {/* Input field for Tone, visible only in Step 3 */}
              {currentStep === 3 && (
                <div className="mb-4">
                    <label htmlFor="tone" className="block text-sm font-bold text-gray-900 mb-1">
                        Tone (e.g., 'formal', 'casual', 'humorous')
                    </label>
                    <input
                        type="text"
                        id="tone"
                        value={tone}
                        onChange={(e) => setTone(e.target.value)}
                        placeholder="e.g., formal, casual, humorous"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-black placeholder-gray-500"
                    />
                </div>
              )}
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={currentStepConfig?.placeholder}
                className="flex-1 w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent  text-black placeholder-gray-500"
              />
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              <button
                onClick={handleGenerate}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                disabled={isLoading}
              >
                {isLoading ? "Generating..." : "Generate"}
              </button>
            </div>

            {/* Output Card */}
            <div className="bg-white rounded-lg shadow-md p-6 h-[470px] flex flex-col">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Output
              </h3>
              {/* TextEditor component as before */}
              <div className="flex space-x-2 mb-4 p-2 bg-gray-100 rounded-lg">
                <button className="p-2 hover:bg-gray-200 rounded" title="Bold">
                  <i className="fas fa-bold  text-black"></i>
                </button>
                <button className="p-2 hover:bg-gray-200 rounded" title="Italic">
                  <i className="fas fa-italic text-black"></i>
                </button>
               
                <button className="p-2 hover:bg-gray-200 rounded" title="Underline">
                  <i className="fas fa-underline text-black"></i>
                </button>
                <button className="p-2 hover:bg-gray-200 rounded" title="Bullet List">
                  <i className="fas fa-list-ul text-black"></i>
                </button>
                <button className="p-2 hover:bg-gray-200 rounded" title="Numbered List">
                  <i className="fas fa-list-ol text-black"></i>
                </button>
              </div>
              <div className="flex-1 w-full p-4 border border-gray-300 rounded-lg bg-gray-50 overflow-y-auto whitespace-pre-wrap text-gray-400">
                {output || "Generated content will appear here..."}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
















const ReportGeneratorPage = () => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [input, setInput] = React.useState("");
  const [output, setOutput] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false); // Add loading state
  const [error, setError] = React.useState(null);         // Add error state

  // New state variables for Report Generator specific inputs (matching API)
  const [reportType, setReportType] = React.useState("");
  const [reportTitle, setReportTitle] = React.useState("");
  const [subjectTopic, setSubjectTopic] = React.useState("");
  const [industryArea, setIndustryArea] = React.useState("");
  const [additionalContent, setAdditionalContent] = React.useState(""); // Matches 'additionalcontant' in your curl (typo 'contant' should be 'content')

  const API_BASE_URL = "https://gw-clone.onrender.com"; // Define API Base URL






  const steps = [
    {
      id: 1,
      title: "Create Report",
      placeholder: "Enter your data or upload file...",
      apiEndpoint: `${API_BASE_URL}/report/generate_report`,
      inputKeys: ["report_type", "report_title", "subject_topic", "industry_area", "additionalcontent"],
    },
  ];

  const currentStepConfig = steps.find((s) => s.id === currentStep);

  // Add the handleGenerate function for Report Generator
  const handleGenerate = async () => {
    setIsLoading(true);
    setError(null);
    setOutput("");

    // Basic validation (you can expand this)
    if (currentStep === 1) { // Assuming all inputs are gathered at Step 1
      if (!reportType.trim() || !reportTitle.trim() || !subjectTopic.trim() || !industryArea.trim()) {
        setError("Please fill in all required report details.");
        setIsLoading(false);
        return;
      }
    }

    try {
      let requestBody = {};
      const apiEndpoint = currentStepConfig.apiEndpoint;

      // Populate requestBody based on the inputs for the generate_report endpoint
      if (currentStep === 1) {
        requestBody = {
          report_type: reportType,
          report_title: reportTitle,
          subject_topic: subjectTopic,
          industry_area: industryArea,
          additionalcontant: additionalContent, // IMPORTANT: Use 'additionalcontant' to match your API's current schema.
                                                 // If you can fix your backend API, change it to 'additional_content' or 'additionalContent'
        };
      }

      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'accept': 'application/json'
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Backend Error Response (Report Generator):", errorData);
        // Extract a more specific message if available, otherwise use a generic one
        const errorMessage = errorData.detail?.includes("quota")
          ? "API Quota Exceeded. Please wait or check your plan."
          : errorData.detail?.[0]?.msg || response.statusText || "Failed to generate report.";
        throw new Error(errorMessage);
      }

      const data = await response.json();
      setOutput(data);

    } catch (err) {
      console.error("API call error (Report Generator):", err);
      setError(err.message || "An unexpected error occurred during report generation.");
      setOutput("");
    } finally {
      setIsLoading(false);
    }
  };

  // Effect to reset states when currentStep changes
  React.useEffect(() => {
    setError(null);
    setIsLoading(false);
    setOutput("");
    // Clear specific input fields if you want them fresh on step change
    if (currentStep === 1) { // Assuming it's a single step for now
      setReportType("");
      setReportTitle("");
      setSubjectTopic("");
      setIndustryArea("");
      setAdditionalContent("");
    }
  }, [currentStep]); // Add other dependencies if inputs are derived from other states

  // TextEditor component for the output area



  const TextEditor = () => (
    <div className="flex space-x-2 mb-4 p-2 bg-gray-100 rounded-lg">
      <button className="p-2 hover:bg-gray-200 rounded" title="Bold">
        <i className="fas fa-bold text-black"></i>
      </button>
      <button className="p-2 hover:bg-gray-200 rounded" title="Italic">
        <i className="fas fa-italic text-black"></i>
      </button>
      <button className="p-2 hover:bg-gray-200 rounded" title="Underline">
        <i className="fas fa-underline text-black"></i>
      </button>
      <button className="p-2 hover:bg-gray-200 rounded" title="Bullet List">
        <i className="fas fa-list-ul text-black"></i>
      </button>
      <button className="p-2 hover:bg-gray-200 rounded" title="Numbered List">
        <i className="fas fa-list-ol text-black"></i>
      </button>
    </div>
  );




  return (
    <div className="min-h-screen bg-gray-50">
      <Header setCurrentPage={setCurrentPage} />
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Report Generator
          </h1>
          <div className="flex space-x-4">
            {steps.map((step) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(step.id)}
                className={`px-6 py-3 rounded-lg font-semibold transition-colors duration-200 ${
                  currentStep === step.id
                    ? "bg-green-600 text-white"
                    : "bg-white text-gray-600 hover:bg-green-50"
                }`}
              >
                {step.title}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Card */}
          <div className="bg-white rounded-lg shadow-md p-6 h-[800px] flex flex-col">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Input
            </h3>
            {/* Input fields for report details, visible only in Step 1 */}
            {currentStep === 1 && (
              <>
                <p className="text-sm font-bold text-black mb-7 ">
                  Enter details for your report:
                </p>
                <p></p>
                <div className="mb-4">
                  <label htmlFor="reportType" className="block text-sm font-bold text-black mb-5">
                    Report Type 
                  </label>
                  <input
                    type="text"
                    id="reportType"
                    value={reportType}
                    onChange={(e) => setReportType(e.target.value)}
                    placeholder="e.g., 'Market Analysis'"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-black placeholder-gray-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="reportTitle" className="block text-sm font-bold text-black mb-5">
                    Report Title
                  </label>
                  <input
                    type="text"
                    id="reportTitle"
                    value={reportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                    placeholder="e.g., 'Q3 Sales Performance Overview'"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-black placeholder-gray-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="subjectTopic" className="block text-sm font-bold text-black mb-5">
                    Subject Topic
                  </label>
                  <input
                    type="text"
                    id="subjectTopic"
                    value={subjectTopic}
                    onChange={(e) => setSubjectTopic(e.target.value)}
                    placeholder="e.g., 'Impact of E-commerce on Retail'"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-black placeholder-gray-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="industryArea" className="block text-sm font-bold text-black mb-5">
                    Industry Area
                  </label>
                  <input
                    type="text"
                    id="industryArea"
                    value={industryArea}
                    onChange={(e) => setIndustryArea(e.target.value)}
                    placeholder="e.g., 'Fintech'"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-black placeholder-gray-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="additionalContent" className="block text-sm font-bold text-black mb-5">
                    Specific Requirements (Optional)
                  </label>
                  <textarea
                    id="additionalContent"
                    value={additionalContent}
                    onChange={(e) => setAdditionalContent(e.target.value)}
                    placeholder="e.g., 'Include competitive analysis data from 2023-2024.'"
                    rows="3" // Adjust rows as needed
                    className="w-full p-3 border border-gray-300 rounded-lg resize-y focus:ring-2 focus:ring-green-500 focus:border-transparent text-black placeholder-gray-500"
                  />
                </div>
              </>
            )}

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button
              onClick={handleGenerate}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate Report"}
            </button>
          </div>

          {/* Output Card */}
          <div className="bg-white rounded-lg shadow-md p-6 h-[800px] flex flex-col">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Output
            </h3>
            <TextEditor />
            <div className="flex-1 w-full p-4 border border-gray-300 rounded-lg bg-gray-50 overflow-y-auto whitespace-pre-wrap text-gray-400">
              {output || "Generated report will appear here..."}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


















  const MarketingStrategyPage = () => {
    const [currentStep, setCurrentStep] = React.useState(1);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);

    const API_BASE_URL = "https://gw-clone.onrender.com"; // Same API base URL

    // 12 steps for marketing strategy
    const steps = [
      {
        id: 1,
        title: "Marketing Objectives",
        placeholder: "What are your primary marketing objectives?",
        apiEndpoint: `${API_BASE_URL}/marketing_strategy/Define_Marketing_Objectives_prompt`,
        inputKey: "brand_product",
      },
      {
        id: 2,
        title: "Target Audience",
        placeholder: "Enter target audience...",
        apiEndpoint: `${API_BASE_URL}/marketing_strategy/Identify_Your_Target_Audience_prompt`,
        inputKey: "Product_Service",

      },
      {
        id: 3,
        title: "Competitive Landscape",
        placeholder: "Describe your Industry...",
        apiEndpoint: `${API_BASE_URL}/marketing_strategy/Analyze_the_Competitive_Landscape_prompt`,
        inputKey: "Industry_Topic",
      },
      {
        id: 4,
        title: "Value Proposition",
        placeholder: "Define your unique value...",
        apiEndpoint: `${API_BASE_URL}/marketing/value_proposition`,
        inputKey: "Target_audiance",
      },
      {
        id: 5,
        title: "Brand Positioning",
        placeholder: "Enter brand positioning strategy...",
        apiEndpoint: `${API_BASE_URL}/marketing/brand_positioning`,
        inputKey: "brand_product",
      },
      {
        id: 6,
        title: "Marketing Channels",
        placeholder: "List preferred marketing channels...",
        apiEndpoint: `${API_BASE_URL}/marketing/marketing_channels`,
        inputKey: "Marketing_Objectives",
      },
      {
        id: 7,
        title: "Content Strategy",
        placeholder: "Describe content approach...",
        apiEndpoint: `${API_BASE_URL}/marketing/content_strategy`,
        inputKey: "Marketing_Objectives",
      },
      {
        id: 8,
        title: "Budget Planning",
        placeholder: "Enter budget constraints...",
        apiEndpoint: `${API_BASE_URL}/marketing/budget_planning`,
        inputKey: "Marketing_Objectives",
      },
      {
        id: 9,
        title: "Campaign Timeline",
        placeholder: "Define campaign schedule...",
        apiEndpoint: `${API_BASE_URL}/marketing/campaign_timeline`,
        inputKey: "brand_product",
      },
      {
        id: 10,
        title: "KPIs & Metrics",
        placeholder: "List success metrics...",
        apiEndpoint: `${API_BASE_URL}/marketing/kpis_metrics`,
        inputKey: "Marketing_Objectives",
      },
      {
        id: 11,
        title: "Risk Assessment",
        placeholder: "Identify potential risks...",
        apiEndpoint: `${API_BASE_URL}/marketing/risk_assessment`,
        inputKey: "Marketing_Campaigns_and_Products",
      },
      {
        id: 12,
        title: "Implementation Plan",
        placeholder: "Enter implementation details...",
        apiEndpoint: `${API_BASE_URL}/marketing/implementation_plan`,
        inputKey: "Performance_Measurement_and_Analytics",
      },
    ];

    const [inputs, setInputs] = React.useState(
      steps.reduce((acc, step) => ({ ...acc, [step.id]: "" }), {}),
    );
    const [outputs, setOutputs] = React.useState(
      steps.reduce((acc, step) => ({ ...acc, [step.id]: "" }), {}),
    );

    const currentStepData = steps.find((step) => step.id === currentStep);

    const handleGenerate = async () => {
      if (!inputs[currentStep]?.trim()) {
        setError("Please enter some input before generating");
        return;
      }
      setLoading(true);
      setError(null);

      try {
        const apiEndpoint = currentStepData.apiEndpoint;

        const requestBody = {
          step: currentStep,
          step_title: currentStepData.title,
          input_content: inputs[currentStep],
          // Include previous steps context
          previous_steps: Object.keys(outputs)
            .filter((key) => parseInt(key) < currentStep && outputs[key])
            .reduce(
              (acc, key) => ({
                ...acc,
                [`step_${key}`]: outputs[key],
              }),
              {},
            ),
        };

        const response = await fetch(apiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error(
            "Backend Error Response (Marketing Strategy):",
            errorData,
          );
          const errorMessage = errorData.detail?.includes("quota")
            ? "API Quota Exceeded. Please wait or check your plan."
            : errorData.detail?.[0]?.msg ||
              response.statusText ||
              "Failed to generate marketing strategy.";
          throw new Error(errorMessage);
        }

        const data = await response.json();

        setOutputs((prev) => ({
          ...prev,
          [currentStep]:
            data.result ||
            data.content ||
            data.output ||
            data ||
            "No content generated",
        }));
      } catch (err) {
        console.error("API call error (Marketing Strategy):", err);
        setError(
          err.message ||
            "An unexpected error occurred during strategy generation.",
        );

        // Fallback to demo content if API fails
        setOutputs((prev) => ({
          ...prev,
          [currentStep]: `Generated content for ${currentStepData.title}:\n\nThis is sample output based on your input: "${inputs[currentStep]}"\n\nDetailed analysis and recommendations would appear here...`,
        }));
      } finally {
        setLoading(false);
      }
    };

    // Reset error when step changes
    React.useEffect(() => {
      setError(null);
    }, [currentStep]);

    const TextEditor = () => (
      <div className="flex space-x-2 mb-4 p-2 bg-gray-100 rounded-lg">
        <button className="p-2 hover:bg-gray-200 rounded" title="Bold">
          <i className="fas fa-bold text-black"></i>
        </button>
        <button className="p-2 hover:bg-gray-200 rounded" title="Italic">
          <i className="fas fa-italic text-black"></i>
        </button>
        <button className="p-2 hover:bg-gray-200 rounded" title="Underline">
          <i className="fas fa-underline text-black"></i>
        </button>
        <button className="p-2 hover:bg-gray-200 rounded" title="Bullet List">
          <i className="fas fa-list-ul text-black"></i>
        </button>
        <button className="p-2 hover:bg-gray-200 rounded" title="Numbered List">
          <i className="fas fa-list-ol text-black"></i>
        </button>
      </div>
    );

    return (
      <div className="min-h-screen bg-gray-50">
        <Header setCurrentPage={setCurrentPage} />
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* NEW DROPDOWN SECTION */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              Marketing Strategy
            </h1>

            <div className="flex gap-4 items-center flex-wrap mb-4">
              <label className="text-sm font-medium text-gray-700">
                Current Step:
              </label>
              <select
                value={currentStep}
                onChange={(e) => setCurrentStep(parseInt(e.target.value))}
                className="px-3 py-2 rounded-lg border border-gray-300 text-sm text-black bg-white min-w-64 shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {steps.map((step) => (
                  <option key={step.id} value={step.id}>
                    Step {step.id}: {step.title}
                  </option>
                ))}
              </select>

              <div className="flex gap-2">
                <button
                  onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                  disabled={currentStep === 1}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    currentStep === 1
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gray-600 hover:bg-gray-700 text-white"
                  }`}
                >
                  ← Previous
                </button>
                <button
                  onClick={() =>
                    setCurrentStep(Math.min(steps.length, currentStep + 1))
                  }
                  disabled={currentStep === steps.length}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    currentStep === steps.length
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gray-600 hover:bg-gray-700 text-white"
                  }`}
                >
                  Next →
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="bg-gray-200 rounded-lg h-2 mb-2">
              <div
                className="bg-purple-600 rounded-lg h-full transition-all duration-300 ease-out"
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              />
            </div>
            <div className="text-sm text-gray-600">
              Step {currentStep} of {steps.length} - {currentStepData?.title}
            </div>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <i className="fas fa-exclamation-triangle mr-2"></i>
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            {/* Input Card */}
            <div className="bg-white rounded-lg shadow-md p-6 h-[500px] flex flex-col">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Input - {currentStepData?.title}
              </h3>
              <textarea
                value={inputs[currentStep] || ""}
                onChange={(e) =>
                  setInputs((prev) => ({
                    ...prev,
                    [currentStep]: e.target.value,
                  }))
                }
                placeholder={currentStepData?.placeholder}
                className="flex-1 w-full p-4 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="mt-4 bg-purple-600 hover:bg-purple-700 disabled:bg-purple-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Generating...
                  </>
                ) : (
                  <>
                    <i className="fas fa-magic mr-2"></i>
                    Generate
                  </>
                )}
              </button>
            </div>

            {/* Output Card */}
            <div className="bg-white rounded-lg shadow-md p-6 h-[500px] flex flex-col">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Output - {currentStepData?.title}
              </h3>
              <TextEditor />
              <div className="flex-1 w-full p-4 border border-gray-300 rounded-lg text-gray-400 bg-gray-50 overflow-y-auto whitespace-pre-wrap">
                {loading ? (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    Generating content...
                  </div>
                ) : (
                  outputs[currentStep] ||
                  "Generated strategy will appear here..."
                )}
              </div>
              {outputs[currentStep] && (
                <button
                  onClick={() =>
                    navigator.clipboard.writeText(outputs[currentStep])
                  }
                  className="mt-4 bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center"
                >
                  <i className="fas fa-copy mr-2"></i>
                  Copy to Clipboard
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  const renderCurrentPage = () => {
    switch (currentPage) {
      case "blog":
        return <BlogWriterPage />;
      case "report":
        return <ReportGeneratorPage />;
      case "marketing":
        return <MarketingStrategyPage />;
      default:
        return <LandingPage />;
    }
  };

  return renderCurrentPage();
}

export default MainComponent;