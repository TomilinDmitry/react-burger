import reducer, {
  setActiveTab,
  initialState,
} from '../../services/burger-ingredients/reducer';
import { getIngredient } from '../../utils/Api/api-ingredients';

describe('Burger Ingredients Test', () => {
  it('setActiveTab test', () => {
    const action = setActiveTab('sauce');
    const newState = reducer(initialState, action);
    expect(newState.activeTab).toEqual('sauce');
  });
});
describe('ingredientsSlice extraReducers', () => {
  it('should handle getIngredient.pending', () => {
    const action = { type: getIngredient.pending.type };
    const newState = reducer(initialState, action);
    expect(newState.loading).toEqual(true);
    expect(newState.error).toBeNull();
  });

  it('should handle getIngredient.fulfilled', () => {
    const action = {
      type: getIngredient.fulfilled.type,
      payload: [{ id: 1, name: 'Ingredient 1' }],
    };
    const newState = reducer(initialState, action);
    expect(newState.data).toEqual([{ id: 1, name: 'Ingredient 1' }]);
    expect(newState.error).toBeNull();
    expect(newState.loading).toEqual(false);
  });

  it('should handle getIngredient.rejected', () => {
    const action = {
      type: getIngredient.rejected.type,
      error: { message: 'Ошибка' },
    };
    const newState = reducer(initialState, action);
    expect(newState.error).toEqual('Ошибка');
  });
});
