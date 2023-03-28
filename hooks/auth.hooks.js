import { useRouter } from 'next/router'
import { useCookies } from 'react-cookie'
import { useApolloClient } from '@apollo/client'
import { AUTH_TOKEN, USER_DATA } from '@/constants/index'

// custom hook to handle authToken
export const useAuthToken = () => {
 const [cookies, setCookie, removeCookie] = useCookies([AUTH_TOKEN, USER_DATA])
 const setAuthToken = (authToken) => setCookie(AUTH_TOKEN, authToken, {path: '/'})
 const setUserData = (user) => setCookie(USER_DATA, user, {path: '/'})
 const removeAuthToken = () => removeCookie(AUTH_TOKEN)
 const removeUserData = () => removeCookie(USER_DATA)

 return {
  authToken: cookies[AUTH_TOKEN],
  userId: cookies[USER_DATA]?._id,
  user: cookies[USER_DATA],
  setAuthToken,
  removeAuthToken,
  setUserData,
  removeUserData,
 }
}

export const useLogout = () => {
 const router = useRouter()
 const {removeAuthToken, removeUserData} = useAuthToken()
 const apolloClient = useApolloClient()

 const logout = async () => {
  await apolloClient.clearStore() // we remove all information in the store
  removeAuthToken()
  removeUserData()
  await router.push('/login')
 }
 return logout
}
