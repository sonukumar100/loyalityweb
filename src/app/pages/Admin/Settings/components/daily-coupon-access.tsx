import { Button } from "app/components/ui/button";
import { Icons } from "app/components/ui/icons";
import { Input } from "app/components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { useAdminSlice } from "../../slice";
import { useEffect } from "react";
import { toast } from "app/components/ui/use-toast";

export default function AccessLimitForm() {
    const { control, handleSubmit, reset, setValue } = useForm({
        defaultValues: {
            accessLimit: ""
        }
    });
    const { useUpdateDailyLimitMutation, useGetDailyAccessLimitLazyQuery } = useAdminSlice()
    const [updateDailyLimit, { isLoading }] = useUpdateDailyLimitMutation();
    const [getDailyAccessLimit, { data, isLoading: isLoadingData }] = useGetDailyAccessLimitLazyQuery();

    const onSubmit = (data: any) => {
        updateDailyLimit(data).unwrap().then((response) => {
            toast({
                title: "Success",
                description: "Access limit updated successfully",
                variant: "sucsess",
                duration: 3000,
            })
            console.log("Success:", response);
            // Handle success, e.g., show a success message
        })
            .catch((error) => {
                toast({
                    title: "Success",
                    description: "error updating access limit",
                    variant: "destructive",
                    duration: 3000,
                })
                console.error("Error:", error);
                // Handle error, e.g., show an error message
            });
        console.log("Form Data:", data);
    };
    useEffect(() => {
        getDailyAccessLimit({}).unwrap().then((response) => {
            console.log("response", response);
            reset({ accessLimit: response?.response?.[0]?.accessLimit });
        })
            .catch((error) => {
                console.error("Error fetching daily access limit:", error);
            });
    }, [getDailyAccessLimit]);


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="w-1/2 float-left mx-auto space-y-4 p-4 ">
            <h2 className="text-xl font-semibold text-gray-700">Set Access Limit</h2>

            <Controller
                name="accessLimit"
                control={control}
                rules={{
                    required: "Access limit is required",
                    min: { value: 1, message: "Must be at least 1" },
                    max: { value: 10000, message: "Too high!" }
                }}
                render={({ field, fieldState: { error } }) => (
                    <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Access Limit</label>
                        <Input
                            {...field}
                            type="text"
                            placeholder="Enter access limit"
                            className={`w-full px-3 py-2 rounded-lg border text-sm outline-none focus:ring-2 ${error
                                ? "border-red-500 focus:ring-red-300"
                                : "border-gray-300 focus:ring-blue-300"
                                }`}
                        />
                        {error && (
                            <p className="text-red-500 text-xs mt-1">{error.message}</p>
                        )}
                    </div>
                )}
            />

            <Button
                variant="destructive"
                type="submit"
                disabled={isLoading}
                className="w-full text-white py-3 text-lg rounded-xl   text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300"
            >
                {isLoading && (
                    <Icons.Spinner className="mr-2 h-4 w-4 animate-spin" />
                )}
                Save
            </Button>
        </form>
    );
}
