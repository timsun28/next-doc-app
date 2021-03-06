import type { NextPage } from "next";
import Head from "next/head";
import { useMemo, useState } from "react";
import styles from "../styles/Home.module.css";

import trailsData from "../data/doc_tracks.json";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/dist/styles/ag-theme-alpine.css"; // Optional theme CSS

interface DOCTrail {
    assetId: string;
    name: string;
    introduction: string;
    introductionThumbnail: string;
    permittedActivities: string[];
    distance: number | null;
    walkDuration: string;
    walkDurationCategory: string[];
    walkTrackCategory: string[];
    wheelchairsAndBuggies: boolean | null;
    mtbDuration: string | null;
    mtbDurationCategory: string[];
    mtbTrackCategory: string[];
    kayakingDuration: string | null;
    dogsAllowed: string;
    locationString: string;
    locationArray: string[];
    region: string[];
    staticLink: string;
    lon: number;
    lat: number;
}

const Home: NextPage = () => {
    const [selectedTrail, setSelectedTrail] = useState<DOCTrail>();
    const [columnDefs] = useState([
        {
            field: "name",
            filter: true,
        },
        {
            field: "region",
            filter: true,
        },
        { field: "locationString", filter: true },
        { field: "walkDuration", filter: true },
    ]);

    const [rowData] = useState<DOCTrail[]>(trailsData as DOCTrail[]);

    const defaultColDef = useMemo(() => {
        return {
            floatingFilter: true,
        };
    }, []);

    return (
        <div>
            <Head>
                <title>DOC Trails</title>
                <meta name="description" content="Easy to use DOC Walking Track Overview" />{" "}
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />{" "}
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />{" "}
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />{" "}
                <link rel="manifest" href="/site.webmanifest" />{" "}
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />{" "}
                <meta name="msapplication-TileColor" content="#da532c" /> <meta name="theme-color" content="#ffffff" />
            </Head>

            <main className="relative flex flex-col gap-4 p-4 md:h-screen md:flex-row">
                <div className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow-md md:w-1/2 md:my-0 md:max-w-lg">
                    {!selectedTrail ? (
                        <h5>Select a trail for more details</h5>
                    ) : (
                        <>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                                {selectedTrail.name}
                            </h5>
                            <ul>
                                <li>
                                    <span className="font-bold">Region:</span> {selectedTrail.region}
                                </li>
                                <li>
                                    <span className="font-bold">Location:</span> {selectedTrail.locationString}
                                </li>
                                <li>
                                    <span className="font-bold">Walk Duration:</span> {selectedTrail.walkDuration}
                                </li>
                                <li>
                                    <span className="font-bold">Difficulty:</span>{" "}
                                    {selectedTrail.walkTrackCategory.join(", ")}
                                </li>
                                <li>
                                    <span className="font-bold">Distance:</span> {selectedTrail.distance ?? "Unknown"}
                                </li>
                                <li>
                                    <a
                                        className="font-bold text-blue-600"
                                        href={
                                            "https://www.google.com/maps/search/?api=1&query=" +
                                            selectedTrail.lat +
                                            "," +
                                            selectedTrail.lon
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Find on Google Maps
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="font-bold text-blue-600"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={selectedTrail.staticLink}
                                    >
                                        DOC Site
                                    </a>
                                </li>
                            </ul>
                            <p className="font-normal text-gray-700">{selectedTrail.introduction}</p>
                        </>
                    )}
                </div>

                <div className="w-full h-screen ag-theme-alpine md:h-full">
                    <AgGridReact
                        rowData={rowData}
                        columnDefs={columnDefs}
                        pagination={true}
                        paginationPageSize={15}
                        defaultColDef={defaultColDef}
                        onRowClicked={(event) => {
                            setSelectedTrail(event.data);
                        }}
                    ></AgGridReact>
                </div>
            </main>
        </div>
    );
};

export default Home;
