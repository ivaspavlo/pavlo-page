import { useEffect, RefObject } from 'react';

function useOutsideAlerter(ref: RefObject<any>, start: boolean, clickOutside: Function): void {
  useEffect(() => {
    if (!start) {
      return;
    }
    
    function handleClickOutside(event: MouseEvent): void {
      if (ref && ref.current && !ref.current.contains(event.target)) {
        document.removeEventListener("mousedown", handleClickOutside);
        clickOutside();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [ref, start]);
}

export default useOutsideAlerter;
