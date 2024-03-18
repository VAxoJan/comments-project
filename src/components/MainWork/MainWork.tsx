import React, { useState, useEffect, useRef } from "react";
import logo from "../Images/image.png";
import You from "../_Molecules/text/You";
import User from "../_Molecules/User/User";
import UserImage from "../_Molecules/UserImg/UserImage";
import plus from '../Images/plus.svg';
import minus from '../Images/minus.svg';
import trash from '../Images/trash.svg';
import edit from '../Images/edit.svg'

const MainWork: React.FC = () => {
  const [value, setValue] = useState<string>("");
  const [newDivValue, setNewDivValue] = useState<{ text: string; counter: number; time: string }[]>([]);
  const [, setCycleValue] = useState<boolean>(false);

  const handleClick = () => {
    if (value.trim() !== "") {
      const currentTime = new Date().toLocaleTimeString();
      setNewDivValue((prev: { text: string; counter: number; time: string }[]) => [
        ...prev,
        { text: value, counter: 0, time: currentTime }
      ]);
      setValue("");
    } else {
      setCycleValue(true);
    }
    if(value === "") {
      alert("write something!!");
    }
  };

  const incrementCount = (index: number) => {
    setNewDivValue((prev) => {
      const updatedDivValue = [...prev];
      updatedDivValue[index].counter += 1;
      return updatedDivValue;
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const keyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  const focusRef = useRef<HTMLInputElement>(null);
  const focusRefFunction = () => {
    if (focusRef.current) {
      focusRef.current.focus();
    }
  };

  const deductionCount = (index: number) => {
    if(newDivValue[index].counter <= 0) {
      return;
    }
    setNewDivValue((prev) => {
      const updatedDivValue = [...prev];
      updatedDivValue[index].counter -= 1;
      return updatedDivValue;
    });
  };

  const deleteButton = (index: number) => {
    setNewDivValue((prev: { text: string; counter: number; time: string }[]) => {
      const updatedDivValue = [...prev];
      updatedDivValue.splice(index, 1);
      return updatedDivValue;
    });
  };
  

  useEffect(() => {
    setCycleValue(false);
  }, [newDivValue]);

  return (
    <div>
      <div className="w-[100%] sm:w-[700px] h-[800px] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] grid justify-center">
        <div className="w-[343px] sm:w-[600px] h-[550px] mt-2 overflow-y-scroll">
          {newDivValue.map((item, index) => (
            <div className="mt-[70px] border-md grid justify-center bg-white rounded-2xl pt-[16px] overflow-x-scroll md:mt-6" key={index}>
              <div className="flex gap-[3.25rem]">
                <UserImage/>
                <User/>
                <You/>
                <p className="text-[#67727e]">{item.time}</p>        
              </div>
              <div className="flex justify-center pt-[20px]">{item.text}</div>
              <div className="flex gap-[4.25rem] mt-[37px]">
                <div className="flex items-center justify-center gap-[12px] bg-[#f4f4f7] w-[75px] rounded-md">
                  <img className="cursor-pointer" onClick={() => incrementCount(index)} src={plus}/>
                  <h1 className="text-indigo-600">{item.counter}</h1>
                  <img onClick={() => deductionCount(index)} className="cursor-pointer" src={minus}/>
                </div>
                <div className="flex gap-[10px]">
                  <img className="cursor-pointer" onClick={() => deleteButton(index)} src={trash}/>
                  <button className="bg-[white]" onClick={() => deleteButton(index)}>Delete</button>
                </div>
                <div className="flex gap-[10px]">
                  <img className="cursor-pointer" onClick={focusRefFunction} src={edit}/>
                  <button onClick={focusRefFunction}>Edit</button>
                </div>
              </div>
              <div className="h-[30px]"></div>
            </div>
          ))}
        </div>
        <div className="w-[343px] sm:w-[600px] h-[200px] bg-white rounded-md grid justify-center">
          <input
            ref={focusRef}
            className="w-[100%] h-[90px] border outline-none ps-5 rounded-md mt-[15px]"
            type="text"
            placeholder="Add a comment..."
            value={value}
            onChange={handleChange}
            onKeyDown={keyDown}
          />
          <div className=" flex w-full justify-between mt-[25px] items-center">
            <img className="w-[32px] h-[32px] rounded-full" src={logo} alt="" />
            <button
              onClick={handleClick}
              className="bg-[#5357b6] w-[104px] h-[48px] rounded-md font-normal text-bold text-[#ffffff]"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainWork;
  // finished