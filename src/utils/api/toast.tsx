import { Toaster } from 'app/components/ui/toaster';

export const showToast = (description) => {
    Toaster.create({
        description,
    });
};