// UserProvider.jsx
import axios from "axios";
import React, { createContext, useContext, useMemo, useState } from "react";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userRankings, setUserRankings] = useState([]);
  const [userTopRankings, setUserTopRankings] = useState(null);
  const [userRankingsCount, setUserRankingsCount] = useState(null);
  const [userLatestRankings, setUserLastetRankings] = useState(null);
  const userToken = useMemo(() => {
    return localStorage.getItem("token");
  }, [localStorage.getItem("token")]);

  function authentification() {
    axios
      .get(`/me/$`)
      .then((res) => {
        setUser(res.data.user);
        setUserRankings(res.data.rankings);
        setUserTopRankings(res.data.topRankings);
        setUserLastetRankings(res.data.latestRankings);
        setUserRankingsCount(res.data.totalRankingsCount);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <UserContext.Provider
      value={{
        userLatestRankings,
        userRankingsCount,
        userTopRankings,
        userRankings,
        user,
        userToken,
        setUser,
        authentification,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
