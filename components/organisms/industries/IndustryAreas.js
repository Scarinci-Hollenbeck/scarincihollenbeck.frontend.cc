import React, { Fragment, useEffect, useRef } from 'react';
import empty from 'is-empty';
import { JSXWithDynamicLinks } from 'components/atoms/micro-templates/JSXWithDynamicLinks';
import VerticalTabsContentColumns from 'components/organisms/locations/VerticalTabsContentColumns';
import { Title60 } from 'styles/common/Typography.style';
import {
  AreaCounter,
  AreaHeading,
  AreaHeadings,
  AreaMain,
  AreaNext,
  AreaPanel,
  AreaPractices,
  AreaPracticesLabel,
  AreasContainer,
  AreasSection,
  AreaTitle,
} from 'styles/IndustryAreas.style';
import {
  areaIndexForKey,
  areaNumber,
  nextAreaIndex,
  splitRelatedPractices,
} from 'utils/industry-areas';

// Space the sticky site header takes at the top of the screen.
const HEADER_SPACE = 80;
// A panel that starts lower than this above the bottom edge reads as "not visible".
const BOTTOM_SPACE = 120;

const sameText = (a, b) => String(a || '')
  .trim()
  .toLowerCase()
  === String(b || '')
    .trim()
    .toLowerCase();

/**
 * Areas of Service on an industry page: the area headings in a grid, one
 * panel below them. Selecting a heading swaps the panel without moving the
 * page. On a phone the headings stack in one column and the panel can end up
 * below the screen; only then the page scrolls to the panel's top.
 *
 * Every panel is rendered on the server; inactive ones are hidden with CSS
 * only, so crawlers that do not run JavaScript read every area. A "Related
 * practices: ..." line at the end of an area's text moves into the column on
 * the right. Office pages keep the vertical tabs (VerticalTabs).
 */
const IndustryAreas = ({
  title,
  areas = [],
  anchorId = 'areas',
  activeArea = 0,
  setActiveArea,
}) => {
  const headingRefs = useRef([]);
  const panelRefs = useRef([]);
  const revealPanel = useRef(false);
  const count = areas?.length || 0;
  const selected = activeArea < count ? activeArea : 0;

  useEffect(() => {
    if (activeArea >= count && count > 0) setActiveArea?.(0);
  }, [activeArea, count, setActiveArea]);

  useEffect(() => {
    if (!revealPanel.current) return;
    revealPanel.current = false;
    const panel = panelRefs.current[selected];
    if (!panel) return;
    const { top } = panel.getBoundingClientRect();
    if (top < HEADER_SPACE || top > window.innerHeight - BOTTOM_SPACE) {
      panel.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }, [selected]);

  if (empty(areas)) return null;

  const select = (index) => {
    if (index === selected) return;
    revealPanel.current = true;
    setActiveArea?.(index);
  };

  const handleKeyDown = (event, index) => {
    const target = areaIndexForKey(event.key, index, count);
    if (target === null) return;
    event.preventDefault();
    select(target);
    headingRefs.current[target]?.focus();
  };

  const tabId = (index) => `${anchorId}-tab-${index + 1}`;
  const panelId = (index) => `${anchorId}-panel-${index + 1}`;

  return (
    <AreasSection id={anchorId} className="margin-scroll">
      <AreasContainer>
        {!empty(title) && <Title60>{title}</Title60>}

        <AreaHeadings role="tablist" aria-label={title || 'Areas of Service'}>
          {areas.map((area, index) => (
            <AreaHeading
              key={tabId(index)}
              ref={(node) => {
                headingRefs.current[index] = node;
              }}
              type="button"
              role="tab"
              id={tabId(index)}
              aria-controls={panelId(index)}
              aria-selected={index === selected}
              tabIndex={index === selected ? 0 : -1}
              onClick={() => select(index)}
              onKeyDown={(event) => handleKeyDown(event, index)}
            >
              <span className="area-number" aria-hidden="true">
                {areaNumber(index)}
              </span>
              <span>{area?.openerTitle}</span>
            </AreaHeading>
          ))}
        </AreaHeadings>

        {areas.map((area, index) => {
          const items = (area?.tabContent || []).map((item) => ({
            ...item,
            ...splitRelatedPractices(item?.description),
          }));
          const practices = items.flatMap((item) => item.practices);
          const next = nextAreaIndex(index, count);

          return (
            <AreaPanel
              key={panelId(index)}
              ref={(node) => {
                panelRefs.current[index] = node;
              }}
              role="tabpanel"
              id={panelId(index)}
              aria-labelledby={tabId(index)}
              className={`margin-scroll${
                index === selected ? ' is-selected' : ''
              }`}
            >
              <AreaMain>
                <AreaCounter>
                  {`${areaNumber(index)} OF ${areaNumber(count - 1)}`}
                </AreaCounter>
                <AreaTitle>{area?.openerTitle}</AreaTitle>
                {items.map((item, itemIndex) => (
                  <Fragment key={`${panelId(index)}-item-${itemIndex + 1}`}>
                    {/* WordPress usually repeats the area name here; the panel title already shows it. */}
                    {!empty(item?.title)
                      && !sameText(item.title, area?.openerTitle) && (
                        <h4>{item.title}</h4>
                    )}
                    {!empty(item.html) && (
                      <JSXWithDynamicLinks HTML={item.html} />
                    )}
                    <VerticalTabsContentColumns
                      titleTag="h4"
                      columns={item?.columns}
                    />
                  </Fragment>
                ))}
                {count > 1 && (
                  <AreaNext
                    type="button"
                    aria-controls={panelId(next)}
                    onClick={() => select(next)}
                  >
                    {`Next: ${areas[next]?.openerTitle} →`}
                  </AreaNext>
                )}
              </AreaMain>

              {!empty(practices) && (
                <AreaPractices>
                  <AreaPracticesLabel>Related practices</AreaPracticesLabel>
                  <ul>
                    {practices.map((practice) => (
                      <li key={practice}>
                        <JSXWithDynamicLinks HTML={practice} />
                      </li>
                    ))}
                  </ul>
                </AreaPractices>
              )}
            </AreaPanel>
          );
        })}
      </AreasContainer>
    </AreasSection>
  );
};

export default IndustryAreas;
