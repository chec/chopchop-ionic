import { createContext, useState, useContext } from "react";

const LoadingContext = createContext({
  loadingCount: 0,

  /**
   * Although it is possible to remove the following I like to keep them here
   * because they help anyone importing LoadingContext to understand what API (methods)
   * this particular context has available
   */
  showLoading: () => {},
  hideLoading: () => {},
});

const LoadingProvider = ({ children }) => {
  /**
   * Loading state/controls
   */

  const showLoading = () => {
    toggleLoading((prevState) => {
      return {
        ...prevState,
        loadingCount: prevState.loadingCount + 1,
      };
    });
  };

  const hideLoading = () => {
    toggleLoading((prevState) => {
      return {
        ...prevState,
        loadingCount:
          prevState.loadingCount > 0 ? prevState.loadingCount - 1 : 0,
      };
    });
  };

  const loadingState = {
    loadingCount: 0,
    showLoading,
    hideLoading,
  };

  const [loading, toggleLoading] = useState(loadingState);

  return (
    <LoadingContext.Provider value={loading}>
      {children}
    </LoadingContext.Provider>
  );
};

const useLoader = () => useContext(LoadingContext);

export { LoadingProvider, LoadingContext, useLoader };
