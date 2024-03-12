import constructorReducer, {
  clearElements,
  deleteIngredient,
  moveIngredient,
  setBun,
  setDraggedElements,
} from '../../services/burger-constructor/reducer';


describe('constructorReducer', () => {
  const initialState = {
    bun: null,
    draggedElements: [],
  };

  it('should handle setBun', () => {
    const newState = constructorReducer(
      initialState,
      setBun('bunData'),
    );
    expect(newState.bun).toEqual('bunData');
  });

  it('should handle setDraggedElements', () => {
    const initialState = { bun: null, draggedElements: [] };
    const ingredient = {
      name: 'Ingredient1',
      unId: expect.any(String),
    };
    const newState = constructorReducer(
      initialState,
      setDraggedElements(ingredient),
    );
    expect(newState.draggedElements).toEqual([ingredient]);
  });

  it('should handle moveIngredient', () => {
    const state = {
      bun: null,
      draggedElements: [
        { name: 'Ingredient1', unId: '12345' },
        { name: 'Ingredient2', unId: '54321' },
      ],
    };
    const action = moveIngredient({ hoverIndex: 1, dragIndex: 0 });
    const newState = constructorReducer(state, action);
    expect(newState.draggedElements).toEqual([
      { name: 'Ingredient2', unId: '54321' },
      { name: 'Ingredient1', unId: '12345' },
    ]);
  });

  it('should handle deleteIngredient', () => {
    const state = {
      bun: null,
      draggedElements: [
        { name: 'Ingredient1', unId: '12345' },
        { name: 'Ingredient2', unId: '54321' },
      ],
    };
    const action = deleteIngredient('12345');
    const newState = constructorReducer(state, action);
    expect(newState.draggedElements).toEqual([
      { name: 'Ingredient2', unId: '54321' },
    ]);
  });

  it('should handle clearElements', () => {
    const state = {
      bun: 'BunData',
      draggedElements: [
        { name: 'Ingredient1', unId: '12345' },
        { name: 'Ingredient2', unId: '54321' },
      ],
    };
    const action = clearElements();
    const newState = constructorReducer(state, action);
    expect(newState).toEqual(initialState);
  });
});
