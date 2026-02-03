import { useChat } from '../context/ChatContext';
import { X, FileText, ChevronLeft, ChevronRight, Download, FileDown } from 'lucide-react';
import { mockApiService } from '../services/mockApi';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { jsPDF } from 'jspdf';

export const DocumentViewer = () => {
  const { selectedCitation, isDocumentViewerOpen, closeDocumentViewer, messages } = useChat();
  const [documentContent, setDocumentContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [currentCitationIndex, setCurrentCitationIndex] = useState(0);
  const [availableCitations, setAvailableCitations] = useState<typeof selectedCitation[]>([]);

  useEffect(() => {
    if (selectedCitation && isDocumentViewerOpen) {
      // Find all citations from the current conversation
      const allCitations = messages
        .filter(msg => msg.role === 'assistant' && msg.citations)
        .flatMap(msg => msg.citations || []);
      
      // Remove duplicates: keep only unique document+page combinations
      // Use a Map to track unique citations by documentTitle + pageNumber
      const uniqueCitationsMap = new Map<string, typeof selectedCitation>();
      
      allCitations.forEach(citation => {
        // Create a unique key from document title and page number
        const uniqueKey = `${citation.documentTitle.toLowerCase()}_${citation.pageNumber}`;
        // Only add if we haven't seen this document+page combination before
        if (!uniqueCitationsMap.has(uniqueKey)) {
          uniqueCitationsMap.set(uniqueKey, citation);
        }
      });
      
      // Convert Map values back to array
      const uniqueCitations = Array.from(uniqueCitationsMap.values());
      
      setAvailableCitations(uniqueCitations);
      
      // Find the index of the selected citation in the unique list
      // If the exact citation isn't found, find by document+page match
      const index = uniqueCitations.findIndex(c => 
        c.id === selectedCitation.id || 
        (c.documentTitle.toLowerCase() === selectedCitation.documentTitle.toLowerCase() && 
         c.pageNumber === selectedCitation.pageNumber)
      );
      setCurrentCitationIndex(index >= 0 ? index : 0);
    }
  }, [selectedCitation, isDocumentViewerOpen, messages]);

  // Load content when citation index or available citations change
  useEffect(() => {
    if (availableCitations.length > 0 && isDocumentViewerOpen) {
      const currentCitation = availableCitations[currentCitationIndex];
      if (currentCitation) {
        setLoading(true);
        // Small delay to show loading state
        setTimeout(() => {
          const content = mockApiService.getDocumentContent(
            currentCitation.documentTitle,
            currentCitation.pageNumber
          );
          setDocumentContent(content);
          setLoading(false);
        }, 100);
      }
    }
  }, [currentCitationIndex, availableCitations, isDocumentViewerOpen]);

  // Prevent body scroll when document viewer is open on mobile
  useEffect(() => {
    if (isDocumentViewerOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = '';
      };
    }
  }, [isDocumentViewerOpen]);

  const handlePrevious = () => {
    if (currentCitationIndex > 0) {
      setCurrentCitationIndex(currentCitationIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentCitationIndex < availableCitations.length - 1) {
      setCurrentCitationIndex(currentCitationIndex + 1);
    }
  };

  const handleDownload = () => {
    // Use currentCitationIndex to get the current citation
    const currentCitation = availableCitations.length > 0 
      ? availableCitations[currentCitationIndex] || availableCitations[0]
      : selectedCitation;

    if (!currentCitation || !documentContent) return;

    // Create document content for download
    const downloadContent = `DOCUMENT: ${currentCitation.documentTitle}
PAGE: ${currentCitation.pageNumber}

REFERENCED SNIPPET:
${currentCitation.snippet}

FULL CONTENT:
${documentContent}

---
Downloaded from RAG Chatbot
Date: ${new Date().toLocaleString()}
`;

    // Create a blob and download
    const blob = new Blob([downloadContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentCitation.documentTitle.replace(/\s+/g, '_')}_Page_${currentCitation.pageNumber}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPDF = () => {
    // Use currentCitationIndex to get the current citation
    const currentCitation = availableCitations.length > 0 
      ? availableCitations[currentCitationIndex] || availableCitations[0]
      : selectedCitation;

    if (!currentCitation || !documentContent) return;

    // Create PDF document
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const margin = 20;
    const maxWidth = pageWidth - (margin * 2);
    let yPosition = margin;

    // Helper function to add text with word wrapping
    const addText = (text: string, fontSize: number, isBold: boolean = false, spacing: number = 7) => {
      pdf.setFontSize(fontSize);
      if (isBold) {
        pdf.setFont('helvetica', 'bold');
      } else {
        pdf.setFont('helvetica', 'normal');
      }
      
      const lines = pdf.splitTextToSize(text, maxWidth);
      lines.forEach((line: string) => {
        if (yPosition > pdf.internal.pageSize.getHeight() - margin) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(line, margin, yPosition);
        yPosition += spacing;
      });
    };

    // Add title
    addText(currentCitation.documentTitle, 16, true, 10);
    yPosition += 5;

    // Add page number
    addText(`Page ${currentCitation.pageNumber}`, 12, false, 8);
    yPosition += 10;

    // Add separator
    pdf.setDrawColor(200, 200, 200);
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    // Add referenced snippet section
    addText('REFERENCED SNIPPET:', 12, true, 8);
    yPosition += 3;
    addText(currentCitation.snippet, 10, false, 6);
    yPosition += 10;

    // Add separator
    pdf.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;

    // Add full content section
    addText('FULL CONTENT:', 12, true, 8);
    yPosition += 3;
    addText(documentContent, 10, false, 6);
    yPosition += 10;

    // Add footer
    pdf.setFontSize(8);
    pdf.setFont('helvetica', 'italic');
    pdf.setTextColor(128, 128, 128);
    const footerText = `Downloaded from RAG Chatbot - ${new Date().toLocaleString()}`;
    const footerLines = pdf.splitTextToSize(footerText, maxWidth);
    footerLines.forEach((line: string) => {
      if (yPosition > pdf.internal.pageSize.getHeight() - margin) {
        pdf.addPage();
        yPosition = margin;
      }
      pdf.text(line, margin, yPosition);
      yPosition += 5;
    });

    // Download PDF
    const fileName = `${currentCitation.documentTitle.replace(/\s+/g, '_')}_Page_${currentCitation.pageNumber}.pdf`;
    pdf.save(fileName);
  };

  if (!isDocumentViewerOpen || !selectedCitation) return null;

  // Use currentCitationIndex to get the current citation
  const currentCitation = availableCitations.length > 0 
    ? availableCitations[currentCitationIndex] || availableCitations[0]
    : selectedCitation;

  // Safety check - should never happen but TypeScript needs it
  if (!currentCitation) return null;

  return (
    <AnimatePresence>
      {isDocumentViewerOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
            onClick={closeDocumentViewer}
          />

          {/* Side Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full md:w-96 lg:w-[500px] bg-slate-800/95 backdrop-blur-xl shadow-2xl z-50 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-slate-700/50 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10">
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                className="p-2.5 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl shadow-lg"
              >
                <FileText className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <h2 className="font-bold text-slate-100 text-lg">Document Viewer</h2>
                <p className="text-xs text-slate-400">Source material</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownload}
                  disabled={!documentContent || loading}
                  className="px-3 py-2 text-xs font-medium text-blue-300 bg-blue-500/10 hover:bg-blue-500/20 border border-blue-500/30 rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
                  aria-label="Download as text"
                  title={loading ? "Loading document..." : documentContent ? "Download as TXT" : "Document not available"}
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">TXT</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleDownloadPDF}
                  disabled={!documentContent || loading}
                  className="px-3 py-2 text-xs font-medium text-purple-300 bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
                  aria-label="Download as PDF"
                  title={loading ? "Loading document..." : documentContent ? "Download as PDF" : "Document not available"}
                >
                  <FileDown className="w-4 h-4" />
                  <span className="hidden sm:inline">PDF</span>
                </motion.button>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={closeDocumentViewer}
                className="p-2.5 hover:bg-slate-700/50 rounded-xl transition-colors"
                aria-label="Close document viewer"
              >
                <X className="w-5 h-5 text-slate-300" />
              </motion.button>
            </div>
          </div>

          {/* Navigation */}
          {availableCitations.length > 1 && (
            <div className="flex items-center justify-between p-4 border-b border-slate-700/50 bg-slate-800/50">
              <motion.button
                whileHover={{ scale: 1.05, x: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrevious}
                disabled={currentCitationIndex === 0}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-200 bg-slate-700/50 border-2 border-slate-600 rounded-xl hover:bg-blue-500/20 hover:border-blue-500/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous
              </motion.button>
              <div className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl border-2 border-blue-500/30 shadow-lg">
                <span className="text-sm font-bold text-blue-300">
                  {currentCitationIndex + 1}
                </span>
                <span className="text-sm text-slate-400">of</span>
                <span className="text-sm font-bold text-slate-200">
                  {availableCitations.length}
                </span>
              </div>
              <motion.button
                whileHover={{ scale: 1.05, x: 2 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                disabled={currentCitationIndex === availableCitations.length - 1}
                className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-200 bg-slate-700/50 border-2 border-slate-600 rounded-xl hover:bg-blue-500/20 hover:border-blue-500/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </motion.button>
            </div>
          )}

          {/* Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-6">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="rounded-full h-10 w-10 border-4 border-blue-500/30 border-t-blue-500"
                />
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-6 rounded-2xl border border-blue-500/20 shadow-xl">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-2xl font-bold text-slate-100 mb-3">
                        {currentCitation.documentTitle}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span className="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-semibold rounded-full shadow-lg">
                          Page {currentCitation.pageNumber}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-l-4 border-blue-500 pl-6 py-5 bg-blue-500/10 rounded-r-xl shadow-lg backdrop-blur-sm">
                  <div className="flex items-center gap-2 mb-3">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="w-3 h-3 bg-blue-400 rounded-full shadow-lg shadow-blue-500/50"
                    />
                    <p className="text-sm font-bold text-blue-300 uppercase tracking-wide">
                      Referenced Snippet
                    </p>
                  </div>
                  <p className="text-sm text-slate-200 leading-relaxed">
                    {currentCitation.snippet}
                  </p>
                </div>

                <div className="bg-slate-700/50 p-6 rounded-xl border border-slate-600/50 shadow-xl backdrop-blur-sm">
                  <h4 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
                    <span className="w-1 h-5 bg-gradient-to-b from-blue-400 to-purple-400 rounded shadow-lg"></span>
                    Full Content
                  </h4>
                  <p className="text-slate-300 leading-relaxed whitespace-pre-wrap text-[15px]">
                    {documentContent || 'Content not available'}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
