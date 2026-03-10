import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import styled, { keyframes } from 'styled-components';

const VARIANTS = {
  info: '#0d6efd',
  error: '#9b1c1c',
};

const fadeInOut = keyframes`
  0%   { opacity: 0; transform: translateY(8px); }
  15%  { opacity: 1; transform: translateY(0); }
  85%  { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(8px); }
`;

const ToastEl = styled.div`
  position: fixed;
  bottom: 24px;
  right: 24px;
  background: ${({ $variant }) => VARIANTS[$variant] ?? VARIANTS.info};
  color: #fff;
  padding: 12px 20px;
  border-radius: 6px;
  font-size: 14px;
  z-index: 9999;
  pointer-events: none;
  animation: ${fadeInOut} ${({ $duration }) => $duration}ms ease forwards;
`;

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  const showToast = useCallback(
    (message, variant = 'info', duration = 2000) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setToast({
        message,
        variant,
        duration,
        key: Date.now(),
      });
      timerRef.current = setTimeout(() => setToast(null), duration);
    },
    [],
  );

  useEffect(() => () => clearTimeout(timerRef.current), []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {toast
        && createPortal(
          <ToastEl
            $variant={toast.variant}
            $duration={toast.duration}
            key={toast.key}
          >
            {toast.message}
          </ToastEl>,
          document.body,
        )}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx.showToast;
}
