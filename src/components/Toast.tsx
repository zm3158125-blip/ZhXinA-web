import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import './Toast.css';

interface ToastProps {
  message: string;
  onDone: () => void;
}

let showToastFn: (msg: string) => void = () => {};

export function showToast(message: string) {
  showToastFn(message);
}

const Toast: React.FC = () => {
  const [msg, setMsg] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    showToastFn = (message: string) => {
      setMsg(message);
      setVisible(true);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => {
      setVisible(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="toast"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <CheckCircle size={18} />
          <span>{msg}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
