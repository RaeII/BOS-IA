import {BiSolidUserCircle } from "react-icons/bi";
import { useRef } from "react";
import MonkeyLogo from '../../../assets/logo-monkey.png';
import MarkdownFormatter from "../../../components/MarkdownFormatter";

export default function Messages({messages,load}){
    const scrollToLastItem = useRef(null);

    setTimeout(() => {
        scrollToLastItem.current?.lastElementChild?.scrollIntoView({
          behavior: "smooth",
        });
    }, 1);

    return (
        <ul>
            {messages?.map((chatMsg, idx) => {
                const isUser = chatMsg.role === "USER";

                return (
                    <li key={idx} ref={scrollToLastItem}>
                        {isUser ? (
                            <div>
                                <BiSolidUserCircle size={28.8} />
                            </div>
                        ) : 
                        (
                            <img src={MonkeyLogo} alt="LUCY" />
                        )}

                        {isUser ? (
                            <div>
                                <p className="role-title"> Você</p>
                                 <MarkdownFormatter text={chatMsg?.body || ''}/>
                            </div>
                        ) 
                        :
                        (
                            <div>
                               <p className="role-title"> LUCY</p>
                               
                                <MarkdownFormatter text={chatMsg?.body || ''}/>
                            </div>
                        )}
                    </li>
                );
            })}

            {load && (
                <li ref={scrollToLastItem}>
                    <img src={MonkeyLogo} alt={gptName} />
                    <div>
                        <p className="role-title"> {gptName} </p>
                        <p><span className={'Blink'}>|</span></p>
                    </div>
                </li>
            )}
        </ul>
    )
}