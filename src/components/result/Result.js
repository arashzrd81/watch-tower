import React, { useEffect } from "react";
import { Oval } from "react-loading-icons";
import "./Result.css";


let copiedResults = [];
const filters = ["all", "200", "300", "400", "500"];

const Result = ({
    socket,
    isRunning,
    setIsRunning,
    results,
    setResults,
    currentFilter,
    setCurrentFilter
}) => {

    useEffect(() => {
        socket.on("start", data => {
            setResults([...results, data]);
            copiedResults = [...results, data];
        });
    }, [socket, results, setResults]);


    const handleFilter = filter => {
        setIsRunning(false);
        setCurrentFilter(filter);
        if (filter === "all") {
            setResults(copiedResults);
        } else {
            const filteredResults = copiedResults.filter(result => {
                if (typeof(result) === "string") {
                    return result?.split(" ")[1]?.split("m")[1]?.substring(0, 1) === filter.substring(0, 1);
                } else {
                    return false;
                }
            });
            setResults(filteredResults);
        }

    };

    return (
        <div className="result-container">
            <div className="filter">
                {
                    filters.map((filter, index) =>
                        <button
                            key={index}
                            className={filter === currentFilter ? "active" : undefined}
                            onClick={() => handleFilter(filter)}
                            disabled={
                                copiedResults.find(result =>
                                    typeof(result) === "string"
                                ) === undefined
                            }
                            style={{
                                cursor: copiedResults.find(result =>
                                            typeof(result) === "string"
                                        ) === undefined ?
                                        "not-allowed" : "pointer",
                                opacity: copiedResults.find(result =>
                                            typeof(result) === "string"
                                        ) === undefined ?
                                        0.5 : 1
                            }}
                        >
                            {filter.toUpperCase()}
                        </button>
                    )
                }
            </div>
            <div className="titles">
                <span>DOMAIN</span>
                <span>STATUS CODE</span>
                <span>IP</span>
            </div>
            <div className="results">
                {
                    results.find(result => typeof(result) === "string") !== undefined ?
                    results.map((result, index) =>
                        typeof(result) === "string" &&
                        <div
                            key={index}
                            className="result"
                            style={{
                                color: result?.split(" ")[1]?.split("m")[1]?.substring(0, 1) === "2" ?
                                "#1CA152" : result?.split(" ")[1]?.split("m")[1]?.substring(0, 1) === "3" ?
                                "#EBDE76" : result?.split(" ")[1]?.split("m")[1]?.substring(0, 1) === "4" ?
                                "#E192EF" : "#E965A5"
                            }}
                        >
                            <a
                                href={result.split(" ")[0]}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {result?.split(" ")[0]?.replace("https://", "")}
                            </a>
                            <span>
                                {result?.split(" ")[1]?.split("m")[1]?.substring(0, 3)}
                            </span>
                            <span>
                                {result?.split(" ")[2]?.replace("[", "")?.replace("]", "")}
                            </span>
                        </div>
                    ) : isRunning ?
                    <div className="loading">
                        <Oval width={40} height={40} stroke="#1CA152" />
                    </div> :
                    <span className="no-results">NO RESULT</span>
                }
            </div>
        </div>
    );
};


export default Result;