import reducer, {
  setSelectedIngredient,
} from '../../../services/burger-ingredients/ingredient-details/reducer';

describe('IngredientDetailsTest', () => {
  const initialState = {
    selectedIngredient: null,
  };
  it('setSelectedIng', () => {
    const action = setSelectedIngredient('ingData')
    const newState = reducer(
      initialState,
      action,
    );
    expect(newState.selectedIngredient).toEqual('ingData');
  });
});
