export const ValidFlightData = [
  {
    from: 'GRU',
    to: 'SCL',
  },
  {
    from: 'SFO',
    to: 'GRU',
  },
  {
    from: 'SCL',
    to: 'HN',
  },
  {
    from: 'MIA',
    to: 'SFO',
  },
  {
    from: 'EZE',
    to: 'MIA',
  },
];

export const SortedFlightData = [
  {
    from: 'EZE',
    to: 'MIA',
  },
  {
    from: 'MIA',
    to: 'SFO',
  },
  {
    from: 'SFO',
    to: 'GRU',
  },
  {
    from: 'GRU',
    to: 'SCL',
  },
  {
    from: 'SCL',
    to: 'HN',
  },
];

export const DuplicatedVisitDestinationData = [
  {
    from: 'GRU',
    to: 'SCL',
  },
  {
    from: 'SFO',
    to: 'GRU',
  },
  {
    from: 'SCL',
    to: 'GRU',
  },
  {
    from: 'MIA',
    to: 'SFO',
  },
  {
    from: 'EZE',
    to: 'MIA',
  },
];

export const OrphanDepartureData = [
  {
    from: 'GRU',
    to: 'SCL',
  },
  {
    from: 'SFO',
    to: 'GRU',
  },
  {
    from: 'SCL',
    to: 'HN',
  },
  {
    from: 'MIA',
    to: 'SFO',
  },
  {
    from: 'NY',
    to: 'SGP',
  },
  {
    from: 'EZE',
    to: 'MIA',
  },
];

export const MissingFieldsData = [
  {
    from: 'GRU',
  },
  {
    from: 'SFO',
    to: 'GRU',
  },
  {
    to: 'HN',
  },
  {
    from: 'MIA',
    to: 'SFO',
  },
  {
    from: 'EZE',
    to: 'MIA',
  },
];
