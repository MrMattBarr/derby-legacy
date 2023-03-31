import { Line } from "../types/Line";

export const TEST_LINE: Line = {
  id: "TEST_LINE",
  delivery: "Angry",
  context: "Alan has just watched his car get driven into a lake",
  text: `No. Thank you. No. I don't want any peanut butter. Thanks.`,
};

export const TEST_LINE_IDS = [
  "test_line_0",
  "test_line_1",
  "test_line_2",
  "test_line_3",
  "test_line_4",
  "test_line_5",
  "test_line_6",
];

export const TEST_LINES = {
  [TEST_LINE_IDS[0]]: { ...TEST_LINE, id: TEST_LINE_IDS[0] },
  [TEST_LINE_IDS[1]]: { ...TEST_LINE, id: TEST_LINE_IDS[1] },
  [TEST_LINE_IDS[2]]: { ...TEST_LINE, id: TEST_LINE_IDS[2] },
  [TEST_LINE_IDS[3]]: { ...TEST_LINE, id: TEST_LINE_IDS[3] },
  [TEST_LINE_IDS[4]]: { ...TEST_LINE, id: TEST_LINE_IDS[4] },
  [TEST_LINE_IDS[5]]: { ...TEST_LINE, id: TEST_LINE_IDS[5] },
  [TEST_LINE_IDS[6]]: { ...TEST_LINE, id: TEST_LINE_IDS[6] },
};
