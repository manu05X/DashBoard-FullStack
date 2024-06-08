import { useRef, useEffect, useState } from "react";
import "./styles.css"

export function LocationList(props: any) {
  const { list, outSideClickFunc, setEventLocation } = props;

	function useOutsideAlerter(ref) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
            outSideClickFunc(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

	const onSelect = (location: string) => {
		setEventLocation(location)
		outSideClickFunc(false)
	}

  const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef);
	
  return (
    <div ref={wrapperRef} className="absolute location-list flex flex-col z-10 bg-[#1F1F21] p-2">
			{
				list.map((location, index) => 
					<div 
						className="hover:opacity-75 hover:bg-gray-100 p-1 hover:text-black rounded-md cursor-default" 
						key={index}
						onClick={() => onSelect(location.description)}
					>
						{location.description}
					</div>
				)
			}
		</div>
  );
}
