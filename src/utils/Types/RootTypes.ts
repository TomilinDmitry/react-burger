import { TElements } from './TElements';
import { TUser } from './TUser';

export type RootTypes = {
  ingredients: {
    data: TElements[]
    loading: boolean
    error?: string | null
    activeTab: string;
  };
  selected: {
    selectedIngredient: TElements | null
  };
  order: {
    data: TElements[];
    loading?: boolean;
    failed: boolean | null;
    orderName: string | null;
    orderNumber: number | null;
  };
  container: {
    bun: TElements | null;
    draggedElements: TElements[];
  };
  user: {
    user: TUser | null;
    isAuthChecked: boolean;
  };
};
