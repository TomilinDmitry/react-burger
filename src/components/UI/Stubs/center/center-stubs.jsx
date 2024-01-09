import React from 'react';
import { useSelector } from 'react-redux';
import SortingIng from './sorting';
import { v4 as uuidv4 } from 'uuid';

const CenterStubs = () => {
  const { draggedElements } = useSelector((state) => state.container);
  return (
    <div>
      {draggedElements.length > 0 ? (
        draggedElements.map((ingredient, index) => (
          <div key={uuidv4()}>
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
