import { ThingWithId } from "api";
import { StoreContract } from "stores/Store";

export interface IContext<Type extends ThingWithId> {
  children: React.ReactNode;
  id: string;
  store: StoreContract<Type>;
}
export type ContextContract<Type> = {
  project?: Type;
};
