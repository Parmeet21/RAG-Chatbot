# RAG Chatbot - Enterprise AI Assistant (Frontend)

A modern, enterprise-grade React-based frontend application for a Retrieval-Augmented Generation (RAG) chatbot interface. This application provides a beautiful dark-themed UI with smooth animations, allowing users to ask questions and receive intelligent answers with document citations.

## 🚀 Features

- **Modern Dark Theme UI** - Beautiful gradient-based dark interface with glassmorphism effects
- **Smooth Animations** - Powered by Framer Motion for fluid interactions
- **Intelligent Citation System** - Citations always appear in chat messages, with deduplication in Document Viewer
- **Conversation Management** - Create, switch, and delete multiple conversations
- **Document Viewer** - View full document content with navigation and download functionality
- **Copy Messages** - One-click copy functionality for all messages
- **Responsive Design** - Fully optimized for mobile and desktop devices
- **Auto-scroll** - Automatically scrolls to latest messages
- **Loading States** - Beautiful typing indicators and loading animations
- **Error Handling** - Graceful error handling with retry functionality

## 📦 Setup Instructions

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd rag-chatbot
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - The application will be available at `http://localhost:5173` (or the port shown in terminal)
   - Open this URL in your web browser

### Build for Production

```bash
npm run build
```

The production build will be created in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## 📚 Packages Used

### Dependencies

- **react** (^19.2.0) - React library for building user interfaces
- **react-dom** (^19.2.0) - React DOM renderer
- **lucide-react** (^0.563.0) - Icon library for React components
- **framer-motion** (^11.x) - Animation library for smooth UI transitions

### DevDependencies

- **@tailwindcss/vite** (^4.1.18) - Tailwind CSS Vite plugin
- **@types/node** (^24.10.1) - TypeScript type definitions for Node.js
- **@types/react** (^19.2.5) - TypeScript type definitions for React
- **@types/react-dom** (^19.2.3) - TypeScript type definitions for React DOM
- **@vitejs/plugin-react** (^5.1.1) - Vite plugin for React
- **eslint** (^9.39.1) - JavaScript linter
- **eslint-plugin-react-hooks** (^7.0.1) - ESLint plugin for React Hooks
- **eslint-plugin-react-refresh** (^0.4.24) - ESLint plugin for React Refresh
- **globals** (^16.5.0) - Global variables for ESLint
- **tailwindcss** (^4.1.18) - Utility-first CSS framework
- **typescript** (~5.9.3) - TypeScript compiler
- **typescript-eslint** (^8.46.4) - TypeScript ESLint plugin
- **vite** (^7.2.4) - Build tool and development server

## 📁 Project Structure

```
rag-chatbot/
├── src/
│   ├── components/          # React components
│   │   ├── ChatContainer.tsx
│   │   ├── ChatInput.tsx
│   │   ├── ChatMessage.tsx
│   │   ├── Citation.tsx
│   │   ├── ConversationHistory.tsx
│   │   ├── DocumentViewer.tsx
│   │   ├── TypingIndicator.tsx
│   │   └── ConfirmDeleteModal.tsx
│   ├── context/            # React Context providers
│   │   └── ChatContext.tsx
│   ├── services/           # API and business logic
│   │   └── mockApi.ts
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   ├── App.tsx             # Main application component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
│   └── vite.png            # Favicon
├── package.json            # Dependencies and scripts
├── vite.config.ts          # Vite configuration
├── README.md               # This file
└── QUESTIONS_GUIDE.md      # User guide for asking questions
```

## 🧩 Components

### App.tsx
Main application component that sets up the layout and providers. It renders:
- ConversationHistory (sidebar)
- ChatContainer (main chat area)
- ChatInput (message input)
- DocumentViewer (side panel for documents)

### Components

#### ChatContainer.tsx
Displays the main chat conversation area. Features:
- Shows all messages in chronological order
- Displays welcome screen with quick tips when no messages
- Shows typing indicator while loading
- Displays error messages with retry functionality
- Auto-scrolls to latest message
- Scroll to top button when scrolled down
- Smooth animations for messages

