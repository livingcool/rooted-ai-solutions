import React, { createContext, useContext, useState } from 'react';
import LeadModal from '../components/LeadModal';

interface ModalContextType {
  openLeadModal: () => void;
  closeLeadModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);

  const openLeadModal = () => setIsLeadModalOpen(true);
  const closeLeadModal = () => setIsLeadModalOpen(false);

  return (
    <ModalContext.Provider value={{ openLeadModal, closeLeadModal }}>
      {children}
      <LeadModal isOpen={isLeadModalOpen} onClose={closeLeadModal} />
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}
