import { TElements } from './TElements';
import { TOrderInfo } from './TOrderInfo';
import { TUser } from './TUser';

export type RootTypes = {
  ingredients: {
    data: TElements[];
    loading: boolean;
    error?: string | null;
    activeTab: string;
  };
  selected: {
    selectedIngredient: TElements | null;
  };
  order: TOrderInfo;
  container: {
    bun: TElements | null;
    draggedElements: TElements[];
  };
  user: {
    user: TUser | null;
    isAuthChecked: boolean;
  };
};
