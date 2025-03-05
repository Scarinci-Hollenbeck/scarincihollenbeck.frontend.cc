import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { setScrollDirection } from '../redux/slices/sizes.slice';

const useAnchorsLinks = () => {
  const dispatch = useDispatch();

  const handleClickAnchor = useCallback(
    (e, targetId) => {
      const targetElement = document.getElementById(targetId);
      if (!targetElement) return;

      const scrollY = window.scrollY;
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const direction = scrollY > targetPosition ? 'up' : 'down';
      dispatch(setScrollDirection(direction));

      setTimeout(() => {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }, 0);
    },
    [dispatch],
  );

  return { handleClickAnchor };
};

export default useAnchorsLinks;
