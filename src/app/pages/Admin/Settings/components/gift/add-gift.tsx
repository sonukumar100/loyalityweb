import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { Button } from "app/components/ui/button";

export default function GiftForm() {
    const [imagePreview, setImagePreview] = useState(null);

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        defaultValues: {
            giftTitle: "",
            points: 0,
            giftType: "",
            image: null,
        },
    });

    const onSubmit = (data) => {
        console.log("Form Data:", data);
        // Handle form submission (e.g., API call)
        reset();
        setImagePreview(null);
    };

    const handleImageChange = (e, onChange) => {
        const file = e.target.files[0];
        onChange(file);
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
            <div className="bg-white shadow-xl rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
                    Add a New Gift 🎁
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Gift Title */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Gift Title
                        </label>
                        <Controller
                            name="giftTitle"
                            control={control}
                            rules={{ required: "Gift Title is required" }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="text"
                                    className={`mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.giftTitle ? "border-red-500" : "border-gray-300"
                                        }`}
                                    placeholder="Enter gift title"
                                />
                            )}
                        />
                        {errors.giftTitle && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.giftTitle.message}
                            </p>
                        )}
                    </div>

                    {/* Points */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Points
                        </label>
                        <Controller
                            name="points"
                            control={control}
                            rules={{
                                required: "Points are required",
                                validate: (value) =>
                                    value > 0 || "Points must be greater than 0",
                            }}
                            render={({ field }) => (
                                <input
                                    {...field}
                                    type="number"
                                    onChange={(e) => field.onChange(parseInt(e.target.value))}
                                    className={`mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.points ? "border-red-500" : "border-gray-300"
                                        }`}
                                    placeholder="Enter points"
                                />
                            )}
                        />
                        {errors.points && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.points.message}
                            </p>
                        )}
                    </div>

                    {/* Gift Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Gift Type
                        </label>
                        <Controller
                            name="giftType"
                            control={control}
                            rules={{ required: "Gift Type is required" }}
                            render={({ field }) => (
                                <select
                                    {...field}
                                    className={`mt-1 block w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${errors.giftType ? "border-red-500" : "border-gray-300"
                                        }`}
                                >
                                    <option value="">Select gift type</option>
                                    <option value="physical">Physical</option>
                                    <option value="digital">Digital</option>
                                    <option value="voucher">Voucher</option>
                                </select>
                            )}
                        />
                        {errors.giftType && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.giftType.message}
                            </p>
                        )}
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Upload Image
                        </label>
                        <Controller
                            name="image"
                            control={control}
                            render={({ field: { onChange } }) => (
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e, onChange)}
                                    className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                                />
                            )}
                        />
                        {imagePreview && (
                            <div className="mt-4">
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    className="w-32 h-32 object-cover rounded-lg shadow-md"
                                />
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <Button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 font-semibold"
                    >
                        Add Gift
                    </Button>
                </form>
            </div>
        </div>
    );
}