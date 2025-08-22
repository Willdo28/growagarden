import { useState, useEffect } from 'react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error';
}

class ToastManager {
  private toasts: Toast[] = [];
  private listeners: ((toasts: Toast[]) => void)[] = [];

  subscribe(listener: (toasts: Toast[]) => void) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener([...this.toasts]));
  }

  show(message: string, type: 'success' | 'error' = 'success') {
    const id = Date.now().toString();
    const toast: Toast = { id, message, type };
    
    this.toasts.push(toast);
    this.notifyListeners();

    // Auto remove after 3 seconds
    setTimeout(() => {
      this.toasts = this.toasts.filter(t => t.id !== id);
      this.notifyListeners();
    }, 3000);
  }
}

export const toastManager = new ToastManager();

export function ToastContainer() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    return toastManager.subscribe(setToasts);
  }, []);

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className={`
            bg-white p-4 rounded-md shadow-lg border-l-4 min-w-[300px] toast-slide-in
            ${toast.type === 'success' ? 'border-l-leaf-green' : 'border-l-brick-red'}
          `}
          data-testid={`toast-${toast.type}`}
        >
          <div className="font-semibold mb-1">
            {toast.type === 'success' ? '✅ Success' : '❌ Error'}
          </div>
          <div>{toast.message}</div>
        </div>
      ))}
    </div>
  );
}
