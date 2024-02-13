import React from 'react';
import { useSelector } from 'react-redux';
import SortingIng from './sorting';
import { TElements } from '../../../../utils/Types/TElements';

const CenterStubs = () => {
  const { draggedElements} = useSelector((state:{container:{draggedElements:TElements[]}}) => state.container);
  return (
    <div>
      {draggedElements.length > 0 ? (
        draggedElements.map((ingredient:TElements, index:number) => (
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
