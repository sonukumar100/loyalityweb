import React, { memo, useEffect } from 'react';
import { Form } from 'app/components/ui/form';
import { Controller, useForm } from 'react-hook-form';
import { ChevronLeft, Plus } from 'lucide-react';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from 'app/components/ui/sheet';
// import { useAdminSlice } from '../../slice';
// import { selectAdminEdit } from '../../slice/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'app/components/ui/use-toast';
import { Input } from 'app/components/ui/input';
import { Button } from 'app/components/ui/button';
import { Label } from 'app/components/ui/label';
import { Textarea } from 'app/components/ui/textarea';
import { useAdminSlice } from 'app/pages/Admin/slice';

interface FormData {
    url: string;
    description: string;
}

export default function AddVideoForm() {
    const { control, handleSubmit, formState: { errors } } = useForm<FormData>({
        defaultValues: {
            url: "",
            description: "",
        },
    });
    const { useAddVideoMutation } = useAdminSlice();
    const [addVideo, { isLoading, isSuccess, error }] = useAddVideoMutation();
    const onSubmit = (data: FormData) => {
        addVideo(data);
        console.log("Form Data:", data);
    };
    const [open, setOpen] = React.useState(false);

    return (
        <Sheet aria-describedby={false} open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
                <Button
                    variant="blueBtn"
                    className="font-poppins font-base font-normal rounded-full text-base py-5 px-8  hover:to-blue-700 absolute -bottom-[0px] right-[30px]"
                >
                    Add{' '}
                    <span className="ml-2">
                        {' '}
                        <Plus className="w-7" />
                    </span>
                </Button>
            </SheetTrigger>

            <SheetContent
                className="w-[350px]" onInteractOutside={e => e.preventDefault()}
            >

                <SheetHeader>
                    <SheetTitle>
                        <SheetClose asChild>
                            <div onClick={() => { setOpen(false) }} className="flex items-center mb-8 mt-4  cursor-pointer">
                                <div>
                                    {' '}
                                    <span>
                                        <figcaption className="flex justify-center items-center bg-white  border w-20 h-20 rounded-full text-center">
                                            <ChevronLeft />
                                        </figcaption>
                                    </span>{' '}
                                </div>
                                <div className="text-md font-poppins text-[#101828] ml-6 font-medium leading-0" >
                                    {' '}
                                    Back
                                </div>
                            </div>
                        </SheetClose>
                    </SheetTitle>
                </SheetHeader>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)} className=" mx-auto space-y-4 p-4 ">

                        {/* URL Input */}
                        <Controller
                            name="url"
                            control={control}
                            rules={{
                                required: "URL is required",
                                pattern: {
                                    value: /^https?:\/\/[^\s/$.?#].[^\s]*$/,
                                    message: "Please enter a valid URL",
                                },
                            }}
                            render={({ field }) => (
                                <div>
                                    <Label htmlFor="url" className="block text-sm font-medium text-gray-600 mb-1">URL</Label>
                                    <Input
                                        {...field}
                                        id="url"
                                        placeholder="Enter a URL"
                                        className="w-full px-3 py-2 rounded-lg border text-sm focus:ring-2"
                                    />
                                    {errors.url && (
                                        <p className="text-red-500 text-xs mt-1">{errors.url.message}</p>
                                    )}
                                </div>
                            )}
                        />

                        {/* Description Input */}
                        <Controller
                            name="description"
                            control={control}
                            rules={{
                                required: "Description is required",
                                minLength: {
                                    value: 10,
                                    message: "Description must be at least 10 characters",
                                },
                            }}
                            render={({ field }) => (
                                <div>
                                    <Label htmlFor="description" className="block text-sm font-medium text-gray-600 mb-1">Description</Label>
                                    <Textarea
                                        {...field}
                                        id="description"
                                        placeholder="Enter a brief description"
                                        className="w-full px-3 py-2 rounded-lg border text-sm focus:ring-2"
                                    />
                                    {errors.description && (
                                        <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
                                    )}
                                </div>
                            )}
                        />

                        {/* Submit Button */}
                        <Button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                            Submit
                        </Button>
                    </form>
                </div>
                {/* </span> */}
            </SheetContent>
        </Sheet>

    );
}
