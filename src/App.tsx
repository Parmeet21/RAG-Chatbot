import { ChatProvider } from './context/ChatContext';
import { ConversationHistory } from './components/ConversationHistory';
import { ChatContainer } from './components/ChatContainer';
import { ChatInput } from './components/ChatInput';
import { DocumentViewer } from './components/DocumentViewer';

function App() {
  return (
    <ChatProvider>
      <div className="flex h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden relative">
        <ConversationHistory />
        <div className="flex-1 flex flex-col overflow-hidden min-w-0">
          <ChatContainer />
          <ChatInput />
        </div>
        <DocumentViewer />
      </div>
    </ChatProvider>
  );
}

export default App;
