import reducer, {
  setSelectedIngredient,
  initialState,
} from '../../../services/burger-ingredients/ingredient-details/reducer';

describe('IngredientDetailsTest', () => {
  it('setSelectedIng', () => {
    const action = setSelectedIngredient('ingData');
    const newState = reducer(initialState, action);
    expect(newState.selectedIngredient).toEqual('ingData');
  });
});
