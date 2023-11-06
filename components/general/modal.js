"use client"

import { useRef, useEffect, useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
 
export default function Dialog({props, children}) {
    const dialogRef = useRef(null);
    const [startDate, setStartDate] = useState(new Date());
    const [description, setDescription] = useState("");
    const [careers, setCareers] = useState([]);
    const [career, setCareer] = useState("");
    const [sexes, setSexes] = useState([]);
    const [sex, setSex] = useState("");
    const [myArray, setMyArray] = useState( Array(props.rows-1).fill(0));


    const handleUpdate = (index, value) => {
        const newArray = myArray;
        newArray[index] = parseInt(value);
        setMyArray(newArray);
        //console.log(myArray)
    };


    useEffect(() => {
        if (props.showDialog === true) {
            dialogRef.current?.showModal()
        } else {
            dialogRef.current?.close()
        }
        if(props.type == "form"){
            fetch('/api/database/careers').then((response) => response.json()).then((data) => setCareers(data));
            fetch('/api/database/sexes').then((response) => response.json()).then((data) => setSexes(data));
        }
    }, [props.showDialog])

    const closeDialog = () => {
        dialogRef.current?.close()
        props.onClose()
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(props.type == "form"){
            try {
                const res = await fetch("/api/database/students", {
                method: "POST",
                body: JSON.stringify({
                description:description,
                date_of_birth:startDate,
                sex_id:sex,
                career_id:career,
                user_id:props.user,
                }),
                headers: {
                "Content-Type": "application/json",
                },
            });
            if (res.ok) {
                props.onOk()
                closeDialog()
            }
            } catch (error) {
            console.error(error);
            }
        }
        if(props.type == "questions"){
            try {
                const url = props.title == "GAD-7" ? "/api/database/anxiety-levels" : "/api/database/stress-levels";
                const result = myArray.reduce((accumulator, currentValue) => accumulator + currentValue,0,);

                const res = await fetch(url, {
                method: "POST",
                body: JSON.stringify({
                result:result,
                user_id:props.user,
                }),
                headers: {
                "Content-Type": "application/json",
                },
            });
            if (res.ok) {
                props.onOk()
                closeDialog()
            }
            } catch (error) {
            console.error(error);
            }
        }
    };
    

    const dialog = props.showDialog === true
        ? (
            <dialog ref={dialogRef} className="fixed top-50 left-50 -translate-x-50 -translate-y-50 z-10  rounded-xl backdrop:bg-gray-800/50">
                <div className={`w-[${props.width}] max-w-fullbg-gray-200 flex flex-col`}>
                    <div className="flex flex-row justify-between mb-4 pt-2 px-5 bg-indigo-600">
                        <h1 className="group relative w-full flex justify-center py-2 px-4 text-xs font-medium text-white">{props.title}</h1>
                        {props.type == "questions" &&<button
                            onClick={closeDialog}
                            className="mb-2 py-1 px-2 cursor-pointer rounded border-none w-8 h-8 font-bold bg-red-600 text-white"
                        >x</button>}
                    </div>

                    {props.type == "questions" &&<form className="mt-8 space-y-6 text-xs" onSubmit={handleSubmit}>
                        <div className={`grid grid-cols-${children[0].values.length} grid-rows-${children.length} gap-2 px-2 py-2 text-xs`}>
                          {children.map((item1,index1) =>(
                                item1.values.map((item2,index2) =>(
                                    <div>
                                        {(index1 == 0 || index2==0) ?  <div className="flex justify-center items-center">{item2}</div>:
                                        <div className=" flex justify-center items-center">
                                            <input required type="radio" name={index1} value={item2} className='w-2 h-2' 
                                            onChange={(e) => handleUpdate(index1-1, e.target.value)}/>
                                        </div>}
                                    </div>
                                ))
                            ))}
                        </div>
                        <div className='flex justify-center items-center py-4'>
                            <button type="submit"
                            className=" w-1/5  py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Enviar
                            </button>
                        </div>
                    </form>
                        
                    }

                    
                    {props.type == "form" && <div className="px-5 pb-6">
                        <form className="mt-8 space-y-6 text-xs" onSubmit={handleSubmit}>
                            <input type="hidden" name="remember" defaultValue="true" />
                            <div className="rounded-md shadow-sm space-y-4">
                                <div>
                                    <label htmlFor="description" > Description:   </label>
                                    <textarea id="description" name="description" autoComplete="description" rows="4" cols="50" required value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 placeholder:text-xs text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 "
                                    placeholder="Description"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="date" > Date of Birth:   </label>
                                    <DatePicker id="date" name ="date" required selected={startDate} onChange={(date) => setStartDate(date)} 
                                    className=" rounded-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="sex" > Sex:   </label>
                                    <select id ="sex" required
                                    name="sex" value={sex} onChange={(e)=> setSex(e.target.value)}
                                    className=" rounded-none relative block w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10">
                                        <option value={""} disabled >Seleccion tu sexo</option>
                                        {sexes.map((item) => (
                                        <option key={item.id} value={item.id}>
                                            {item.name}
                                        </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label htmlFor="career" > Career:   </label>
                                    <select id ="career" required
                                    name="career" value={career} onChange={(e)=> setCareer(e.target.value)}
                                    className=" w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 ">
                                        <option value={""} disabled >Seleccion tu carrera</option>
                                        {careers.map((item) => (
                                        <option key={item.id} value={item.id} >
                                            {item.name}
                                        </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            
                            <div>
                                <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                    <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"
                                    >
                                        <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-2a6 6 0 100-12 6 6 0 000 12zm-1-5a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1zm0-3a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z"
                                        clipRule="evenodd"
                                        />
                                    </svg>
                                </span>
                                    Enviar
                                </button>
                            </div>
                        </form>
                    </div>}
                </div>
            </dialog>
        ) : null


    return dialog
}