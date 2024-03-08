import { createContext, useContext } from "react";
import { useSearchParams } from "react-router-dom";

const FilterContext = createContext({
  searchParams: {},
  updateFilter: () => {},
});

export const FilterProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateFilter = (name, value) => {
    console.log(name, value);
    if (!value || !value.length || value === "0") {
      searchParams.delete(name);
    } else {
      if (searchParams.get(name)) {
        searchParams.set(name, value);
      } else {
        searchParams.append(name, value);
      }
    }
    setSearchParams(searchParams);
  };

  return (
    <FilterContext.Provider value={{ searchParams, updateFilter }}>
      {children}
    </FilterContext.Provider>
  );
};

export const useFilterContext = () => useContext(FilterContext);
