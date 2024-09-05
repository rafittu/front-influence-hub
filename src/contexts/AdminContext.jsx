import React, {
  createContext, useContext, useMemo, useState,
} from 'react';
import PropTypes from 'prop-types';

const AdminContext = createContext();

export function AdminProvider({ children }) {
  const [adminData, setAdminData] = useState({});

  const adminContext = useMemo(
    () => ({
      adminData,
      setAdminData,
    }),
    [adminData],
  );

  return (
    <AdminContext.Provider value={adminContext}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  return useContext(AdminContext);
}

AdminProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
