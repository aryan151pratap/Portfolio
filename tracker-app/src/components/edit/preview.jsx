import { clsx } from "clsx";
import { useState } from "react";
function Preview({ preview_data, code, image }){

    const [show_img, setShow_img] = useState('');
    const [show_code, setShow_code] = useState(null);

    const classNames = (el) => {
        return clsx(
          `text-${el.style}-${el.style_range}/${el.style_opacity}`,
          `bg-${el.bgColor}-${el.bg_range}/${el.bg_opacity}`,
          `px-${el.padding_x}`,
          `py-${el.padding_y}`,
          `text-[${el.size}px]`,
          `w-${el.width}`,
          `font-[${el.bold}]`,
          {
            'rounded-none': el.borderRadius === 'none',
            'rounded-sm': el.borderRadius === 'sm',
            'rounded-md': el.borderRadius === 'md',
            'rounded-lg': el.borderRadius === 'lg',
            'rounded-xl': el.borderRadius === 'xl',
            'rounded-full': el.borderRadius === 'full',
          }
        );
      };
      
    return(
        <>
        <div className="w-full flex flex-col p-2 sm:p-4 md:p-4">
            {preview_data.length !== 0 &&
            <div>
                {code ? 
                <div className="w-full flex flex-col gap-2">
                    {preview_data.map((i, index) => (
                        <div className="" key={index}>
                            {i.type === 'code' &&
                            <div className="relative md:px-4">
                                <div className="absolute text-white sm:text-white/50 md:text-white/50 hover:text-white inset-0 left-auto w-fit h-fit md:px-4 p-1"
                                    onClick={() => setShow_code(i)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className=" h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4" />
                                    </svg>
                                </div>
                                <p className={clsx(
                                    classNames(i), 
                                    "font-mono whitespace-pre-wrap rounded-lg"
                                )}>
                                    {i.content}
                                </p>
                            </div>
                            }
                        </div>
                    ))}
                    {show_code &&
                    <div className="fixed z-20 inset-0 p-1 sm:p-4 md:p-10 bg-white/40 items-center flex justify-center backdrop-blur">
                        <button
                            onClick={() => setShow_code(null)}
                            className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-sm text-sm font-bold border-b-4 border-r-2 border-red-800"
                            >
                            Close
                        </button>
                        <p className={clsx(
                            classNames(show_code), 
                            "h-[98%] w-full font-mono whitespace-pre-wrap rounded-lg overflow-x-auto"
                        )}>
                            {show_code.content}
                        </p>
                    </div>
                    }
                </div>
                :
                image ?
                <div>
                    {preview_data.map((i, index) => (
                        <div className="flex flex-col gap-2">
                            {i.type === 'image' &&
                            <div className="p-2 md:p-5 md:max-h-[900px] w-full flex justify-center items-center">
                                <img src={i.content} alt="" className={clsx(
                                    classNames(i), 
                                    "h-full md:w-[80%] object-cover whitespace-pre-wrap rounded-lg overflow-x-auto"
                                )}
                                onClick={() => setShow_img(i.content)}
                                />
                                {show_img.length > 0 &&
                                <div className="fixed inset-0 h-full w-full bg-white/40 backdrop-blur flex items-center justify-center p-2 md:p-4 z-50">
                                    <div className="relative bg-white rounded-lg shadow-lg 
                                    md:p-4">
                                        <img src={show_img} alt="Certificate" className="max-h-[80vh] object-contain rounded-md" />
                                        
                                        <button
                                        onClick={() => setShow_img('')}
                                        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-sm text-sm font-bold border-b-4 border-r-2 border-red-800 cursor-pointer"
                                        >
                                        Close
                                        </button>
                                    </div>
                                </div>
                                }
                            </div>
                            }
                        </div>
                    ))}
                </div>
                :
                <div className="w-full flex flex-col gap-1">
                {preview_data.map((i, index_1) => (
                    <div key={index_1}>
                        {i.type === 'tools' ?
                        <div className="w-full flex flex-wrap gap-2 py-2">
                            {i.content.map((item, index_2) => {
                                if (item.trim().length === 0) return null;
                                return (
                                <span
                                    key={`${index_1}-${index_2}`}
                                    className={clsx(classNames(i))}
                                >
                                    {item}
                                </span>
                                );
                            })}
                        </div>
                        :
                        i.type === 'image' ?
                            <div className="md:p-5 md:max-h-[900px] w-full flex justify-center items-center">
                                <img src={i.content} alt="" className={clsx(
                                    classNames(i), 
                                    "h-full md:w-[80%] object-cover whitespace-pre-wrap rounded-lg overflow-x-auto"
                                )}
                                onClick={() => setShow_img(i.content)}
                                />
                                {show_img.length > 0 &&
                                <div className="fixed inset-0 h-full w-full bg-white/40 backdrop-blur flex items-center justify-center p-2 md:p-4 z-50">
                                    <div className="relative bg-white rounded-lg shadow-lg 
                                    md:p-4">
                                        <img src={show_img} alt="Certificate" className="max-h-[80vh] object-contain rounded-md" />
                                        
                                        <button
                                        onClick={() => setShow_img('')} // 👈 Make sure this function is defined
                                        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-sm text-sm font-bold border-b-4 border-r-2 border-red-800 cursor-pointer"
                                        >
                                        Close
                                        </button>
                                    </div>
                                </div>

                                }
                            </div>
                        :
                        i.type === 'code'
                         ?
                            <div className="md:px-4">
                                <p className={clsx(
                                    classNames(i), 
                                    "font-mono whitespace-pre-wrap rounded-lg overflow-x-auto"
                                )}>{i.content}</p>
                                
                            </div>
                        :
                            <div className={clsx(
                                classNames(i), 
                                "whitespace-pre-wrap rounded-lg overflow-x-auto"
                            )}>
                                <p>{i.content}</p>
                                
                            </div>
                        }
                    </div>
                ))}
                </div>
                }
            </div>
        }
        </div>
        
        </>
    )


    // const newElement = {
    //   id: Date.now(),
    //   type: selectedType,
    //   content: selectedType === "image" ? "https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=600&q=80" : selectedType === "tools" ? tool : newText,
    //   style: "zinc",
    //   style_opacity: 100,
    //   style_range: 800,
    //   padding_x: 4,
    //   padding_y: 2,
    //   bgColor: "white",
    //   bg_opacity: 100,
    //   bg_range: 900,
    //   size: 16,
    //   width: "full",
    //   borderRadius: "md"
    // };

    


}



export default Preview;