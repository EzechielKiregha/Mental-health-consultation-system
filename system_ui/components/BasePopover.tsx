'use client';
import { useEffect, useId, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { ArrowLeftIcon } from 'lucide-react';

const TRANSITION = { type: 'spring', bounce: 0.1, duration: 0.5 };

interface PopoverProps {
  title: string;
  children: React.ReactNode;
  buttonLabel?: string;
  isOpen?: boolean;
  onClose?: () => void;
  onClick?: () => void;
}

export default function BasePopover({
  title,
  children,
  buttonLabel = 'Open',
  isOpen: controlledIsOpen,
  onClose,
}: PopoverProps) {
  const uniqueId = useId();
  const [isOpen, setIsOpen] = useState(controlledIsOpen || false);

  // Sync controlled `isOpen` prop with internal state
  useEffect(() => {
    if (controlledIsOpen !== undefined) {
      setIsOpen(controlledIsOpen);
    }
  }, [controlledIsOpen]);

  // Close popover with Escape key
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        if (onClose) onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen && onClose) onClose();
  };

  return (
    <MotionConfig transition={TRANSITION}>
      <div className="relative flex items-center justify-center">
        {/* Trigger Button */}
        <motion.div
          key="button"
          className="relative group"
          layoutId={`popover-${uniqueId}`}
          onClick={handleToggle}
        >
          <motion.span
            layoutId={`popover-label-${uniqueId}`}
            className="hover:text-green-600 transition-all duration-300 cursor-pointer"
          >
            {buttonLabel}
          </motion.span>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-full h-0.5 bg-green-600 transition-all duration-300"></div>
        </motion.div>

        {/* Full-Page Overlay */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Popover Content */}
              <motion.div
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                className="w-[90%] md:w-[50%] bg-white rounded-lg text-gray-800 shadow-lg overflow-hidden relative flex flex-col"
              >
                {/* Header */}
                <div className="flex items-center p-4 border-b border-gray-200">
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      if (onClose) onClose();
                    }}
                    className="flex items-center text-green-600 hover:text-green-500"
                  >
                    <ArrowLeftIcon size={20} className="mr-2" /> Back
                  </button>
                  <h3 className="text-lg font-semibold ml-auto">{title}</h3>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col items-center justify-center p-6 overflow-y-auto">
                  {children}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}