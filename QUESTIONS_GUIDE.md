# Questions Guide - RAG Chatbot

This guide explains what questions you can ask, what questions you cannot ask, and how to get the best responses from the chatbot.

## How to Ask Questions

1. Type your question in the input field at the bottom
2. Press Enter or click the Send button
3. Wait for the response (1-2 seconds simulated delay)
4. Click on citations to view source documents
5. Continue the conversation by asking follow-up questions

## Questions You CAN Ask

### 1. Conversational Questions (No Citations)

These questions get friendly responses but no document citations:

**Greetings:**
- "hi"
- "hello"
- "hey"
- "greetings"
- "good morning"
- "good afternoon"
- "good evening"

**Casual Questions:**
- "how are you"
- "how's it going"
- "how do you do"
- "what's up"

**About the Chatbot:**
- "what is your name"
- "what's your name"
- "who are you"
- "introduce yourself"
- "what do you do"
- "what can you do"
- "what are you"
- "your purpose"
- "your function"

**Politeness:**
- "thank you"
- "thanks"
- "thank"
- "appreciate"

**Farewells:**
- "bye"
- "goodbye"
- "see you"
- "farewell"

### 2. React Questions

Ask about React library, components, hooks, and best practices:

**Examples:**
- "what is react"
- "what is react js"
- "what is react.js"
- "explain react"
- "react components"
- "react hooks"
- "react best practices"
- "how to use react"

**Response:** Information about React library, functional components, hooks, and state management.

**Note:** Questions about "react router", "react query", "react hook form", or "react testing library" are handled separately (see below).

### 3. TypeScript Questions

Ask about TypeScript, types, interfaces, and generics:

**Examples:**
- "what is typescript"
- "typescript types"
- "typescript interfaces"
- "typescript generics"
- "explain typescript"

**Response:** Information about TypeScript, static typing, interfaces, and generics.

### 4. UI & Styling Libraries

Ask about any of these styling solutions:

**Supported Libraries:**
- Tailwind CSS
- ShadCN UI
- Material UI (MUI)
- Ant Design
- Bootstrap
- Styled-Components
- CSS Modules

**Examples:**
- "what is tailwind"
- "tailwind css"
- "explain shadcn ui"
- "material ui components"
- "ant design"
- "bootstrap"
- "styled-components"
- "css modules"
- "how to style react components"

**Response:** Overview of UI and styling solutions with comparisons.

### 5. State Management

Ask about state management libraries:

**Supported Libraries:**
- Redux Toolkit
- Zustand
- MobX
- Recoil

**Examples:**
- "what is redux"
- "redux toolkit"
- "zustand"
- "mobx"
- "recoil"
- "state management"
- "how to manage state"

**Response:** Information about different state management solutions and when to use them.

**Note:** Questions about React's built-in "useState" are not specifically handled but may get general responses.

### 6. Forms & Validation

Ask about form handling and validation libraries:

**Supported Libraries:**
- React Hook Form
- Formik
- Zod
- Yup

**Examples:**
- "react hook form"
- "hook form"
- "formik"
- "zod validation"
- "yup"
- "form validation"
- "how to handle forms"

**Response:** Information about form libraries and validation approaches.

**Note:** Questions about native HTML forms are not specifically handled.

### 7. Data Fetching

Ask about API and data fetching libraries:

**Supported Libraries:**
- Axios
- Fetch API
- React Query (TanStack Query)
- SWR

**Examples:**
- "axios"
- "fetch api"
- "react query"
- "tanstack query"
- "swr"
- "data fetching"
- "how to fetch data"
- "api calls"

**Response:** Information about data fetching libraries, caching, and best practices.

**Note:** Questions about native Fetch API are handled but may get general responses.

### 8. Routing

Ask about routing solutions:

**Supported Libraries:**
- React Router
- Next.js Router

**Examples:**
- "react router"
- "next.js"
- "next js"
- "nextjs"
- "routing in react"
- "how to route"

**Response:** Information about routing solutions for React applications.

**Note:** The chatbot recognizes "next.js", "next js", and "nextjs" as valid queries for Next.js routing information.

### 9. Charts & Visualization

Ask about charting and data visualization libraries:

**Supported Libraries:**
- Chart.js
- Recharts
- D3.js

**Examples:**
- "chart.js"
- "recharts"
- "d3"
- "d3.js"
- "charts"
- "data visualization"
- "graphs"
- "how to create charts"

**Response:** Information about charting libraries and visualization options.

### 10. Animation Libraries

Ask about animation libraries:

**Supported Libraries:**
- Framer Motion
- GSAP

**Examples:**
- "framer motion"
- "framer"
- "gsap"
- "animations in react"
- "how to animate"

**Response:** Information about animation libraries and their use cases.

### 11. Utility Libraries

Ask about utility libraries:

**Supported Libraries:**
- Lodash
- Moment.js
- Day.js
- UUID

**Examples:**
- "lodash"
- "moment"
- "moment.js"
- "dayjs"
- "day.js"
- "uuid"
- "utility functions"

**Response:** Information about utility libraries and their purposes.

### 12. Testing

Ask about testing frameworks:

**Supported Libraries:**
- Jest
- React Testing Library

**Examples:**
- "jest"
- "react testing library"
- "testing react"
- "how to test"
- "unit testing"

**Response:** Information about testing frameworks and strategies.

### 13. RAG Architecture

Ask about RAG (Retrieval-Augmented Generation):

**Examples:**
- "what is rag"
- "rag architecture"
- "retrieval augmented generation"
- "how does rag work"

**Response:** Information about RAG systems and how they work.

### 14. Performance Optimization

Ask about frontend performance:

**Examples:**
- "performance optimization"
- "code splitting"
- "memoization"
- "lazy loading"
- "how to optimize"
- "bundle size"
- "page load speed"

**Response:** Information about performance optimization techniques.

### 15. General Questions

You can ask any question, even if it doesn't match specific topics:

**Examples:**
- "what is javascript"
- "explain web development"
- "frontend development"
- Any other question

**Response:** 
- If keywords match any document, you'll get relevant citations
- If no match, you'll get a helpful response explaining what topics are available
- The chatbot will suggest rephrasing with specific technology names

## Questions You CANNOT Ask

### 1. Questions Outside Knowledge Base

The chatbot only has information about:
- React and TypeScript
- UI/Styling libraries (Tailwind, ShadCN, MUI, Ant Design, Bootstrap, Styled-Components, CSS Modules)
- State Management (Redux, Zustand, MobX, Recoil)
- Forms & Validation (React Hook Form, Formik, Zod, Yup)
- Data Fetching (Axios, Fetch, React Query, SWR)
- Routing (React Router, Next.js)
- Charts (Chart.js, Recharts, D3.js)
- Animations (Framer Motion, GSAP)
- Utilities (Lodash, Day.js, UUID)
- Testing (Jest, React Testing Library)
- RAG Architecture
- Frontend Performance

**Examples of questions that won't get specific answers:**
- "what is Python" (not in knowledge base)
- "how to cook pasta" (not in knowledge base)
- "what's the weather" (not in knowledge base)
- "explain machine learning" (not in knowledge base)
- "what is Vue.js" (not in knowledge base)

**What happens:** You'll get a general response explaining what topics are available and suggesting to rephrase with specific technology names.

### 2. Questions Requiring Real-Time Data

