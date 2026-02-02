import type { Message, Citation } from '../types';

// Mock document database
const MOCK_DOCUMENTS = [
  {
    id: 'doc1',
    title: 'React Best Practices Guide',
    pages: [
      { page: 1, content: 'React is a JavaScript library for building user interfaces. It allows developers to create reusable UI components.' },
      { page: 2, content: 'When using React hooks, always follow the Rules of Hooks. Hooks should only be called at the top level of your component.' },
      { page: 3, content: 'State management in React can be handled using useState, useReducer, Context API, or external libraries like Redux.' },
    ],
  },
  {
    id: 'doc2',
    title: 'TypeScript Fundamentals',
    pages: [
      { page: 1, content: 'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript. It adds static type definitions.' },
      { page: 2, content: 'Interfaces in TypeScript define the structure of objects. They help catch errors at compile time.' },
      { page: 3, content: 'Generics in TypeScript allow you to create reusable components that work with multiple types.' },
    ],
  },
  {
    id: 'doc3',
    title: 'UI & Styling Libraries Guide',
    pages: [
      { page: 1, content: 'Tailwind CSS is a utility-first CSS framework providing low-level utility classes. ShadCN UI offers pre-built accessible components built on Radix UI. Material UI (MUI) provides comprehensive React components following Material Design principles.' },
      { page: 2, content: 'Ant Design is an enterprise-class UI design language with a rich set of components. Bootstrap offers responsive grid systems and pre-styled components. Styled-Components enables CSS-in-JS with scoped styling. CSS Modules provide locally scoped CSS classes.' },
      { page: 3, content: 'Choose Tailwind for utility-first rapid development, ShadCN for accessible components, MUI for Material Design, Ant Design for enterprise apps, Bootstrap for quick prototyping, Styled-Components for component-scoped styles, or CSS Modules for traditional scoped CSS.' },
    ],
  },
  {
    id: 'doc4',
    title: 'State Management Solutions',
    pages: [
      { page: 1, content: 'Redux Toolkit simplifies Redux with less boilerplate and better TypeScript support. Zustand provides a minimal state management solution with a simple API. MobX uses observable state and automatic reactivity. Recoil offers atomic state management for React.' },
      { page: 2, content: 'Redux Toolkit is ideal for complex applications requiring predictable state updates. Zustand is perfect for small to medium apps needing lightweight state management. MobX excels with reactive programming patterns. Recoil provides fine-grained reactivity for React applications.' },
      { page: 3, content: 'Use Redux Toolkit for large-scale apps with complex state logic. Choose Zustand for simplicity and minimal setup. MobX works well for reactive data flows. Recoil is great for managing shared state across component trees.' },
    ],
  },
  {
    id: 'doc5',
    title: 'Forms & Validation Libraries',
    pages: [
      { page: 1, content: 'React Hook Form minimizes re-renders and provides excellent performance with uncontrolled components. Formik offers a complete form solution with validation and error handling. Zod provides TypeScript-first schema validation. Yup is a JavaScript schema builder for value parsing and validation.' },
      { page: 2, content: 'React Hook Form uses refs to avoid unnecessary re-renders, making it highly performant. Formik provides built-in validation, error messages, and form state management. Zod integrates seamlessly with TypeScript for runtime type checking. Yup offers a fluent API for building validation schemas.' },
      { page: 3, content: 'Combine React Hook Form with Zod for type-safe forms with minimal re-renders. Use Formik for comprehensive form solutions with built-in validation. Yup works well with Formik for schema-based validation. Choose based on performance needs and TypeScript integration requirements.' },
    ],
  },
  {
    id: 'doc6',
    title: 'Data Fetching & API Management',
    pages: [
      { page: 1, content: 'Axios is a promise-based HTTP client with interceptors and automatic JSON transformation. Fetch API is the native browser API for making HTTP requests. React Query (TanStack Query) provides powerful data synchronization and caching. SWR offers data fetching with revalidation and caching strategies.' },
      { page: 2, content: 'Axios provides request/response interceptors, automatic JSON parsing, and better error handling than Fetch. React Query handles caching, background updates, and synchronization automatically. SWR offers stale-while-revalidate caching strategy for optimal performance. Fetch API is lightweight and built into browsers.' },
      { page: 3, content: 'Use Axios for projects needing interceptors and better error handling. React Query excels for complex data fetching with caching needs. SWR is perfect for real-time data with automatic revalidation. Fetch API works well for simple requests without external dependencies.' },
    ],
  },
  {
    id: 'doc7',
    title: 'Routing Solutions',
    pages: [
      { page: 1, content: 'React Router is the standard routing library for React applications, providing declarative routing with nested routes and code splitting. Next.js Router offers file-based routing with automatic code splitting and optimized performance through its App Router and Pages Router systems.' },
      { page: 2, content: 'React Router supports client-side routing with BrowserRouter, HashRouter, and MemoryRouter. It provides hooks like useNavigate, useParams, and useLocation. Next.js Router uses file-based routing where folder structure defines routes, with built-in support for dynamic routes and API routes.' },
      { page: 3, content: 'Choose React Router for single-page applications needing flexible routing. Next.js Router is ideal for full-stack React applications with server-side rendering, static site generation, and API routes. Both support lazy loading and code splitting for optimal performance.' },
    ],
  },
  {
    id: 'doc8',
    title: 'Charts & Data Visualization',
    pages: [
      { page: 1, content: 'Chart.js is a popular charting library with simple API and beautiful default styling. Recharts is a composable charting library built on D3.js and React. D3.js provides powerful data visualization capabilities with full control over rendering and animations.' },
      { page: 2, content: 'Chart.js offers easy-to-use charts with minimal configuration and responsive design. Recharts provides React-friendly components with declarative syntax and built-in animations. D3.js enables custom visualizations with complete control over SVG and Canvas rendering.' },
      { page: 3, content: 'Use Chart.js for quick, beautiful charts with minimal setup. Recharts is perfect for React applications needing composable chart components. D3.js excels when you need custom, complex visualizations with full control over every aspect of rendering and interaction.' },
    ],
  },
  {
    id: 'doc9',
    title: 'Animation Libraries',
    pages: [
      { page: 1, content: 'Framer Motion is a production-ready motion library for React, providing declarative animations and gesture support. GSAP (GreenSock Animation Platform) is a powerful JavaScript animation library with professional-grade performance and extensive plugin ecosystem.' },
      { page: 2, content: 'Framer Motion offers simple declarative syntax for animations, layout animations, and gesture handling. GSAP provides timeline-based animations, scroll triggers, and advanced easing functions. Both support complex animations but Framer Motion is React-specific while GSAP is framework-agnostic.' },
      { page: 3, content: 'Choose Framer Motion for React applications needing smooth animations with minimal code. GSAP is ideal for complex, performance-critical animations across any framework. Framer Motion integrates seamlessly with React, while GSAP offers more control and advanced features.' },
    ],
  },
  {
    id: 'doc10',
    title: 'Utility Libraries',
    pages: [
      { page: 1, content: 'Lodash provides utility functions for common programming tasks like array manipulation, object operations, and function utilities. Moment.js and Day.js are date manipulation libraries, with Day.js being a lightweight alternative to Moment.js. UUID generates unique identifiers for distributed systems.' },
      { page: 2, content: 'Lodash offers functions like debounce, throttle, cloneDeep, and merge for common operations. Day.js is a 2KB alternative to Moment.js with similar API and plugin support. UUID libraries generate RFC-compliant unique identifiers. Choose Day.js over Moment.js for smaller bundle size.' },
      { page: 3, content: 'Use Lodash for complex data manipulation and utility functions. Day.js is recommended over Moment.js for date operations due to smaller size and active maintenance. UUID is essential for generating unique IDs in distributed systems and databases.' },
    ],
  },
  {
    id: 'doc11',
    title: 'Testing Frameworks',
    pages: [
      { page: 1, content: 'Jest is a JavaScript testing framework with built-in test runner, assertion library, and mocking capabilities. React Testing Library provides simple utilities for testing React components by focusing on user behavior rather than implementation details.' },
      { page: 2, content: 'Jest offers snapshot testing, code coverage, and parallel test execution. React Testing Library encourages testing components like users interact with them, using queries like getByRole and getByText. Together they provide comprehensive testing for React applications.' },
      { page: 3, content: 'Use Jest for unit testing, integration testing, and mocking dependencies. React Testing Library helps test component behavior and accessibility. Combine both for robust React application testing that focuses on user experience and component functionality.' },
    ],
  },
  {
    id: 'doc12',
    title: 'RAG Architecture Overview',
    pages: [
      { page: 1, content: 'Retrieval-Augmented Generation (RAG) combines information retrieval with language generation.' },
      { page: 2, content: 'RAG systems retrieve relevant documents from a knowledge base before generating responses.' },
      { page: 3, content: 'Citations in RAG systems help users verify the source of information and understand context.' },
    ],
  },
  {
    id: 'doc13',
    title: 'Frontend Performance Optimization',
    pages: [
      { page: 1, content: 'Code splitting reduces initial bundle size by loading components only when needed.' },
      { page: 2, content: 'Memoization techniques like React.memo and useMemo prevent unnecessary re-renders.' },
      { page: 3, content: 'Lazy loading images and components improves initial page load time significantly.' },
    ],
  },
];