#### ChatInput.tsx
Text input component for sending messages. Features:
- Multi-line textarea with auto-resize
- Send button with loading state and gradient styling
- Enter key to send (Shift+Enter for new line)
- Auto-focus after message submission
- Character counter (2000 character limit)
- Example questions when chat is empty
- Responsive sizing for mobile and desktop
- No scrollbar on textarea

#### ChatMessage.tsx
Renders individual chat messages. Features:
- User messages (right-aligned, gradient blue/purple background)
- Assistant messages (left-aligned, dark slate background)
- Bot and user avatars with icons
- Timestamp display
- Copy button on hover to copy message content (with checkmark confirmation)
- Citation display for assistant messages
- Smooth animations on mount

#### Citation.tsx
Clickable citation button component. Features:
- Displays document title and page number
- Opens DocumentViewer when clicked
- Visual styling with glassmorphism effects
- Hover animations
- Responsive text truncation

#### ConversationHistory.tsx
Sidebar component showing conversation history. Features:
- List of all previous conversations
- "New Chat" button to start fresh conversation
- Conversation titles (truncated to 2 words on mobile)
- Delete button (always visible) with confirmation modal
- Mobile-responsive with slide-in/out animation
- Date formatting (relative time)
- Smooth animations for list items

#### DocumentViewer.tsx
Side panel for viewing document content. Features:
- Displays document title and page number
- Shows referenced snippet
- Shows full document content
- Navigation between multiple citations (Previous/Next)
- **Deduplication**: Shows each unique document only once (even if cited multiple times)
- Download button to save document as text file
- Close button
- Mobile-responsive full-screen overlay
- Smooth slide-in/out animations

#### TypingIndicator.tsx
Animated loading indicator shown while waiting for response. Features:
- Three bouncing dots animation with gradient colors
- "AI is thinking..." text with animated dots
- Smooth fade-in animation

#### ConfirmDeleteModal.tsx
Confirmation modal for deleting conversations. Features:
- Warning message with conversation title
- Cancel and Delete buttons
- Escape key to close
- Click outside to close
- Smooth animations

## 🔧 Services

### mockApi.ts
Mock API service that simulates backend behavior. Features:

**Functions:**
- `sendMessage(userMessage: string)`: Simulates sending a message and receiving a response
  - Adds 1-2 second delay to simulate network latency
  - Generates citations based on intelligent keyword matching
  - Generates intelligent responses
  - Simulates occasional errors (1% chance)

- `getDocumentContent(documentTitle: string, pageNumber: number)`: Retrieves document content
  - Returns content for specific document and page
  - Returns null if document not found

**Mock Documents:**
The service includes 13 mock documents covering:
1. React Best Practices Guide
2. TypeScript Fundamentals
3. UI & Styling Libraries (Tailwind CSS, ShadCN UI, MUI, Ant Design, Bootstrap, Styled-Components, CSS Modules)
4. State Management Solutions (Redux Toolkit, Zustand, MobX, Recoil)
5. Forms & Validation Libraries (React Hook Form, Formik, Zod, Yup)
6. Data Fetching & API Management (Axios, Fetch API, React Query, SWR)
7. Routing Solutions (React Router, Next.js)
8. Charts & Data Visualization (Chart.js, Recharts, D3.js)
9. Animation Libraries (Framer Motion, GSAP)
10. Utility Libraries (Lodash, Day.js, UUID)
11. Testing Frameworks (Jest, React Testing Library)
12. RAG Architecture Overview
13. Frontend Performance Optimization

**Citation Generation:**
- Intelligent keyword matching with priority system
- Supports multi-word queries (e.g., "react js", "next js")
- Matches queries to relevant documents
- **Citations always appear in chat messages** (even if same document cited multiple times)
- Returns up to 3 citations per response
- Handles conversational queries (no citations for greetings)
- Prioritizes exact matches and whole-word matches

**Response Generation:**
- Provides specific responses for technical topics
- Handles conversational queries (greetings, thanks, etc.)
- Generates intelligent responses for general questions
- Includes helpful guidance when no specific documents match

