import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  LibraryTag,
  LibraryTagLink,
  LibraryTagsCollapseOpener,
  LibraryTags as LibraryTagsList,
  LibraryTagsSection,
} from 'styles/library/LibraryTags.style';
import empty from 'is-empty';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { BsXLg } from 'react-icons/bs';
import { changeTitle } from 'utils/helpers';
import { useRouter } from 'next/router';
import { setSelectedTags } from '../../../redux/slices/library.slice';

const tagVariants = {
  hidden: { opacity: 0, y: -10, display: 'none' },
  visible: (index) => ({
    opacity: 1,
    y: 0,
    display: 'block',
    transition: { duration: 0.3, delay: index * 0.05 },
  }),
};

const buttonVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const LibraryTags = ({ tags = [], maxLengthTags = 10, handleClickTag }) => {
  const dispatch = useDispatch();
  const { query } = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const { selectedTags } = useSelector((state) => state.library);
  const animationCount = useRef(0);

  const selectedTagIds = useMemo(
    () => new Set(selectedTags.map((tag) => tag.databaseId)),
    [selectedTags],
  );

  const visibleTags = useMemo(() => {
    const selectedTagsList = tags.filter((tag) => selectedTagIds.has(tag?.databaseId));
    const unselectedTagsList = tags.filter(
      (tag) => !selectedTagIds.has(tag?.databaseId),
    );
    return [...selectedTagsList, ...unselectedTagsList].slice(
      0,
      isCollapsed ? tags.length : maxLengthTags,
    );
  }, [tags, selectedTagIds, isCollapsed, maxLengthTags]);

  const handleClickCollapse = useCallback(() => {
    setIsAnimating(true);
    setIsCollapsed((prev) => !prev);
  }, []);

  const handleAnimationStart = useCallback(() => {
    animationCount.current += 1;
  }, []);

  const handleAnimationComplete = useCallback(() => {
    animationCount.current -= 1;
    if (animationCount.current === 0) {
      setIsAnimating(false);
    }
  }, []);

  const onClickTag = useCallback(
    (tag, isSelected) => {
      const { databaseId, name, uri } = tag;
      const updatedSelectedTags = isSelected
        ? selectedTags.filter(
          (selectedTag) => selectedTag.databaseId !== databaseId,
        )
        : [...selectedTags, { value: name, databaseId, slug: uri }];

      if (handleClickTag) {
        handleClickTag(updatedSelectedTags);
      }

      dispatch(setSelectedTags(updatedSelectedTags));
    },
    [dispatch, selectedTags, handleClickTag],
  );

  useEffect(() => {
    const newTags = [];

    if (!empty(query.tag)) {
      query.tag.split(',').forEach((id) => {
        const option = tags?.find(
          (item) => item?.databaseId?.toString() === id,
        );
        if (option) {
          newTags.push(option);
        }
      });
    }

    const newTagIds = new Set(newTags.map((tag) => tag.databaseId));
    const selectedTagIdsSet = new Set(
      selectedTags.map((tag) => tag.databaseId),
    );

    if (
      newTagIds.size !== selectedTagIdsSet.size
      || [...newTagIds].some((id) => !selectedTagIdsSet.has(id))
    ) {
      dispatch(setSelectedTags(newTags));
    }
  }, [query, tags]);

  if (empty(tags)) return null;
  return (
    <LibraryTagsSection>
      <LibraryTagsList>
        <AnimatePresence>
          {visibleTags.map((tag, index) => {
            const isNew = index >= maxLengthTags;
            const isSelected = selectedTagIds.has(tag.databaseId);
            return (
              <LibraryTag
                as={motion.li}
                key={tag?.databaseId}
                custom={isNew ? index - maxLengthTags : 0}
                initial={isNew ? 'hidden' : 'visible'}
                animate="visible"
                exit={(index) => ({
                  opacity: 0,
                  y: -10,
                  transition: {
                    duration: isCollapsed || !isSelected ? 0.3 : 0,
                    delay:
                      isCollapsed || !isSelected
                        ? (tags?.length - maxLengthTags - index) * 0.05
                        : 0,
                  },
                  transitionEnd: {
                    display: 'none',
                  },
                })}
                variants={tagVariants}
                onAnimationStart={handleAnimationStart}
                onAnimationComplete={handleAnimationComplete}
              >
                <LibraryTagLink
                  as="button"
                  onClick={() => onClickTag(tag, isSelected)}
                  className={isSelected ? 'selected' : ''}
                >
                  {`${changeTitle(tag?.name, false)}${
                    !empty(tag?.count) ? ` (${tag?.count})` : ''
                  }`}
                  {isSelected && <BsXLg />}
                </LibraryTagLink>
              </LibraryTag>
            );
          })}
        </AnimatePresence>

        {tags.length > maxLengthTags && !isAnimating && (
          <motion.li
            initial="hidden"
            animate="visible"
            variants={buttonVariants}
          >
            <LibraryTagsCollapseOpener
              as="button"
              onClick={handleClickCollapse}
            >
              {isCollapsed ? 'Hide' : 'Open more'}
            </LibraryTagsCollapseOpener>
          </motion.li>
        )}
      </LibraryTagsList>
    </LibraryTagsSection>
  );
};

export default LibraryTags;
