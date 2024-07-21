import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {addIncome} from "../services/apiFinance.js";


export function useCreateIncome() {
    const queryClient = useQueryClient();

    const {mutate: createIncome, isPending: isCreating} = useMutation({
        mutationFn: addIncome,
        onSuccess: () => {
            toast.success("New income successfully created");
            queryClient.invalidateQueries({
                queryKey: ['income'],
            });
        },
        onError: (err) => toast.error(err.message)
    });

    return {isCreating, createIncome}
}
