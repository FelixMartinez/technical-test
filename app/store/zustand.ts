import { create } from 'zustand';

const useStore = create((set) => ({
  items: [],
  selectedItem: null,
  navigationHistory: [],
  editableData: {},

  setItems: (items) => set({ items }),

  selectItem: (item) => set({ selectedItem: item, editableData: item }),

  addToNavigationHistory: (route) =>
    set((state) => ({
      navigationHistory: [...state.navigationHistory, route],
    })),

  updateEditableData: (key, value) =>
    set((state) => {
      const updatedData = { ...state.editableData, [key]: value };

      return {
        editableData: updatedData,
        selectedItem: updatedData,
        items: state.items.map((item) =>
          item.id === state.selectedItem.id ? updatedData : item
        ),
      };
    }),

  clearState: () =>
    set({
      items: [],
      selectedItem: null,
      navigationHistory: [],
      editableData: {},
    }),
}));

export default useStore;
