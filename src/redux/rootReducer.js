import {APPLY_STYLE, CHANGE_STYLES, CHANGE_TEXT, CHANGE_TITLE, TABLE_RESIZE} from '@/redux/types';

export function rootReducer(state, action) {
  const {type, data} = action;
  switch (type) {
    case TABLE_RESIZE:
      return {
        ...state,
        resizeState: {
          ...state.resizeState,
          [data.id]: {
            ...state.resizeState[data.id],
            ...data.value,
          },
        },
      };
    case CHANGE_TEXT:
      return {
        ...state,
        currentText: {
          [data.id]: data.value,
        },
        dataState: {
          ...state.dataState,
          [data.id]: data.value,
        },
      };
    case CHANGE_STYLES:
      return {
        ...state,
        currentStyles: data,
      };
    case APPLY_STYLE:
      return {
        ...state,
        stylesState: {
          ...state.stylesState,
          ...data.ids.reduce((acc, id) => {
            acc[id] = {...state.stylesState[id] || {}, ...data.value};
            return acc;
          }, {}),
        },
      };
    case CHANGE_TITLE:
      return {
        ...state,
        titleState: data,
      };
    default:
      return state;
  }
}
