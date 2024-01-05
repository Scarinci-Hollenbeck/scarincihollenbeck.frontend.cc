import { createContext, useEffect, useState } from 'react';
import empty from 'is-empty';
import { getPractices } from 'requests/getPractices';

export const PracticesContext = createContext(null);

export const PracticesContextProvider = ({ children }) => {
  const [practices, setPractices] = useState([]);
  const values = { practices, setPractices };

  useEffect(() => {
    if (empty(practices)) {
      (async () => {
        setPractices(await getPractices());
      })();
    }
  }, []);

  return (
    <PracticesContext.Provider value={values}>
      {children}
    </PracticesContext.Provider>
  );
};