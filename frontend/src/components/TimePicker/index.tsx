import { useRef, useEffect, useState } from "react";
import "./styles.css"

export function TimePicker(props: any) {
  const { setSelectedTime, outSideClickFunc, startTime } = props;
	const [selectedHour, setSelectedHour] = useState("00")
	const [selectedMin, setSelectedMin] = useState("00")
	const [lowHour, setLowHour] = useState(0)
	const [lowMin, setLowMin] = useState(0)
	const hourArr = Array.from({length: 24})
	const minArr = Array.from({length: 60})

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

	useEffect(() => {
		if (startTime) {
			const timeArr = startTime.split(":");
			if (parseInt(timeArr[1]) === 59) {
				setLowHour(parseInt(timeArr[0]) + 1)
				setLowMin(0)
			} else {
				setLowHour(parseInt(timeArr[0]))
				setLowMin(parseInt(timeArr[1]))
			} 
		}
	}, [startTime])

	useEffect(() => {
		if (startTime) {
			const timeArr = startTime.split(":");
			if (parseInt(selectedHour) > lowHour) {
				setLowMin(0)
			} 
			if (lowHour === parseInt(selectedHour)) {
				setLowMin(parseInt(timeArr[1]) + 1)
			}
		}
	}, [selectedHour])

	const setTime = (hour: string, min: string) => {
		const strHour = parseInt(hour) < 10 ? `0${parseInt(hour)}` : parseInt(hour).toString()
		const strMin = parseInt(min) * 1 < 10 ? `0${parseInt(min)}` : parseInt(min).toString()
		setSelectedHour(strHour)
		setSelectedMin(strMin)
		setSelectedTime(`${strHour}:${strMin}`)
	}

  const wrapperRef = useRef(null);
	useOutsideAlerter(wrapperRef);
	
  return (
    <div ref={wrapperRef} className="rounded-card bg-grey-low p-2 flex h-60">
			<div className="flex flex-col overflow-auto time-cells hours">
				{
					hourArr.map((_, index) =>
						lowHour <= index
							? <span className="time-cell cursor-default" onClick={() => setTime(index.toString(), selectedMin)}>{index < 10 ? `0${index}` : index}</span>
							: <span className="time-cell disable-time-cell cursor-default">{index < 10 ? `0${index}` : index}</span>
					)
				}
			</div>
			<div className="divider"></div>
			<div className="flex flex-col overflow-auto time-cells mins">
				{
					minArr.map((_, index) =>
						lowMin <= index
							? <span className="time-cell cursor-default" onClick={() => setTime(selectedHour, index.toString())}>{index < 10 ? `0${index}` : index}</span>
							: <span className="time-cell disable-time-cell cursor-default">{index < 10 ? `0${index}` : index}</span>
					)
				}
			</div>
    </div>
  );
}
