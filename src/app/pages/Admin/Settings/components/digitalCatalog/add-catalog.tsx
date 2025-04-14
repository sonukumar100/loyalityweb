import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "app/components/ui/alert-dialog";
import { Button } from "app/components/ui/button";
import { Input } from "app/components/ui/input";
import { useAdminSlice } from "app/pages/Admin/slice";
import { UploadCloud } from "lucide-react";
import { toast } from "app/components/ui/use-toast";

interface FormData {
    file: File | null;
}

export function AddCatalogForm() {
    const { handleSubmit, control, reset } = useForm<FormData>({
        defaultValues: { file: null },
    });

    const { useAddCatalogMutation } = useAdminSlice();
    const [addCatalog, { isLoading, isSuccess }] = useAddCatalogMutation();
    const [isDialogOpen, setIsDialogOpen] = useState(false); // Dialog visibility state

    const onSubmit = (data: FormData) => {
        if (data.file) {
            const formData = new FormData();
            formData.append("cataLogFile", data.file);
            addCatalog(formData);
            reset(); // reset after submission
        }
    };

    // Close dialog on successful file upload
    React.useEffect(() => {
        if (isSuccess) {
            toast({
                title: "Success",
                description: "Catalog file uploaded successfully.",
                duration: 2000,
            });
            setIsDialogOpen(false); // Close dialog on success
        }
    }, [isSuccess]);

    return (
        <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <AlertDialogTrigger asChild>
                <Button className="mt-6 rounded-full px-6 py-2 text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 p-[11px_15px]">
                    <UploadCloud className="mr-2 w-4 h-4" />
                    Upload Catalog
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-base font-medium mb-1 ">
                        Upload a Catalog File
                    </AlertDialogTitle>
                </AlertDialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4 mt-4"
                >
                    <Controller
                        name="file"
                        control={control}
                        render={({ field }) => (
                            <Input
                                type="file"
                                accept=".pdf,image/*"
                                className="border border-gray-300 rounded-md p-2"
                                onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    field.onChange(file);
                                }}
                            />
                        )}
                    />

                    <div className="flex gap-3 justify-end mt-2">
                        <AlertDialogCancel asChild>
                            <Button
                                type="button"
                                variant="outline"
                                className="rounded-full px-4 py-2 text-sm text-gray-700 border-gray-300 hover:bg-gray-100 transition-all duration-200"
                            >
                                Cancel
                            </Button>
                        </AlertDialogCancel>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="rounded-full px-5 py-2 text-sm text-white bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 shadow-md disabled:opacity-60"
                        >
                            {isLoading ? "Uploading..." : "Submit"}
                        </Button>
                    </div>
                </form>
            </AlertDialogContent>
        </AlertDialog>
    );
}