The chatbot cannot:
- Access current information
- Check real-time data
- Browse the internet
- Access external APIs
- Get current dates/times (beyond what's in responses)

### 3. Questions Requiring Code Execution

The chatbot cannot:
- Run code
- Execute commands
- Debug code
- Test code
- Compile code

### 4. Questions About Backend Technologies

The chatbot focuses on frontend technologies only. It cannot answer about:
- Backend frameworks (Express, Django, etc.)
- Databases (MySQL, MongoDB, etc.)
- Server-side languages (Node.js backend, Python backend, etc.)
- API design (beyond frontend consumption)
- DevOps (Docker, Kubernetes, etc.)

### 5. Questions Requiring Personal Information

The chatbot cannot:
- Remember personal information
- Store user data
- Access user files
- Track user behavior

## How Questions Are Processed

1. **Conversational Check:** First checks if it's a greeting/introduction (no citations)
2. **Keyword Matching:** Searches for keywords in your question (case-insensitive)
   - Prioritizes exact matches (e.g., "react" matches "react")
   - Supports multi-word queries (e.g., "react js", "next js")
   - Handles variations (e.g., "react.js", "reactjs")
3. **Document Search:** Matches keywords against document titles and content
4. **Citation Generation:** Returns up to 3 relevant citations (one per document)
5. **Response Generation:** Creates response based on matched topics
6. **Default Fallback:** If no match, provides helpful general response

## Tips for Best Results

1. **Be Specific:** "What is React?" works better than "Tell me stuff"
2. **Use Technology Names:** Include library/framework names (React, TypeScript, etc.)
3. **Support Variations:** The chatbot recognizes:
   - "react", "react js", "react.js", "reactjs" → React Best Practices Guide
   - "next.js", "next js", "nextjs" → Routing Solutions
4. **Ask Follow-ups:** Conversation context is maintained
5. **Click Citations:** Explore document viewer for source material
6. **Rephrase if Needed:** If you don't get good results, try different keywords

## Response Types

### With Citations
- Technical questions about supported topics
- Questions matching document keywords
- Shows clickable citation buttons
- Citations link to document viewer
- **Important:** Citations always appear in chat messages, even if the same document was cited in a previous message

### Without Citations
- Conversational queries (greetings, thanks, etc.)
- Polite responses only
- No document references

### General Response
- Questions not matching specific topics
- May include default citation
- Explains available knowledge base topics
- Suggests rephrasing with keywords

## Error Handling

Occasionally (1% chance), you may see:
- "Network error: Failed to fetch response. Please try again."

**What to do:** Simply try asking your question again. This simulates real-world API behavior. You can also click the "Retry" button if available.

## Citation Behavior

### In Chat Messages
- **Citations always appear** - Even if the same document is cited in multiple messages, each message will show its citations
- **Maximum 3 citations** per response
- **One citation per document** per response (no duplicates in same response)
- **Relevant pages** are selected based on keyword matching
- **Click citations** to view full document content

### In Document Viewer
- **Deduplication** - Each unique document appears only once in navigation, even if cited multiple times in different messages
- **Navigation** - Use Previous/Next buttons to navigate between unique documents
- **Download** - Download current document as text file using the download button
- **Full Content** - View complete document content, not just snippets

**Example:**
- Message 1: "What is React?" → Shows citation [1] React Best Practices Guide
- Message 2: "What is React?" → Also shows citation [1] React Best Practices Guide
- Document Viewer: Shows "React Best Practices Guide" only once in navigation

## Example Conversations

**Good Example:**
- User: "What is React?"
- Bot: [Provides React information with citations from React Best Practices Guide]

**Good Example (Variations):**
- User: "What is react js?"
- Bot: [Provides React information with citations from React Best Practices Guide]
- User: "Explain next.js"
- Bot: [Provides Next.js routing information with citations]

**Good Example:**
- User: "How does Redux work?"
- Bot: [Provides Redux information with citations from State Management Solutions]

**Good Example:**
- User: "Compare Tailwind and Bootstrap"
- Bot: [Provides comparison with citations from UI & Styling Libraries Guide]

**Limited Example:**
- User: "What is Python?"
- Bot: [General response explaining available topics, suggests asking about React/TypeScript instead]

**Conversational Example:**
- User: "Hello"
- Bot: [Friendly greeting, no citations]
- User: "What is React?"
- Bot: [Technical response with citations]

**Repeated Question Example:**
- User: "What is React?"
- Bot: [Provides React information with citation [1] React Best Practices Guide]
- User: "What is React?" (asked again)
- Bot: [Provides React information with citation [1] React Best Practices Guide]
- **Note:** Both messages show citations. Document Viewer will show the document only once.

## UI Features

### Chat Interface
- **Dark Theme** - Beautiful gradient-based dark interface
- **Smooth Animations** - All interactions use Framer Motion
- **Copy Messages** - Hover over messages to see copy button
- **Responsive Design** - Works perfectly on mobile and desktop

### Document Viewer
- **Deduplication** - Each unique document appears only once
- **Navigation** - Previous/Next buttons to browse documents
- **Download** - Download current document as text file
- **Full Content** - View complete document content

### Conversation Management
- **Multiple Conversations** - Create and manage multiple chat sessions
- **Delete Conversations** - Always-visible delete button with confirmation
- **Conversation History** - View all past conversations
- **New Chat** - Start fresh conversations easily

## Summary

**You CAN ask about:**
- React, TypeScript, and frontend technologies
- UI libraries, state management, forms, data fetching
- Routing, charts, animations, utilities, testing
- RAG architecture and performance
- Conversational questions (greetings, thanks, etc.)
- General questions (will get helpful guidance)

**You CANNOT get specific answers about:**
- Topics outside the knowledge base
- Backend technologies
- Real-time data
- Code execution
- Personal information

**Citation Behavior:**
- Citations always appear in chat messages (even if same document cited before)
- Document Viewer shows each unique document only once (deduplication)
- Maximum 3 citations per response
- Click citations to view full document content

**Best Practice:**
Include specific technology names or keywords in your questions for the most accurate and detailed responses with citations. The chatbot recognizes variations like "react js", "react.js", "next js", "next.js" for better matching.
