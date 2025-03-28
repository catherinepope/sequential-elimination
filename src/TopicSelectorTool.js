import React, { useState } from "react";

const TopicSelectorTool = () => {
  const [topics, setTopics] = useState([
    {
      id: 1,
      title: "",
      expertise: 0,
      data: 0,
      relevance: 0,
      originality: 0,
      isEliminated: false,
    },
  ]);
  const [currentPhase, setCurrentPhase] = useState("input");
  const [finalTopics, setFinalTopics] = useState([]);

  // Add a new topic input field
  const addTopic = () => {
    setTopics([
      ...topics,
      {
        id: topics.length + 1,
        title: "",
        expertise: 0,
        data: 0,
        relevance: 0,
        originality: 0,
        isEliminated: false,
      },
    ]);
  };

  // Handle topic title changes
  const handleTopicChange = (id, value) => {
    setTopics(
      topics.map((topic) =>
        topic.id === id ? { ...topic, title: value } : topic
      )
    );
  };

  // Handle rating changes
  const handleRatingChange = (id, category, value) => {
    setTopics(
      topics.map((topic) =>
        topic.id === id ? { ...topic, [category]: parseInt(value) } : topic
      )
    );
  };

  // Remove a topic
  const removeTopic = (id) => {
    setTopics(topics.filter((topic) => topic.id !== id));
  };

  // Move to rating phase
  const goToRatingPhase = () => {
    // Filter out empty topics
    const validTopics = topics.filter((topic) => topic.title.trim() !== "");
    if (validTopics.length > 0) {
      setTopics(validTopics);
      setCurrentPhase("rating");
    } else {
      alert("Please enter at least one topic before proceeding.");
    }
  };

  // Calculate total score for a topic
  const calculateScore = (topic) => {
    return topic.expertise + topic.data + topic.relevance + topic.originality;
  };

  // Eliminate bottom 50% of topics
  const eliminateTopics = () => {
    // Sort topics by score
    const sortedTopics = [...topics].sort(
      (a, b) => calculateScore(b) - calculateScore(a)
    );

    // Mark bottom 50% as eliminated
    const cutoffIndex = Math.floor(sortedTopics.length / 2);
    const updatedTopics = topics.map((topic) => {
      const index = sortedTopics.findIndex((t) => t.id === topic.id);
      return {
        ...topic,
        isEliminated: index >= cutoffIndex,
      };
    });

    setTopics(updatedTopics);
    setFinalTopics(sortedTopics.slice(0, cutoffIndex));
    setCurrentPhase("results");
  };

  // Reset the tool
  const resetTool = () => {
    setTopics([
      {
        id: 1,
        title: "",
        expertise: 0,
        data: 0,
        relevance: 0,
        originality: 0,
        isEliminated: false,
      },
    ]);
    setCurrentPhase("input");
    setFinalTopics([]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
        Journal Topic Selector Tool
      </h1>

      {currentPhase === "input" && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Phase 1: Enter Your Potential Topics
          </h2>
          <p className="mb-4 text-gray-700">
            Enter all potential topics you're considering for your journal
            article.
          </p>

          {topics.map((topic) => (
            <div key={topic.id} className="flex items-center mb-2">
              <input
                type="text"
                value={topic.title}
                onChange={(e) => handleTopicChange(topic.id, e.target.value)}
                placeholder="Enter a potential topic"
                className="flex-grow p-2 border rounded mr-2"
              />
              <button
                onClick={() => removeTopic(topic.id)}
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Remove
              </button>
            </div>
          ))}

          <div className="flex justify-between mt-4">
            <button
              onClick={addTopic}
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Another Topic
            </button>
            <button
              onClick={goToRatingPhase}
              className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Proceed to Rating
            </button>
          </div>
        </div>
      )}

      {currentPhase === "rating" && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Phase 2: Rate Your Topics
          </h2>
          <p className="mb-4 text-gray-700">
            Rate each topic on a scale of 1-10 for each category.
          </p>

          <table className="w-full border-collapse mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left border">Topic</th>
                <th className="p-2 text-center border">
                  Expertise
                  <br />
                  (1-10)
                </th>
                <th className="p-2 text-center border">
                  Available Data
                  <br />
                  (1-10)
                </th>
                <th className="p-2 text-center border">
                  Relevance
                  <br />
                  (1-10)
                </th>
                <th className="p-2 text-center border">
                  Originality
                  <br />
                  (1-10)
                </th>
              </tr>
            </thead>
            <tbody>
              {topics.map((topic) => (
                <tr key={topic.id}>
                  <td className="p-2 border">{topic.title}</td>
                  <td className="p-2 border">
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={topic.expertise}
                      onChange={(e) =>
                        handleRatingChange(
                          topic.id,
                          "expertise",
                          e.target.value
                        )
                      }
                      className="w-full p-1 border rounded"
                    />
                  </td>
                  <td className="p-2 border">
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={topic.data}
                      onChange={(e) =>
                        handleRatingChange(topic.id, "data", e.target.value)
                      }
                      className="w-full p-1 border rounded"
                    />
                  </td>
                  <td className="p-2 border">
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={topic.relevance}
                      onChange={(e) =>
                        handleRatingChange(
                          topic.id,
                          "relevance",
                          e.target.value
                        )
                      }
                      className="w-full p-1 border rounded"
                    />
                  </td>
                  <td className="p-2 border">
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={topic.originality}
                      onChange={(e) =>
                        handleRatingChange(
                          topic.id,
                          "originality",
                          e.target.value
                        )
                      }
                      className="w-full p-1 border rounded"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-between mt-4">
            <button
              onClick={() => setCurrentPhase("input")}
              className="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Back to Topics
            </button>
            <button
              onClick={eliminateTopics}
              className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Eliminate Bottom 50%
            </button>
          </div>
        </div>
      )}

      {currentPhase === "results" && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">
            Phase 3: Your Top Topics
          </h2>
          <p className="mb-4 text-gray-700">
            These are your highest-rated topics after eliminating the bottom
            50%.
          </p>

          <table className="w-full border-collapse mb-6">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left border">Topic</th>
                <th className="p-2 text-center border">Expertise</th>
                <th className="p-2 text-center border">Available Data</th>
                <th className="p-2 text-center border">Relevance</th>
                <th className="p-2 text-center border">Originality</th>
                <th className="p-2 text-center border">Total Score</th>
              </tr>
            </thead>
            <tbody>
              {finalTopics.map((topic) => (
                <tr key={topic.id} className="bg-green-50">
                  <td className="p-2 border font-medium">{topic.title}</td>
                  <td className="p-2 border text-center">{topic.expertise}</td>
                  <td className="p-2 border text-center">{topic.data}</td>
                  <td className="p-2 border text-center">{topic.relevance}</td>
                  <td className="p-2 border text-center">
                    {topic.originality}
                  </td>
                  <td className="p-2 border text-center font-bold">
                    {calculateScore(topic)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 className="text-lg font-semibold mb-2">All Topics (Ranked)</h3>
          <table className="w-full border-collapse mb-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left border">Topic</th>
                <th className="p-2 text-center border">Total Score</th>
                <th className="p-2 text-center border">Status</th>
              </tr>
            </thead>
            <tbody>
              {[...topics]
                .sort((a, b) => calculateScore(b) - calculateScore(a))
                .map((topic) => (
                  <tr
                    key={topic.id}
                    className={topic.isEliminated ? "bg-red-50" : "bg-green-50"}
                  >
                    <td className="p-2 border">{topic.title}</td>
                    <td className="p-2 border text-center">
                      {calculateScore(topic)}
                    </td>
                    <td className="p-2 border text-center">
                      <span
                        className={
                          topic.isEliminated ? "text-red-600" : "text-green-600"
                        }
                      >
                        {topic.isEliminated ? "Eliminated" : "Kept"}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          <div className="mt-4">
            <button
              onClick={resetTool}
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Start Over
            </button>
          </div>

          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
            <h3 className="text-lg font-semibold mb-2">Next Steps</h3>
            <p className="text-gray-700">
              For your top topics, consider these next actions:
            </p>
            <ul className="list-disc ml-6 mt-2">
              <li className="mb-1">
                Conduct preliminary literature reviews for each
              </li>
              <li className="mb-1">Sketch potential outlines or frameworks</li>
              <li className="mb-1">Consult with colleagues or mentors</li>
              <li className="mb-1">
                Consider practical constraints (time, resources, data access)
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopicSelectorTool;
