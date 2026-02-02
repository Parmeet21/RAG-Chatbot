import { X, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  conversationTitle: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDeleteModal = ({
  isOpen,
  conversationTitle,
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) => {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onCancel();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
      return () => window.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onCancel]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={onCancel}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-slate-800/95 backdrop-blur-xl rounded-2xl shadow-2xl max-w-md w-full border border-slate-700/50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                    className="p-2.5 bg-red-500/20 rounded-xl border border-red-500/30"
                  >
                    <AlertTriangle className="w-6 h-6 text-red-400" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-slate-100">Delete Conversation</h3>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={onCancel}
                  className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5 text-slate-300" />
                </motion.button>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-slate-200 mb-3 text-base">
                  Are you sure you want to delete this conversation?
                </p>
                <p className="text-sm text-slate-400 mb-6">
                  <span className="font-semibold text-slate-200">"{conversationTitle}"</span> will be permanently deleted and cannot be recovered.
                </p>

                {/* Actions */}
                <div className="flex gap-3 justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onCancel}
                    className="px-6 py-3 text-sm font-semibold text-slate-200 bg-slate-700/50 hover:bg-slate-700 rounded-xl transition-colors border border-slate-600/50"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onConfirm}
                    className="px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl transition-colors shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/50"
                  >
                    Delete
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};
