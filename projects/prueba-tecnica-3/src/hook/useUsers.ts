import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUsers } from "../services/users";
import { User } from "../types";

export const useUsers = () => {
    const {
        data,
        isLoading,
        isError,
        refetch,
        fetchNextPage,
        hasNextPage
    
    } = useInfiniteQuery<{nextCursor?:number, users:User[]}>({
        queryKey: ['users'],
        queryFn: fetchUsers,
        getNextPageParam: (lastPage) => lastPage.nextCursor
      })
    return {
        users:data?.pages.flatMap((page) => page.users) || [],
        isLoading,
        isError,
        refetch,
        fetchNextPage,
        hasNextPage
    }  

}