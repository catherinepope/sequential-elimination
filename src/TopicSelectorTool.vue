<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
    <div class="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold mb-2 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Journal Topic Selector
        </h1>
        <p class="text-gray-600">Find the perfect topic for your next article</p>
      </div>

      <!-- Input Phase -->
      <div v-if="currentPhase === 'input'">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
            <span class="text-indigo-600 font-bold">1</span>
          </div>
          <div>
            <h2 class="text-2xl font-bold text-gray-800">Enter Your Potential Topics</h2>
            <p class="text-sm text-gray-500">List all topics you're considering</p>
          </div>
        </div>

        <div class="space-y-3">
          <div v-for="topic in topics" :key="topic.id" class="flex items-center gap-3">
            <input
              type="text"
              v-model="topic.title"
              @keyup.enter="addTopic"
              :ref="el => { if (el) topicInputs[topics.indexOf(topic)] = el }"
              placeholder="Enter a potential topic..."
              class="flex-grow px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 outline-none transition-all"
            />
            <button
              @click="removeTopic(topic.id)"
              class="px-4 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors font-medium"
            >
              Remove
            </button>
          </div>
        </div>

        <div class="flex justify-between mt-8 gap-4">
          <button
            @click="goToRatingPhase"
            class="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all font-semibold shadow-lg shadow-indigo-200"
          >
            Proceed to Rating →
          </button>
          <button
            @click="addTopic"
            class="px-8 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-semibold"
          >
            + Add Another Topic
          </button>
        </div>
      </div>

      <!-- Rating Phase -->
      <div v-if="currentPhase === 'rating'" class="mb-6">
        <h2 class="text-xl font-semibold mb-4">
          Phase 2: Rate Your Topics
        </h2>
        <p class="mb-4 text-gray-700">
          Rate each topic on a scale of 1-10 for each category.
        </p>

        <table class="w-full border-collapse mb-4">
          <thead>
            <tr class="bg-gray-100">
              <th class="p-2 text-left border">Topic</th>
              <th class="p-2 text-center border">
                Expertise
                <br />
                (1-10)
              </th>
              <th class="p-2 text-center border">
                Available Data
                <br />
                (1-10)
              </th>
              <th class="p-2 text-center border">
                Relevance
                <br />
                (1-10)
              </th>
              <th class="p-2 text-center border">
                Originality
                <br />
                (1-10)
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="topic in topics" :key="topic.id">
              <td class="p-2 border">{{ topic.title }}</td>
              <td class="p-2 border">
                <input
                  type="number"
                  min="1"
                  max="10"
                  v-model.number="topic.expertise"
                  class="w-full p-1 border rounded"
                />
              </td>
              <td class="p-2 border">
                <input
                  type="number"
                  min="1"
                  max="10"
                  v-model.number="topic.data"
                  class="w-full p-1 border rounded"
                />
              </td>
              <td class="p-2 border">
                <input
                  type="number"
                  min="1"
                  max="10"
                  v-model.number="topic.relevance"
                  class="w-full p-1 border rounded"
                />
              </td>
              <td class="p-2 border">
                <input
                  type="number"
                  min="1"
                  max="10"
                  v-model.number="topic.originality"
                  class="w-full p-1 border rounded"
                />
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Error message display -->
        <div v-if="errorMessage" class="mb-4 p-4 bg-red-50 border border-red-300 rounded-lg">
          <p class="text-red-700">{{ errorMessage }}</p>
        </div>

        <div class="flex justify-between mt-4">
          <button
            @click="goBackToInput"
            class="p-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Back to Topics
          </button>
          <button
            @click="eliminateTopics"
            class="p-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Eliminate Bottom 50%
          </button>
        </div>
      </div>

      <!-- Results Phase -->
      <div v-if="currentPhase === 'results'" class="mb-6">
        <h2 class="text-xl font-semibold mb-4">
          Phase 3: Your Top Topics
        </h2>
        <p class="mb-4 text-gray-700">
          These are your highest-rated topics after eliminating the bottom 50%.
        </p>

        <table class="w-full border-collapse mb-6">
          <thead>
            <tr class="bg-gray-100">
              <th class="p-2 text-left border">Topic</th>
              <th class="p-2 text-center border">Expertise</th>
              <th class="p-2 text-center border">Available Data</th>
              <th class="p-2 text-center border">Relevance</th>
              <th class="p-2 text-center border">Originality</th>
              <th class="p-2 text-center border">Total Score</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="topic in finalTopics" :key="topic.id" class="bg-green-50">
              <td class="p-2 border font-medium">{{ topic.title }}</td>
              <td class="p-2 border text-center">{{ topic.expertise }}</td>
              <td class="p-2 border text-center">{{ topic.data }}</td>
              <td class="p-2 border text-center">{{ topic.relevance }}</td>
              <td class="p-2 border text-center">{{ topic.originality }}</td>
              <td class="p-2 border text-center font-bold">
                {{ calculateScore(topic) }}
              </td>
            </tr>
          </tbody>
        </table>

        <h3 class="text-lg font-semibold mb-2">All Topics (Ranked)</h3>
        <table class="w-full border-collapse mb-4">
          <thead>
            <tr class="bg-gray-100">
              <th class="p-2 text-left border">Topic</th>
              <th class="p-2 text-center border">Total Score</th>
              <th class="p-2 text-center border">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="topic in sortedTopics"
              :key="topic.id"
              :class="topic.isEliminated ? 'bg-red-50' : 'bg-green-50'"
            >
              <td class="p-2 border">{{ topic.title }}</td>
              <td class="p-2 border text-center">
                {{ calculateScore(topic) }}
              </td>
              <td class="p-2 border text-center">
                <span
                  :class="topic.isEliminated ? 'text-red-600' : 'text-green-600'"
                >
                  {{ topic.isEliminated ? 'Eliminated' : 'Kept' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="mt-4">
          <button
            @click="resetTool"
            class="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Start Over
          </button>
        </div>

        <div class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded">
          <h3 class="text-lg font-semibold mb-2">Next Steps</h3>
          <p class="text-gray-700">
            For your top topics, consider these next actions:
          </p>
          <ul class="list-disc ml-6 mt-2">
            <li class="mb-1">
              Conduct preliminary literature reviews for each
            </li>
            <li class="mb-1">Sketch potential outlines or frameworks</li>
            <li class="mb-1">Consult with colleagues or mentors</li>
            <li class="mb-1">
              Consider practical constraints (time, resources, data access)
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue'

const topics = ref([
  {
    id: 1,
    title: '',
    expertise: 0,
    data: 0,
    relevance: 0,
    originality: 0,
    isEliminated: false,
  },
])

const currentPhase = ref('input')
const finalTopics = ref([])
const topicInputs = ref([])
const errorMessage = ref('')

// Add a new topic input field
const addTopic = async () => {
  const newId = topics.value.length + 1
  topics.value.push({
    id: newId,
    title: '',
    expertise: 0,
    data: 0,
    relevance: 0,
    originality: 0,
    isEliminated: false,
  })

  // Wait for DOM to update, then focus on the new input
  await nextTick()
  const lastInput = topicInputs.value[topicInputs.value.length - 1]
  if (lastInput) {
    lastInput.focus()
  }
}

// Remove a topic
const removeTopic = (id) => {
  topics.value = topics.value.filter((topic) => topic.id !== id)
}

// Move to rating phase
const goToRatingPhase = () => {
  // Filter out empty topics
  const validTopics = topics.value.filter((topic) => topic.title.trim() !== '')
  if (validTopics.length > 0) {
    topics.value = validTopics
    errorMessage.value = ''
    currentPhase.value = 'rating'
  } else {
    alert('Please enter at least one topic before proceeding.')
  }
}

// Calculate total score for a topic
const calculateScore = (topic) => {
  return topic.expertise + topic.data + topic.relevance + topic.originality
}

// Go back to input phase
const goBackToInput = () => {
  errorMessage.value = ''
  currentPhase.value = 'input'
}

// Eliminate bottom 50% of topics
const eliminateTopics = () => {
  // Clear any previous error message
  errorMessage.value = ''

  // Check if any topics have been rated
  const hasRatings = topics.value.some((topic) => calculateScore(topic) > 0)
  if (!hasRatings) {
    errorMessage.value = 'Please rate your topics before proceeding. Each topic needs ratings for Expertise, Available Data, Relevance, and Originality.'
    return
  }

  // Check if all topics have the same score
  const scores = topics.value.map((topic) => calculateScore(topic))
  const allEqual = scores.every((score) => score === scores[0])
  if (allEqual) {
    errorMessage.value = 'All topics have the same total score. Please adjust your ratings to create some differentiation between topics.'
    return
  }

  // Sort topics by score
  const sortedTopics = [...topics.value].sort(
    (a, b) => calculateScore(b) - calculateScore(a)
  )

  // Mark bottom 50% as eliminated
  const cutoffIndex = Math.floor(sortedTopics.length / 2)
  topics.value = topics.value.map((topic) => {
    const index = sortedTopics.findIndex((t) => t.id === topic.id)
    return {
      ...topic,
      isEliminated: index >= cutoffIndex,
    }
  })

  finalTopics.value = sortedTopics.slice(0, cutoffIndex)
  currentPhase.value = 'results'
}

// Reset the tool
const resetTool = () => {
  topics.value = [
    {
      id: 1,
      title: '',
      expertise: 0,
      data: 0,
      relevance: 0,
      originality: 0,
      isEliminated: false,
    },
  ]
  currentPhase.value = 'input'
  finalTopics.value = []
  errorMessage.value = ''
}

// Computed property for sorted topics
const sortedTopics = computed(() => {
  return [...topics.value].sort(
    (a, b) => calculateScore(b) - calculateScore(a)
  )
})
</script>
