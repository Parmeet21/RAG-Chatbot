import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Message, Conversation, Citation } from '../types';
import { mockApiService } from '../services/mockApi';

interface ChatContextType {
  currentConversation: Conversation | null;
  conversations: Conversation[];
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  selectedCitation: Citation | null;
  isDocumentViewerOpen: boolean;
  sendMessage: (content: string) => Promise<void>;
  startNewChat: () => void;
  selectConversation: (conversationId: string) => void;
  deleteConversation: (conversationId: string) => void;
  openDocumentViewer: (citation: Citation) => void;
  closeDocumentViewer: () => void;
  clearError: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider = ({ children }: ChatProviderProps) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversation, setCurrentConversation] = useState<Conversation | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCitation, setSelectedCitation] = useState<Citation | null>(null);
  const [isDocumentViewerOpen, setIsDocumentViewerOpen] = useState(false);

  const createNewConversation = useCallback(() => {
    const newConversation: Conversation = {
      id: `conv-${Date.now()}`,
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setCurrentConversation(newConversation);
    return newConversation;
  }, []);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    setError(null);
    
    // Create conversation if it doesn't exist
    let conversation = currentConversation;
    if (!conversation) {
      conversation = createNewConversation();
    }

    // Create user message
    const userMessage: Message = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    // Add user message immediately
    const updatedMessages = [...conversation.messages, userMessage];
    const updatedConversation = {
      ...conversation,
      messages: updatedMessages,
      updatedAt: new Date(),
      title: conversation.title === 'New Chat' && updatedMessages.length === 1
        ? content.trim().substring(0, 50)
        : conversation.title,
    };

    setCurrentConversation(updatedConversation);
    setIsLoading(true);

    try {
      // Get assistant response
      const assistantMessage = await mockApiService.sendMessage(content);

      // Add assistant message
      const finalMessages = [...updatedMessages, assistantMessage];
      const finalConversation = {
        ...updatedConversation,
        messages: finalMessages,
        updatedAt: new Date(),
      };

      setCurrentConversation(finalConversation);
      
      // Update conversations list
      setConversations(prev => {
        const existingIndex = prev.findIndex(c => c.id === finalConversation.id);
        if (existingIndex >= 0) {
          const updated = [...prev];
          updated[existingIndex] = finalConversation;
          return updated;
        }
        return [finalConversation, ...prev];
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, [currentConversation, createNewConversation]);

  const startNewChat = useCallback(() => {
    setCurrentConversation(null);
    setSelectedCitation(null);
    setIsDocumentViewerOpen(false);
    setError(null);
  }, []);

  const selectConversation = useCallback((conversationId: string) => {
    const conversation = conversations.find(c => c.id === conversationId);
    if (conversation) {
      setCurrentConversation(conversation);
      setSelectedCitation(null);
      setIsDocumentViewerOpen(false);
      setError(null);
    }
  }, [conversations]);

  const deleteConversation = useCallback((conversationId: string) => {
    setConversations(prev => prev.filter(c => c.id !== conversationId));
    
    // If the deleted conversation was the current one, clear it
    if (currentConversation?.id === conversationId) {
      setCurrentConversation(null);
      setSelectedCitation(null);
      setIsDocumentViewerOpen(false);
    }
  }, [currentConversation]);

  const openDocumentViewer = useCallback((citation: Citation) => {
    setSelectedCitation(citation);
    setIsDocumentViewerOpen(true);
  }, []);

  const closeDocumentViewer = useCallback(() => {
    setIsDocumentViewerOpen(false);
    setSelectedCitation(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const value: ChatContextType = {
    currentConversation,
    conversations,
    messages: currentConversation?.messages || [],
    isLoading,
    error,
    selectedCitation,
    isDocumentViewerOpen,
    sendMessage,
    startNewChat,
    selectConversation,
    deleteConversation,
    openDocumentViewer,
    closeDocumentViewer,
    clearError,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
