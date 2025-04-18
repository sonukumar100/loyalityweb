import React, { useEffect } from 'react';
import AddVideoForm from './add-video';
import { useAdminSlice } from 'app/pages/Admin/slice';

const Video: React.FC = () => {
    const { useGetVideoLazyQuery } = useAdminSlice();

    const [getVideo, { data, isLoading, isSuccess, error }] = useGetVideoLazyQuery();
    useEffect(() => {
        getVideo("");
    }
        , []);
    console.log("Video Data", data);
    return (
        <>
            <div className="flex flex-wrap w-[100px]   justify-center">
                {data?.map((item: any, index: number) => (
                    <div
                        key={index}
                        className="w-full"
                    >
                        <iframe
                            width="100%"
                            height="100%"
                            src={item.url}
                            title={`YouTube video player ${index}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="rounded-lg shadow-md"
                        ></iframe>
                    </div>
                ))}
            </div>

            <AddVideoForm />
        </>
    );
};

export default Video;