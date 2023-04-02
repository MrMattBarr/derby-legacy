import { Line } from "../types/Line";

export const TEST_LINE: Line = {
  id: "TEST_LINE",
  delivery: "Angry",
  name: "Narrator - 1",
  takes: [],
  context: "Alan has just watched his car get driven into a lake",
  text: `No. Thank you. No. I don't want any peanut butter. Thanks.`,
};

export const TEST_LINE_IDS = [
  "test-line-0",
  "test-line-1",
  "test-line-2",
  "test-line-3",
  "test-line-4",
  "test-line-5",
  "test-line-6",
];

export const TEST_LINES = {
  [TEST_LINE_IDS[0]]: {
    ...TEST_LINE,
    id: TEST_LINE_IDS[0],
    name: "Narrator - 1",
  },
  [TEST_LINE_IDS[1]]: {
    ...TEST_LINE,
    id: TEST_LINE_IDS[1],
    name: "Narrator - 2",
    text: `Sharks are terrifying and menacing. Sharks have been terrifying and menacing for over a decade.`,
  },
  [TEST_LINE_IDS[2]]: {
    ...TEST_LINE,
    id: TEST_LINE_IDS[2],
    name: "Narrator - 3",
  },
  [TEST_LINE_IDS[3]]: {
    ...TEST_LINE,
    id: TEST_LINE_IDS[3],
    name: "Narrator - 4",
  },
  [TEST_LINE_IDS[4]]: { ...TEST_LINE, id: TEST_LINE_IDS[4] },
  [TEST_LINE_IDS[5]]: { ...TEST_LINE, id: TEST_LINE_IDS[5] },
  [TEST_LINE_IDS[6]]: { ...TEST_LINE, id: TEST_LINE_IDS[6] },
};
