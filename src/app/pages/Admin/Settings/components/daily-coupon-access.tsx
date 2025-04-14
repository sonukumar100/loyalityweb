import { Button } from "app/components/ui/button";
import { Input } from "app/components/ui/input";
import { useForm, Controller } from "react-hook-form";

export default function AccessLimitForm() {
    const { control, handleSubmit } = useForm({
        defaultValues: {
            accessLimit: ""
        }
    });

    const onSubmit = (data: any) => {
        console.log("Form Data:", data);
    };

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
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
                Submit
            </Button>
        </form>
    );
}
