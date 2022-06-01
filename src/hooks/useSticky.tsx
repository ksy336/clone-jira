import { useEffect, useRef, useState } from 'react';

const useSticky = () => {
const [sticky, setIsSticky] = useState(false);
const headerRef = useRef(null);

  useEffect(() => {
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    }
  }, []);
  const isSticky = () => {
   return setIsSticky(window.scrollY !== 0);
  }
  return {sticky, headerRef};
}
export default useSticky;