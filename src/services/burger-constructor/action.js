export const SET_OPEN_MODAL = 'SET_OPEN_MODAL'
export const SET_ACTIVE_TAB = 'SET_ACTIVE_TAB' 
export const setActiveTab = (tab) => ({
    type: SET_ACTIVE_TAB,
    payload: tab,
  });
  

export const setIsOpen = () =>({
    type:SET_OPEN_MODAL
})