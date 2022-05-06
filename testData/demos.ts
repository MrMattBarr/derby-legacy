import Demo from "../types/Demo";
import { TEST_SPOT_IDS } from "./spots";

export const TEST_DEMO: Demo = {
  id: "TEST_SPOT",
  title: "Narration",
  spots: TEST_SPOT_IDS.slice(4),
  userId: "TEST_USER",
};