// Simulate network latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Simulate occasional errors (1% chance - very rare for better UX)
const shouldSimulateError = () => Math.random() < 0.01;

// Check if query is conversational (doesn't need citations)
const isConversationalQuery = (query: string): boolean => {
  const queryLower = query.toLowerCase().trim();
  const conversationalPatterns = [
    /^(hi|hello|hey|greetings|good morning|good afternoon|good evening)$/i,
    /(how are you|how's it going|how do you do|what's up)/i,
    /(what is your name|what's your name|who are you|introduce yourself)/i,
    /(what do you do|what can you do|what are you|your purpose|your function)/i,
    /(thank|thanks|thank you|appreciate)/i,
    /(bye|goodbye|see you|farewell)/i,
  ];
  
  return conversationalPatterns.some(pattern => pattern.test(queryLower));
};

// Generate mock citations based on query
const generateCitations = (query: string): Citation[] => {
  // Don't generate citations for conversational queries
  if (isConversationalQuery(query)) {
    return [];
  }
  
  const queryLower = query.toLowerCase();
  const citations: Citation[] = [];
  const usedDocs = new Set<string>();
  
  // Common stop words to ignore in matching
  const stopWords = new Set(['how', 'what', 'when', 'where', 'why', 'who', 'which', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should', 'could', 'may', 'might', 'must', 'can', 'to', 'the', 'a', 'an', 'and', 'or', 'but', 'if', 'then', 'else', 'for', 'from', 'of', 'on', 'at', 'by', 'with', 'about', 'into', 'through', 'during', 'before', 'after', 'above', 'below', 'up', 'down', 'out', 'off', 'over', 'under', 'again', 'further', 'use', 'using', 'used']);
  
  // Extract meaningful keywords (remove stop words and short words)
  // But keep the original query for exact matching
  let queryWords = queryLower
    .split(/\s+/)
    .filter(w => w.length > 2 && !stopWords.has(w))
    .map(w => w.replace(/[^\w]/g, '')); // Remove punctuation
  
  // Also check the full query (trimmed) for exact keyword matches
  const trimmedQuery = queryLower.trim().replace(/[^\w\s]/g, ''); // Remove punctuation for matching
  
  // For single-word queries or if all words were filtered, check if the whole query is a meaningful keyword
  if (queryWords.length === 0) {
    const cleanQuery = trimmedQuery.replace(/\s+/g, '');
    if (cleanQuery.length > 2 && !stopWords.has(cleanQuery.toLowerCase())) {
      queryWords = [cleanQuery.toLowerCase()];
    }
  }
  
  // Also ensure important technology names are preserved even if they're single words or in multi-word queries
  // This ensures queries like "what is react" or "explain typescript" correctly extract the tech name
  // Handle multi-word tech names first (longest first) to match "react js" before "react"
  const importantTechWords = [
    'react js', 'react.js', 'next js', 'next.js', // Multi-word tech names first
    'react', 'typescript', 'tailwind', 'redux', 'nextjs', 'axios', 'jest', 'lodash', 
    'mui', 'bootstrap', 'shadcn', 'zod', 'yup', 'formik', 'swr', 'gsap', 'framer', 
    'd3', 'chart', 'recharts', 'mobx', 'recoil', 'zustand'
  ];
  
  // Sort by length (longest first) to match multi-word names before single words
  importantTechWords.sort((a, b) => b.length - a.length);
  
  importantTechWords.forEach(tech => {
    // Check if the tech word/phrase appears in the query
    // For multi-word, use phrase matching; for single word, use word boundary
    let techRegex: RegExp;
    if (tech.includes(' ')) {
      // Multi-word: match the phrase (allowing for variations in spacing)
      const techPhrase = tech.replace(/\s+/g, '[\\s.]+');
      techRegex = new RegExp(techPhrase, 'i');
    } else {
      // Single word: use word boundary
      techRegex = new RegExp(`\\b${tech}\\b`, 'i');
    }
    
    if (techRegex.test(queryLower)) {
      // Only add if not already in queryWords
      const techWords = tech.split(/[\s.]+/);
      const alreadyIncluded = queryWords.some(w => {
        const normalizedW = w.toLowerCase();
        return techWords.some(tw => {
          const normalizedTw = tw.toLowerCase();
          return normalizedW === normalizedTw || normalizedW.includes(normalizedTw) || normalizedTw.includes(normalizedW);
        });
      });
      if (!alreadyIncluded) {
        // Add all words from the tech name
        techWords.forEach(tw => {
          const normalizedTw = tw.toLowerCase();
          if (normalizedTw.length > 0 && !queryWords.includes(normalizedTw)) {
            queryWords.push(normalizedTw);
          }
        });
      }
    }
  });
  
  // For single-word queries, also add the word itself to queryWords if it's meaningful
  if (queryWords.length === 0 && trimmedQuery.length > 2 && !stopWords.has(trimmedQuery)) {
    queryWords.push(trimmedQuery.replace(/[^\w]/g, ''));
  }

  // First, try to match based on specific technology keywords
  const generalTopics: Record<string, string> = {
    // UI & Styling (prioritize these for styling queries)
    'tailwind css': 'doc3',
    'tailwind': 'doc3',
    'shadcn': 'doc3',
    'mui': 'doc3',
    'material ui': 'doc3',
    'ant design': 'doc3',
    'antd': 'doc3',
    'bootstrap': 'doc3',
    'styled-components': 'doc3',
    'styled components': 'doc3',
    'css modules': 'doc3',
    'css': 'doc3',
    'styling': 'doc3',
    'design': 'doc3',
    // Routing (prioritize for Next.js queries - longest first)
    'next.js': 'doc7',
    'next js': 'doc7',
    'nextjs': 'doc7',
    'react router': 'doc7',
    'router': 'doc7',
    'routing': 'doc7',
    'route': 'doc7',
    // React & TypeScript (prioritize exact matches - longest first)
    'react.js': 'doc1',
    'react js': 'doc1',
    'reactjs': 'doc1',
    'react': 'doc1',
    'javascript': 'doc1',
    'component': 'doc1',
    'hook': 'doc1',
    // Note: 'ui', 'web', 'frontend', 'js' removed to avoid conflicts
    'typescript': 'doc2',
    'typescript fundamentals': 'doc2',
    'type': 'doc2',
    'interface': 'doc2',
    // State Management
    'redux': 'doc4',
    'redux toolkit': 'doc4',
    'zustand': 'doc4',
    'mobx': 'doc4',
    'recoil': 'doc4',
    'state management': 'doc4',
    'state': 'doc4',
    // Forms & Validation
    'react hook form': 'doc5',
    'hook form': 'doc5',
    'formik': 'doc5',
    'zod': 'doc5',
    'yup': 'doc5',
    'form': 'doc5',
    'validation': 'doc5',
    // Data Fetching
    'axios': 'doc6',
    'fetch': 'doc6',
    'react query': 'doc6',
    'tanstack query': 'doc6',
    'swr': 'doc6',
    'api': 'doc6',
    'data fetching': 'doc6',
    // Charts & Visualization
    'chart': 'doc8',
    'chart.js': 'doc8',
    'recharts': 'doc8',
    'd3': 'doc8',
    'd3.js': 'doc8',
    'visualization': 'doc8',
    'graph': 'doc8',
    // Animations
    'framer motion': 'doc9',
    'framer': 'doc9',
    'gsap': 'doc9',
    'animation': 'doc9',
    'animate': 'doc9',
    // Utilities
    'lodash': 'doc10',
    'moment': 'doc10',
    'moment.js': 'doc10',
    'dayjs': 'doc10',
    'day.js': 'doc10',
    'uuid': 'doc10',
    'utility': 'doc10',
    // Testing
    'jest': 'doc11',
    'testing': 'doc11',
    'test': 'doc11',
    'react testing library': 'doc11',
    // RAG & Performance
    'rag': 'doc12',
    'retrieval': 'doc12',
    'ai': 'doc12',
    'machine learning': 'doc12',
    'chatbot': 'doc12',
    'performance': 'doc13',
    'optimization': 'doc13',
    'speed': 'doc13',
    'fast': 'doc13',
    'slow': 'doc13',
    'bundle': 'doc13',
    'memoization': 'doc13',
    'lazy': 'doc13',
  };

  // Check for specific technology keywords first (longest match first for better precision)
  const sortedTopics = Object.entries(generalTopics).sort((a, b) => b[0].length - a[0].length);
  
  // First pass: find the best matching document (even if already cited)
  // Citations will always appear in chat messages, Document Viewer handles deduplication
  let bestMatch: { doc: typeof MOCK_DOCUMENTS[0], keyword: string } | null = null;
  
  for (const [keyword, docId] of sortedTopics) {
    // Normalize keyword for matching (remove spaces and punctuation)
    const normalizedKeyword = keyword.replace(/[^\w]/g, '').toLowerCase();
    const normalizedQuery = trimmedQuery.replace(/\s+/g, '');
    
    // Check if keyword matches (multiple strategies for better matching)
    // Priority: exact match > whole word match > substring match
    let keywordMatches = false;
    
    // 1. Exact match (highest priority) - for queries like "react" matching "react"
    if (normalizedQuery === normalizedKeyword || queryLower.trim() === keyword) {
      keywordMatches = true;
    }
    // 2. Multi-word keyword match (high priority) - for queries like "react js" or "next js"
    else if (keyword.includes(' ') && queryLower.includes(keyword)) {
      keywordMatches = true;
    }
    // 3. Whole word match (high priority) - for queries like "what is react" matching "react"
    else if (queryWords.length > 0) {
      // For multi-word keywords like "react js", check if all words are in queryWords
      if (keyword.includes(' ')) {
        const keywordWords = keyword.split(/\s+/).map(kw => kw.replace(/[^\w]/g, '').toLowerCase());
        const allWordsMatch = keywordWords.every(kw => 
          queryWords.some(w => {
            const normalizedW = w.toLowerCase();
            return normalizedW === kw || normalizedW.includes(kw) || kw.includes(normalizedW);
          })
        );
        keywordMatches = allWordsMatch;
      } else {
        // Single word keyword - check if any query word exactly matches the keyword
        const exactWordMatch = queryWords.some(w => {
          const normalizedW = w.toLowerCase();
          return normalizedW === normalizedKeyword;
        });
        
        // Check if keyword words match query words
        const keywordWordMatch = keyword.split(/\s+/).some(kw => {
          const normalizedKw = kw.replace(/[^\w]/g, '').toLowerCase();
          return queryWords.some(w => {
            const normalizedW = w.toLowerCase();
            return normalizedW === normalizedKw;
          });
        });
        
        keywordMatches = exactWordMatch || keywordWordMatch;
      }
    }
    // 4. Substring match (lower priority) - fallback
    else if (queryLower.includes(keyword) || keyword.includes(queryLower)) {
      keywordMatches = true;
    }
    // 5. Normalized substring match
    else if (normalizedQuery.includes(normalizedKeyword) || normalizedKeyword.includes(normalizedQuery)) {
      keywordMatches = true;
    }
    
    if (keywordMatches) {
      const matchedDoc = MOCK_DOCUMENTS.find(d => d.id === docId);
      if (matchedDoc) {
        // Store the best match (first/longest keyword match)
        if (!bestMatch) {
          bestMatch = { doc: matchedDoc, keyword };
        }
        
        // Always return the citation immediately if it matches (even if already cited)
        // Citations should appear in all chat messages, Document Viewer will handle deduplication
        const pageMatch = matchedDoc.pages.find(page => 
          page.content.toLowerCase().includes(keyword) ||
          (queryWords.length > 0 && queryWords.some((word: string) => page.content.toLowerCase().includes(word.toLowerCase())))
        ) || matchedDoc.pages[0];
        
        return [
          {
            id: `cite-${matchedDoc.id}-${pageMatch.page}`,
            documentTitle: matchedDoc.title,
            pageNumber: pageMatch.page,
            snippet: pageMatch.content.substring(0, 150) + '...',
          },
        ];
      }
    }
  }
  
  // IMPORTANT: Content-based matching ONLY runs if no keyword match was found
  // If a keyword match was found, we already returned it above (early return in the loop)

  // If no keyword match was found, try content-based matching with meaningful keywords only
  if (queryWords.length > 0) {
    // Prioritize documents that actually contain the keywords in their content
    type DocMatch = { doc: typeof MOCK_DOCUMENTS[0], page: typeof MOCK_DOCUMENTS[0]['pages'][0], score: number };
    const docsWithMatches: DocMatch[] = [];
    
    MOCK_DOCUMENTS.forEach(doc => {
      // Find pages that contain the keywords
      // Only match if the page actually contains the meaningful keywords (not just common words)
      doc.pages.forEach(page => {
        const pageContent = page.content.toLowerCase();
        // Count how many meaningful keywords appear in the page content
        const matchCount = queryWords.filter((word: string) => {
          const normalizedWord = word.toLowerCase();
          return pageContent.includes(normalizedWord);
        }).length;
        
        // Only add if at least one meaningful keyword matches
        if (matchCount > 0) {
          docsWithMatches.push({ doc, page, score: matchCount });
        }
      });
    });
    
    // Only add citations if we found relevant matches with actual keyword matches
    // Sort by match score (highest first) and take top 3
    // But only if we have matches with score > 0
    if (docsWithMatches.length > 0) {
      docsWithMatches
        .sort((a, b) => b.score - a.score)
        .slice(0, 3)
        .forEach(({ doc, page }) => {
          if (!usedDocs.has(doc.id)) {
            usedDocs.add(doc.id);
            citations.push({
              id: `cite-${doc.id}-${page.page}`,
              documentTitle: doc.title,
              pageNumber: page.page,
              snippet: page.content.substring(0, 150) + '...',
            });
          }
        });
    }
  }
  
  // Final check: If we have citations, return them. Otherwise return empty (don't show irrelevant ones)
  // This ensures we never show wrong citations when the correct document is already cited

  // Return citations (empty array if no matches - don't provide irrelevant citations)
  return citations;
};

// Generate response based on query
const generateResponse = (query: string, citations: Citation[]): string => {
  const queryLower = query.toLowerCase().trim();
  
  // Conversational greetings and introductions
  if (queryLower.match(/^(hi|hello|hey|greetings|good morning|good afternoon|good evening)$/i)) {
    return `Hello! 👋 I'm your RAG (Retrieval-Augmented Generation) chatbot assistant. I'm here to help answer your questions using information from my knowledge base. Feel free to ask me anything!`;
  }
  
  if (queryLower.match(/(how are you|how's it going|how do you do|what's up)/i)) {
    return `I'm doing great, thank you for asking! I'm ready to help you find information from my document knowledge base. What would you like to know about?`;
  }
  
  if (queryLower.match(/(what is your name|what's your name|who are you|introduce yourself)/i)) {
    return `I'm a RAG Chatbot Assistant! I'm designed to help you find information by retrieving relevant documents from my knowledge base and providing answers with citations. You can ask me questions about any topic, and I'll do my best to provide helpful answers backed by source documents when available.`;
  }
  
  if (queryLower.match(/(what do you do|what can you do|what are you|your purpose|your function)/i)) {
    return `I'm a Retrieval-Augmented Generation (RAG) chatbot. My purpose is to:
    
• Answer your questions by searching through my knowledge base
• Provide accurate information with document citations when available
• Help you understand various topics and concepts
• Show you the source documents I reference so you can verify the information

Feel free to ask me about anything! I'll do my best to help.`;
  }
  
  if (queryLower.match(/(thank|thanks|thank you|appreciate)/i)) {
    return `You're welcome! I'm glad I could help. Feel free to ask me anything else you'd like to know!`;
  }
  
  if (queryLower.match(/(bye|goodbye|see you|farewell)/i)) {
    return `Goodbye! Feel free to come back anytime if you have more questions. Have a great day! 👋`;
  }
  
  // Technical questions with specific responses
  if (queryLower.includes('react') && !queryLower.includes('react router') && !queryLower.includes('react query') && !queryLower.includes('react hook form') && !queryLower.includes('react testing')) {
    return `Based on the React Best Practices Guide, React is a powerful library for building user interfaces. The key principles include using functional components with hooks, following the Rules of Hooks, and managing state effectively. ${citations.length > 0 ? 'See the citations below for more details.' : ''}`;
  }
  
  if (queryLower.includes('typescript')) {
    return `TypeScript enhances JavaScript with static typing. It helps catch errors at compile time and improves code maintainability. Interfaces and generics are powerful features that enable type-safe code. ${citations.length > 0 ? 'Refer to the sources for comprehensive information.' : ''}`;
  }
  
  // UI & Styling
  if (queryLower.includes('tailwind') || queryLower.includes('shadcn') || queryLower.includes('mui') || queryLower.includes('material ui') || queryLower.includes('ant design') || queryLower.includes('bootstrap') || queryLower.includes('styled-components') || queryLower.includes('css modules')) {
    return `There are many excellent UI and styling solutions for React. Tailwind CSS offers utility-first styling, ShadCN UI provides accessible components, Material UI follows Material Design, Ant Design offers enterprise components, Bootstrap provides quick prototyping, Styled-Components enables CSS-in-JS, and CSS Modules provide scoped styling. ${citations.length > 0 ? 'Check the citations for detailed information about these libraries.' : ''}`;
  }
  
  // State Management
  if (queryLower.includes('redux') || queryLower.includes('zustand') || queryLower.includes('mobx') || queryLower.includes('recoil') || (queryLower.includes('state management') && !queryLower.includes('useState'))) {
    return `State management solutions help manage application state effectively. Redux Toolkit simplifies Redux with less boilerplate, Zustand provides minimal state management, MobX uses observable patterns, and Recoil offers atomic state management. ${citations.length > 0 ? 'See the citations for detailed comparisons and usage.' : ''}`;
  }
  
  // Forms & Validation
  if (queryLower.includes('react hook form') || queryLower.includes('hook form') || queryLower.includes('formik') || queryLower.includes('zod') || queryLower.includes('yup') || (queryLower.includes('form validation') && !queryLower.includes('native'))) {
    return `Form handling and validation libraries simplify building robust forms. React Hook Form minimizes re-renders, Formik provides comprehensive form solutions, Zod offers TypeScript-first validation, and Yup provides schema-based validation. ${citations.length > 0 ? 'Refer to the citations for implementation details.' : ''}`;
  }
  
  // Data Fetching
  if (queryLower.includes('axios') || queryLower.includes('react query') || queryLower.includes('tanstack query') || queryLower.includes('swr') || (queryLower.includes('data fetching') && !queryLower.includes('native'))) {
    return `Data fetching libraries help manage API calls and caching. Axios provides interceptors and better error handling, React Query offers powerful caching and synchronization, and SWR provides stale-while-revalidate strategies. ${citations.length > 0 ? 'Check the citations for best practices.' : ''}`;
  }
  
  // Routing
  if (queryLower.includes('react router') || queryLower.includes('next.js') || queryLower.includes('nextjs') || (queryLower.includes('routing') && queryLower.includes('react'))) {
    return `Routing solutions enable navigation in React applications. React Router provides declarative routing for SPAs, while Next.js offers file-based routing with SSR and SSG capabilities. ${citations.length > 0 ? 'See the citations for routing patterns.' : ''}`;
  }
  
  // Charts & Visualization
  if (queryLower.includes('chart') || queryLower.includes('recharts') || queryLower.includes('d3') || queryLower.includes('visualization') || queryLower.includes('graph')) {
    return `Charting libraries help visualize data effectively. Chart.js offers simple, beautiful charts, Recharts provides React-friendly components, and D3.js enables custom visualizations with full control. ${citations.length > 0 ? 'Refer to the citations for examples.' : ''}`;
  }
  
  // Animations
  if (queryLower.includes('framer motion') || queryLower.includes('framer') || queryLower.includes('gsap') || (queryLower.includes('animation') && queryLower.includes('react'))) {
    return `Animation libraries bring interfaces to life. Framer Motion offers declarative React animations with gesture support, while GSAP provides professional-grade animations with advanced features. ${citations.length > 0 ? 'Check the citations for animation techniques.' : ''}`;
  }
  
  // Utilities
  if (queryLower.includes('lodash') || queryLower.includes('moment') || queryLower.includes('dayjs') || queryLower.includes('day.js') || queryLower.includes('uuid')) {
    return `Utility libraries provide common functions for everyday tasks. Lodash offers data manipulation utilities, Day.js provides lightweight date handling, and UUID generates unique identifiers. ${citations.length > 0 ? 'See the citations for utility functions.' : ''}`;
  }
  
  // Testing
  if (queryLower.includes('jest') || queryLower.includes('react testing library') || (queryLower.includes('testing') && queryLower.includes('react'))) {
    return `Testing frameworks ensure code quality and reliability. Jest provides test running and mocking capabilities, while React Testing Library focuses on testing user behavior and accessibility. ${citations.length > 0 ? 'Refer to the citations for testing strategies.' : ''}`;
  }
  
  if (queryLower.includes('rag') || queryLower.includes('retrieval')) {
    return `Retrieval-Augmented Generation (RAG) combines document retrieval with language generation. This approach allows AI systems to provide accurate, cited responses by referencing source documents. Citations help users verify information and understand context. ${citations.length > 0 ? 'See the referenced documents below.' : ''}`;
  }

  if (queryLower.includes('performance') || queryLower.includes('optimization') || queryLower.includes('code splitting') || queryLower.includes('memoization') || queryLower.includes('lazy loading')) {
    return `Frontend performance optimization is crucial for creating fast, responsive web applications. Key techniques include code splitting to reduce initial bundle size, memoization to prevent unnecessary re-renders, and lazy loading to improve page load times. ${citations.length > 0 ? 'See the citations for detailed strategies.' : ''}`;
  }

  // Generate intelligent response for any other question
  const generateGeneralResponse = (query: string, citations: Citation[]): string => {
    if (citations.length > 0) {
      // If we have citations, provide a detailed response
      const topics = citations.map(c => c.documentTitle).join(', ');
      return `I found relevant information about "${query}" in my knowledge base. Based on the available documents, here's what I can tell you:

${citations.length > 0 ? `The documents I've referenced (${topics}) contain information that relates to your question. ` : ''}My knowledge base covers a wide range of frontend technologies including React, TypeScript, UI libraries (Tailwind, ShadCN, MUI, Ant Design, Bootstrap), state management (Redux, Zustand, MobX, Recoil), forms (React Hook Form, Formik, Zod, Yup), data fetching (Axios, React Query, SWR), routing (React Router, Next.js), charts (Chart.js, Recharts, D3.js), animations (Framer Motion, GSAP), utilities (Lodash, Day.js, UUID), testing (Jest, React Testing Library), and more.

${citations.length > 0 ? 'Please review the citations below for specific details from the source documents.' : 'Would you like me to search for more specific information?'}`;
    } else {
      // If no citations, provide a helpful general response
      return `I understand you're asking about "${query}". My knowledge base covers:

• **UI & Styling**: Tailwind CSS, ShadCN UI, Material UI, Ant Design, Bootstrap, Styled-Components, CSS Modules
• **State Management**: Redux Toolkit, Zustand, MobX, Recoil
• **Forms & Validation**: React Hook Form, Formik, Zod, Yup
• **Data Fetching**: Axios, Fetch API, React Query, SWR
• **Routing**: React Router, Next.js Router
• **Charts**: Chart.js, Recharts, D3.js
• **Animations**: Framer Motion, GSAP
• **Utilities**: Lodash, Day.js, UUID
• **Testing**: Jest, React Testing Library
• **Core**: React, TypeScript, RAG architecture, Performance optimization

Try rephrasing your question with specific technology names or keywords, and I'll provide detailed information with citations!`;
    }
  };

  return generateGeneralResponse(query, citations);
};

export const mockApiService = {
  async sendMessage(userMessage: string): Promise<Message> {
    // Simulate network latency (1-2 seconds)
    const latency = 1000 + Math.random() * 1000;
    await delay(latency);

    // Simulate occasional errors
    if (shouldSimulateError()) {
      throw new Error('Network error: Failed to fetch response. Please try again.');
    }

    // Generate citations (excluding already cited documents)
    const citations = generateCitations(userMessage);

    // Generate response
    const response = generateResponse(userMessage, citations);

    // Create assistant message
    const assistantMessage: Message = {
      id: `msg-${Date.now()}-${Math.random()}`,
      role: 'assistant',
      content: response,
      citations: citations.length > 0 ? citations : undefined,
      timestamp: new Date(),
    };

    return assistantMessage;
  },

  getDocumentContent(documentTitle: string, pageNumber: number): string | null {
    const doc = MOCK_DOCUMENTS.find(d => d.title === documentTitle);
    if (!doc) return null;
    
    const page = doc.pages.find(p => p.page === pageNumber);
    return page?.content || null;
  },
};
