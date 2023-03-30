import { Visibility } from "types/Demo";
import Spot from "../types/Spot";

export const TEST_SPOT: Spot = {
  id: "TEST_SPOT",
  title: "Hersheys",
  transcript: `No. Thank you. No. I don't want any peanut butter. Thanks.`,
  tags: ["hard-sell", "manly", "goofy"],
  length: 34356.292,
  visibility: Visibility.DRAFT,
  demos: [],
  author: "test_user_0",
  url: "https://www.bensound.com/bensound-music/bensound-wildblood.mp3",
  created: new Date().getTime(),
};

export const TEST_SPOT_IDS = [
  "test_spot_0",
  "test_spot_1",
  "test_spot_2",
  "test_spot_3",
  "test_spot_4",
  "test_spot_5",
  "test_spot_6",
];

export const TEST_SPOTS = {
  [TEST_SPOT_IDS[0]]: { ...TEST_SPOT, id: TEST_SPOT_IDS[0] },
  [TEST_SPOT_IDS[1]]: {
    ...TEST_SPOT,
    id: TEST_SPOT_IDS[1],
    title: "Wild Blood",
  },
  [TEST_SPOT_IDS[2]]: {
    ...TEST_SPOT,
    id: TEST_SPOT_IDS[2],
    title: "Bippity Boppity",
  },
  [TEST_SPOT_IDS[3]]: { ...TEST_SPOT, id: TEST_SPOT_IDS[3], title: "Rainbow" },
  [TEST_SPOT_IDS[4]]: {
    ...TEST_SPOT,
    id: TEST_SPOT_IDS[4],
    title: "Angry Man",
  },
  [TEST_SPOT_IDS[5]]: {
    ...TEST_SPOT,
    id: TEST_SPOT_IDS[5],
    url: "https://firebasestorage.googleapis.com/v0/b/derby-voice.appspot.com/o/MrMattBarr%2FVahzenstin.mp3-2795?alt=media&token=fafe9451-ed3e-40e5-92fe-d6ff4747d19f",
    title: "Meeting Minder",
  },
  [TEST_SPOT_IDS[6]]: {
    ...TEST_SPOT,
    id: TEST_SPOT_IDS[6],
    title: "Other Hershey",
  },
};
