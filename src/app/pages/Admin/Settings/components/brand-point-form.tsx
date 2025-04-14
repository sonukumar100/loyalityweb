import React, { memo, useEffect } from 'react';
import { Form } from 'app/components/ui/form';
import { useForm } from 'react-hook-form';
import { ChevronLeft, Plus } from 'lucide-react';
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from 'app/components/ui/sheet';
import { useAdminSlice } from '../../slice';
import { selectAdminEdit } from '../../slice/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'app/components/ui/use-toast';
import { Input } from 'app/components/ui/input';
import { Button } from 'app/components/ui/button';
import { Label } from 'app/components/ui/label';

export default function PointsForm() {
    const [open, setOpen] = React.useState(false);
    const pointsEditData = useSelector(selectAdminEdit)
    // const { useAddPointMutation } = useAdminSlice();
    const {
        useAddBrandPointsMutation,
    } = useAdminSlice();
    const [addPoint, { isLoading, isSuccess, error }] = useAddBrandPointsMutation();

    // const [addPoint, { data, error, loading }] = useAddPointMutation();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        let payload = {
            productName: data.brandName,
            karigerPoints: parseInt(data.karigarPoints),
            dealerPoints: parseInt(data.dealerPoints),
            id: null,
        }
        if (pointsEditData) {
            payload.id = pointsEditData.id;
        }
        addPoint(payload);
        console.log('Form Data:', data);
    };
    useEffect(() => {
        if (error) {

        } else if (isSuccess) {
            toast({
                title: 'Brand Point',
                description: 'Brand Point add successfully',
                duration: 2000,
                variant: 'success',
            });
            dispatch(addTeamMember.setEdit({ data: null }));
            setOpen(false);

        }
    }, [error, isSuccess]);
    useEffect(() => {
        if (pointsEditData) {
            reset({ brandName: pointsEditData.productName, karigarPoints: pointsEditData.karigerPoints, dealerPoints: pointsEditData.dealerPoints, id: pointsEditData.id }); // Patches data to the form
            setOpen(true);

        }
    }, [pointsEditData]);
    const dispatch = useDispatch();
    const { actions: addTeamMember } = useAdminSlice();
    console.log('pointsEditData', pointsEditData);




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
            // className={`${editSelector ||
            //     agentEditSelector ||
            //     builderEditSelector ||
            //     recruitEditSelector
            //     ? 'invisible'
            //     : 'bg-[#ffffff82]'
            //     } backdrop-blur-[2.5rem]`}
            >
                {/* <span
                    className={
                        editSelector ||
                            agentEditSelector ||
                            builderEditSelector ||
                            recruitEditSelector
                            ? 'invisible'
                            : 'visible'
                    }
                > */}
                <SheetHeader>
                    <SheetTitle>
                        <SheetClose asChild>
                            <div onClick={() => { setOpen(false); dispatch(addTeamMember.setEdit({ data: null })) }} className="flex items-center mb-8 mt-4  cursor-pointer">
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
                <div className=" mx-auto mt-10 p-6 bg-white shadow-2xl rounded-2xl">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Points Entry</h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Brand Name */}
                        <div>
                            <Label className="block text-gray-700 font-medium mb-1">Brand Name</Label>
                            <Input
                                type="text"
                                {...register('brandName', { required: 'Brand Name is required' })}
                                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.brandName && <p className="text-red-500 text-sm mt-1">{errors.brandName.message}</p>}
                        </div>

                        {/* Karigar Points */}
                        <div>
                            <Label className="block text-gray-700 font-medium mb-1">Karigar Points</Label>
                            <Input
                                type="number"
                                {...register('karigarPoints', { required: 'Karigar Points are required' })}
                                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.karigarPoints && <p className="text-red-500 text-sm mt-1">{errors.karigarPoints.message}</p>}
                        </div>

                        {/* Dealer Points */}
                        <div>
                            <Label className="block text-gray-700 font-medium mb-1">Dealer Points</Label>
                            <Input
                                type="number"
                                {...register('dealerPoints', { required: 'Dealer Points are required' })}
                                className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            {errors.dealerPoints && <p className="text-red-500 text-sm mt-1">{errors.dealerPoints.message}</p>}
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            className="w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
                        >
                            Submit
                        </Button>
                    </form>
                </div>
                {/* </span> */}
            </SheetContent>
        </Sheet>

    );
}
