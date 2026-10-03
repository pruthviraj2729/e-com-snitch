import { useState, useEffect } from 'react'
import { MyStore } from './MyStore'
import axiosInstance from '../config/axios.jsx'



export const MyStoreProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')
  const [accessToken, setAccessToken] = useState('')
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

   useEffect(() => {
            const restoreSession = async () => {
                try {
                    const refreshResponse = await axiosInstance.post("/api/auth/refresh-token", {},
                        {
                            withCredentials: true
                        }
                    );
                    const token = refreshResponse.data.accessToken;
                    setAccessToken(token);

                    const res = await axios.get("/api/auth/me", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        withCredentials: true 
                    });

                    setUser(res.data.data.user);

                } catch {
                    console.log("User not logged in")
                    setAccessToken(null);
                    setUser(null);
                } finally {
                    setIsLoading(false);
                }
            };
            restoreSession()
        },[])

  return (
    <MyStore.Provider
      value={{
        theme,
        setTheme,
        accessToken,
        setAccessToken,
        user,
        setUser,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </MyStore.Provider>
  )
}