## 🎯 Context

### ChatContext.tsx
React Context for managing global chat state. Provides:

**State:**
- `conversations`: Array of all conversations
- `currentConversation`: Currently active conversation
- `messages`: Messages in current conversation
- `isLoading`: Loading state
- `error`: Error message
- `selectedCitation`: Currently selected citation
- `isDocumentViewerOpen`: Document viewer visibility

**Functions:**
- `sendMessage(message: string)`: Send a new message
- `startNewChat()`: Start a new conversation
- `selectConversation(id: string)`: Switch to a conversation
- `deleteConversation(id: string)`: Delete a conversation
- `openDocumentViewer(citation: Citation)`: Open document viewer
- `closeDocumentViewer()`: Close document viewer
- `clearError()`: Clear error message

## 📝 Types

### types/index.ts
TypeScript type definitions:

- **Citation**: Citation object with id, documentTitle, pageNumber, and snippet
- **Message**: Chat message with id, role, content, citations, and timestamp
- **Conversation**: Conversation object with id, title, messages, and timestamps

## ✨ Key Features

### Citation Behavior
- **Citations always appear in chat messages** - Even if the same document is cited in multiple messages, each message will show its citations
- **Document Viewer deduplication** - When viewing documents, each unique document appears only once in navigation (no duplicates)
- **Smart matching** - Supports queries like "react", "react js", "react.js", "next js", "next.js" with proper document matching

### UI/UX Features
- **Dark theme** - Beautiful gradient-based dark interface
- **Smooth animations** - All interactions use Framer Motion for fluid animations
- **Responsive design** - Fully optimized for mobile and desktop
- **Copy functionality** - Hover over messages to copy content
- **Delete conversations** - Always-visible delete button with confirmation
- **Download documents** - Download current document as text file
- **Scroll to top** - Button appears when scrolled down
- **Auto-focus** - Input field automatically focuses after sending messages
- **Character counter** - Shows character count with limit warning

### Mobile Optimizations
- Sidebar slides in/out on mobile
- Responsive text sizing and spacing
- Touch-friendly button sizes
- Optimized viewport handling (100dvh)
- Input field scrolls into view on focus

## 🔄 How It Works

1. User types a question in the input field
2. Message is sent to mock API service
3. API simulates processing delay (1-2 seconds)
4. API generates relevant citations from mock documents using intelligent keyword matching
5. API generates response based on query
6. Response is displayed with citations (citations always appear, even if document was cited before)
7. User can click citations to view document content
8. Document Viewer shows unique documents only (deduplication)
9. User can navigate between multiple citations
10. User can download documents
11. Conversation history is maintained

## 🔮 Future Integration

To connect this frontend to a real backend:

1. Replace `mockApi.ts` with actual API calls
2. Update `sendMessage` to call real API endpoint
3. Update `getDocumentContent` to fetch from real document store
4. Add authentication if required
5. Handle real error responses from backend
6. Update citation structure if backend format differs
7. Add real-time updates if needed

## 📋 Notes

- This is a frontend-only application with mocked backend behavior
- All data is stored in browser memory (lost on refresh)
- Error simulation is set to 1% for demonstration
- Document content is generated from mock data
- Citations are matched based on intelligent keyword matching with priority system
- Citations always appear in chat messages for better user experience
- Document Viewer handles deduplication to keep navigation clean

## 🎨 Design Philosophy

- **Dark theme first** - Modern, eye-friendly dark interface
- **Smooth animations** - Every interaction feels fluid and responsive
- **Glassmorphism** - Modern UI effects with backdrop blur
- **Gradient accents** - Beautiful gradient buttons and highlights
- **Consistent spacing** - Well-organized layout with proper spacing
- **Accessibility** - Proper ARIA labels and keyboard navigation

## 📖 Additional Documentation

See `QUESTIONS_GUIDE.md` for detailed information about:
- What questions you can ask
- What questions you cannot ask
- How to get the best responses
- Citation behavior
- Example conversations
