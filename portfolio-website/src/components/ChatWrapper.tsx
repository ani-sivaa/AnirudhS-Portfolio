'use client';

import { useState } from 'react';
import ChatButton from './ChatButton';
import ChatWindow from './ChatWindow';

export default function ChatWrapper() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ChatButton onClick={() => setIsOpen(true)} />
      {isOpen && <ChatWindow onClose={() => setIsOpen(false)} />}
    </>
  );
} 