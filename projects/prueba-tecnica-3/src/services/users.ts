import { User } from "../types.d";

interface FetchUsersResponse {
    users: User[];
    nextCursor?: number; 
  }

export const fetchUsers = async ({ pageParam = 1 }: { pageParam: number}):Promise<FetchUsersResponse>=>  {
    console.log("pagina:",pageParam);
    const res = await fetch(
      `https://randomuser.me/api?results=10&seed=midudev&page=${pageParam}`
    )
    const data = await res.json()  
    const currrentPage = Number(data.info.page)
    const nextCursor = currrentPage > 3 ? undefined : currrentPage + 1
    return {
      users:data.results,
      nextCursor
    }
  };