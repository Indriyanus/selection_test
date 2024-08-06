"use client";

import { useEffect, useState } from "react";
import { useFormik } from "formik";
import { paragraphSchema } from "@/app/features/paragraph";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BiError } from "react-icons/bi";
import { MdOutlineTextFields } from "react-icons/md";

const Paragraph: React.FC = () => {
    const [text, setText] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [comparedText, setComparedText] = useState<JSX.Element[] | null>(null);
    const [differenceCount, setDifferenceCount] = useState<number | null>(null);

    const fetchData = async () => {
        try {
            const response = await fetch("https://pwd-selectiontest-api.vercel.app/alphabets/paragraph");
            const result = await response.json();
            if (result.data && result.data.paragraph) {
                setText(result.data.paragraph.text);
            }
            setLoading(false);
        } catch (error) {
            setError("Failed to fetch data");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const compareTexts = (input: string, original: string): JSX.Element[] => {
        const maxLength = Math.max(input.length, original.length);
        const result = [];
        let diffCount = 0;

        for (let i = 0; i < maxLength; i++) {
            if (input[i] !== original[i]) {
                diffCount++;
                result.push(
                    <span className="text-red-500 animate-pulse" key={i}>
                        {original[i] ? original[i] : '_'}
                    </span>
                );
            } else {
                result.push(
                    <span className="text-green-500 animate-bounce" key={i}>
                        {original[i]}
                    </span>
                );
            }
        }

        setDifferenceCount(diffCount);
        return result;
    };

    const formik = useFormik({
        initialValues: {
            paragraph: "",
        },
        validationSchema: paragraphSchema,
        onSubmit: (values) => {
            if (values.paragraph === text) {
                toast.success("Input is the same and successful");
            } else {
                toast.error("Input does not match");
            }
            if (text) {
                setComparedText(compareTexts(values.paragraph, text));
            }
        },
    });

    return (
        <>
            <section className="flex flex-col items-center py-10 px-10 min-h-screen bg-[#d4b185]">
                <div className="bg-white shadow-md rounded p-6 mb-6 w-full max-w-3xl border-2 border-gray-300 transition-transform duration-500 ease-in-out ">
                    <h2 className="text-xl font-bold mb-4">How to Play</h2>
                    <ol className="list-decimal list-inside space-y-2">
                        <li>Re-enter the paragraph that appears in the box above.</li>
                        <li>Press the refresh button if you want to change the paragraph text.</li>
                        <li>Enter the exact same text and press submit; a success notification will appear.</li>
                        <li>If the input text is not the same, even by one character, an error notification will appear with the status "Input does not match".</li>
                    </ol>
                </div>
                <div className="w-full max-w-3xl py-5">
                    <div className="bg-white shadow-md rounded p-6 border-2 border-gray-300 transition-transform duration-500 ease-in-out hover:translate-y-1 hover:scale-105">
                        {loading ? (
                            <p className="text-center text-gray-500 flex items-center justify-center">
                                <AiOutlineLoading3Quarters className="mr-2 animate-spin" /> Loading...
                            </p>
                        ) : error ? (
                            <p className="text-center text-red-500 flex items-center justify-center">
                                <BiError className="mr-2" /> {error}
                            </p>
                        ) : (
                            <p className="whitespace-pre-wrap">{comparedText ? comparedText : text}</p>
                        )}
                    </div>
                    <div className="flex flex-col items-center mt-4">
                        <p className="text-black flex items-center">
                            <MdOutlineTextFields className="mr-2 animate-bounce" /> Please retype the sentence above.
                        </p>
                        <button
                            onClick={() => {
                                setLoading(true);
                                fetchData();
                            }}
                            className="mt-4 px-4 py-2 bg-blue-400 text-white rounded-lg transition-transform duration-300 transform hover:bg-blue-500 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Refresh Paragraph
                        </button>
                    </div>
                </div>
                <div className="mt-6 w-full max-w-3xl">
                    <form onSubmit={formik.handleSubmit} className="flex flex-col items-center">
                        <textarea
                            id="paragraph"
                            name="paragraph"
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                            rows={5}
                            placeholder="Start typing here..."
                            value={formik.values.paragraph}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.paragraph && formik.errors.paragraph ? (
                            <div className="text-red-500 mt-2 italic">{formik.errors.paragraph}</div>
                        ) : null}
                        <button
                            type="submit"
                            className="mt-4 px-6 py-3 bg-blue-400 text-white rounded-lg transition-transform duration-300 transform hover:bg-blue-500 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                            Submit
                        </button>
                    </form>
                    {differenceCount !== null && (
                        <div className="mt-4 text-red-500">
                            Number of different characters: {differenceCount}
                        </div>
                    )}
                </div>
            </section>
            <ToastContainer />
        </>
    );
};

export default Paragraph;
