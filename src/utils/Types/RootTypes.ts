import { TElements } from './TElements';
import { TUser } from './TUser';

export type RootTypes = {
  ingredients: {
    data: TElements[];
    loading?: boolean;
    error?: string | null;
    activeTab: string;
  };
  selected: {
    selectedIngredient: TElements;
  };
  order: {
    data: TElements[];
    loading?: boolean;
    failed: boolean | null;
    orderName: string;
    orderNumber: number;
  };
  container: {
    bun: TElements;
    draggedElements: TElements[];
  };
  user: {
    user: TUser | null;
    isAuthChecked: boolean;
  };
};
