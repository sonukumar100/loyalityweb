import { AddContacts } from 'app/pages/User/AddContacts';
import React from 'react';
import { useForm } from 'react-hook-form';
import PointsForm from './brand-point-form';
import BrandPointsTable from './brand-points-table';
import { BrandPoints } from './product-point';
import GiftForm from './gift/add-gift';

interface ProductPointsProps {
    points: any;
    description: any;
}

const ProductPoints = () => {


    return (

        <>
            <BrandPoints />

            {/* Points form fixed at bottom right */}
            <div className="fixed bottom-4 right-4 z-50">
                <PointsForm />
                {/* <GiftForm /> */}
            </div>
        </>
    );
};

export default ProductPoints;