import React from 'react';
import { useSelector } from '../../../../utils/Types/hooks/typed-hooks';
import SortingIng from './sorting';


const CenterStubs = () => {
  const { draggedElements } = useSelector((state) => state.container);
  return (
    <div data-testid='mainIng'>
      {draggedElements.length > 0 ? (
        draggedElements.map((ingredient, index) => (
          <div key={ingredient.unId}>
            <SortingIng index={index} ingredient={ingredient} />
          </div>
        ))
      ) : (
        <p>Выберите начинку</p>
      )}
    </div>
  );
};

export default CenterStubs;
