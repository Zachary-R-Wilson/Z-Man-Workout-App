import { useState, useCallback } from 'react';

function useBottomDrawer() {
  const [isVisible, setIsVisible] = useState(false);
  const [content, setContent] = useState<JSX.Element | null>(null);

  const openDrawer = useCallback(() => setIsVisible(true), []);
  const closeDrawer = useCallback(() => setIsVisible(false), []);

  const setDrawerContent = useCallback((element: JSX.Element) => {
    setContent(element);
  }, []);

  const getDrawerContent = useCallback(() => content, [content]);

  return {
    isVisible,
    content,
    openDrawer,
    closeDrawer,
    setDrawerContent,
    getDrawerContent,
  };
}

export default useBottomDrawer;
