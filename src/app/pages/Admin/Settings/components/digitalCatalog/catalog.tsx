import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "app/components/ui/card"
import { Button } from "app/components/ui/button"
import { useAdminSlice } from 'app/pages/Admin/slice';
import { use } from 'i18next';
import { AddCatalogForm } from './add-catalog';
import { EyeIcon, FileImage, FileText, File } from "lucide-react";
import { format } from "date-fns";

const DigitalCatalog: React.FC = () => {
    const { useGetCatalogLazyQuery, useOfferListLazyQuery } = useAdminSlice();
    // const [catalogItems, setCatalogItems] = React.useState<any[]>([]);
    const [getCatalog, { data, isLoading, isSuccess, error }] = useGetCatalogLazyQuery();
    const [getOfferList, { data: offerData }] = useOfferListLazyQuery();
    React.useEffect(() => {
        getCatalog("");
        getOfferList("");
    }, [])

    React.useEffect(() => {
        // if (error) {
        //     console.error("Error fetching catalog:", error);
        // } else if (isSuccess) {
        //     setCatalogItems(data)
        //     console.log("Catalog data fetched successfully:", data);
        // }
    }
        , [error, isSuccess]);
    const catalogItems = data

    console.log("Catalog items:", catalogItems);
    const getFileIcon = (fileName: string) => {
        const ext = fileName?.split('.').pop()?.toLowerCase();
        switch (ext) {
            case 'pdf':
                return <FileText className="text-red-500 w-10 h-10" />;
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'webp':
                return <FileImage className="text-blue-500 w-10 h-10" />;
            default:
                return <File className="text-gray-500 w-10 h-10" />;
        }
    };
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
                {catalogItems?.[0]?.map((item) => (
                    <Card
                        key={item.id}
                        className="rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.01] border border-gray-200"
                    >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <div className="flex items-center space-x-3">
                                {getFileIcon(item.fileName)}
                                <CardTitle className="text-base font-medium line-clamp-1">{item.fileName}</CardTitle>
                            </div>
                        </CardHeader>

                        <CardContent className="flex items-center justify-between pt-2">
                            <span className="text-sm text-muted-foreground">
                                {item.createdAt ? format(new Date(item.createdAt), "dd MMM yyyy") : '—'}
                            </span>
                            <a href={item.url} target="_blank" rel="noopener noreferrer">
                                <Button size="sm" variant="outline">
                                    <EyeIcon className="w-4 h-4 mr-2" /> View
                                </Button>
                            </a>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <div className="fixed bottom-4 right-4 z-50">

                <AddCatalogForm />
            </div>
        </>

    );
};

export default DigitalCatalog;