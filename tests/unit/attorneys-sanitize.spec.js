import { test, expect } from '@playwright/test';
import { attorneysSanitize } from '../../utils/helpers';

// WPGraphQL answers `null` in a post's "Lawyers mentioned in this article"
// (`selectHeroes.selectAttorneys`) for an attorney profile that is no longer
// published (draft or trash). On 2026-11-25 four posts answered 500 because of
// it, e.g. /firm-events/scarinci-hollenbeck-recaps-the-2025-njsba-workshop.
const attorney = (databaseId, designation) => ({
  databaseId,
  uri: `/attorneys/a-${databaseId}`,
  title: `Attorney ${databaseId}`,
  status: 'publish',
  attorneyMainInformation: {
    designation,
    profileImage: { sourceUrl: `/a-${databaseId}.jpg` },
  },
  attorneyPrimaryRelatedPracticesLocationsGroups: {},
});

test('skips attorneys WordPress answers as null and keeps the rest', () => {
  const result = attorneysSanitize([
    attorney(1, 'Associate'),
    null,
    attorney(2, 'Partner'),
  ]);

  expect(result.map((a) => a.databaseId)).toEqual([2, 1]);
});

test('returns an empty list when every attorney is null', () => {
  expect(attorneysSanitize([null, null])).toEqual([]);
});
