import {
  useState,
  useEffect,
  useLayoutEffect,
} from "react";
import { useRef } from "react";


export function Chat() {
  const [userMessage, setText] = useState("");
  const [isResponseLoading, setIsResponseLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [isShowSidebar, setIsShowSidebar] = useState(false);

  const [chats, setChats] = useState([]);
  const [load, setLoad] = useState(false);

  const getMessagesChat = async (chatId) => {

    //return await api.get(`/chat_message?chat_id=${chatId}`).then(e => e.data.content)
  }

  function Messages(messages,load){
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
                                <img style={{width:'26px', height:'auto'}} src="images/profile-user.png" alt="user" />
                            </div>
                        ) : 
                        (   
                            <div style={{overflow:'hidden', borderRadius:"50%"}}>
                               <img src="images/lucy.webp" alt="LUCY" />
                            </div>
                           
                        )}

                        {isUser ? (
                            <div>
                                <p className="role-title"> Você</p>
                                  {chatMsg?.body || ''}
                            </div>
                        ) 
                        :
                        (
                            <div>
                               <p className="role-title"> LUCY</p>
                               
                               {chatMsg?.body || ''}
                            </div>
                        )}
                    </li>
                );
            })}

            {load && (
                <li ref={scrollToLastItem}>
                    <img src="logo-monkey.png" alt={gptName} />
                    <div>
                        <p className="role-title"> {gptName} </p>
                        <p><span className={'Blink'}>|</span></p>
                    </div>
                </li>
            )}
        </ul>
    )
  }

  useEffect(() => {

    const func = async () => {
        try {

      
        let chatStorage = localStorage.getItem('chat')  
        chatStorage = chatStorage ? JSON.parse(chatStorage) : []
          
        setChats(chatStorage)
          
      } catch (error) {
        console.log('Error ==>',error.response.data.message)
      }finally{
       
      }
    }
    func()

  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!userMessage) return;

    setIsResponseLoading(true);

    try {

      let chatStorage = localStorage.getItem('chat')
      chatStorage = chatStorage ? JSON.parse(chatStorage) : []

      chatStorage =  [
        ...chatStorage,
        {
          role:'USER',
          body:userMessage,
          timestamp: Date.now()
        }
      ]

      setChats(chatStorage)
       
      setLoad(true)

      localStorage.setItem('chat',JSON.stringify(chatStorage)) 

      const responseAI = 'TOMA AQUI MINHA RESPOSTA MENÓ'

      chatStorage =  [
        ...chatStorage,
        {
          role:'ASSISTANT',
          body:responseAI,
          timestamp: Date.now()
        }
      ]

      setChats(chatStorage)
      localStorage.setItem('chat',JSON.stringify(chatStorage)) 
      
    } catch (e) {
      setErrorText(e.message);
      console.error(e.message);
      console.error(e?.response?.data);
    } finally {
      setIsResponseLoading(false);
      setLoad(false)
      setText("");
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      // Se a tecla pressionada for "Enter" (sem a tecla Shift), submeta o formulário
      submitHandler(event);
    }
  };

  useLayoutEffect(() => {
    const handleResize = () => {
      setIsShowSidebar(window.innerWidth <= 640);
    };
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <div style={{width:'100vw'}} className="container">


        <section style={{width:'100vw'}} className="main">

          {!chats.length && (
            <div className="empty-chat-container" style={{margin: '40px 0 0 0'}}>
              <img
                src="images/logo-monkey.png"  
                width={45}
                height={45}
                alt="ChatGPT"
              />
              <h3>Como posso ajudar você?</h3>
            </div>
          )}

          {/* //Mensagens do chat */}
          <div className="main-header" style={{margin: '40px 0 0 0', height:"100%"}}>
             {Messages(chats,load)}
          </div>

          <div className="main-bottom">
            {errorText && <p className="errorText">{errorText}</p>}
            <form className="form-container" onSubmit={submitHandler}>  
              <textarea
                type="text"
                placeholder="Envie sua mensagem"
                spellCheck="false"
                onKeyDown={handleKeyDown}
                rows={4}
                cols={50}
                style={{ resize: 'none' }}
                value={isResponseLoading ? "Processing..." : userMessage}
                onChange={(e) => setText(e.target.value)}
                // readOnly={isResponseLoading}
              />
              {!isResponseLoading && (
                <button 
                  type="submit"
                >
                </button>
              )}
            </form>
            <p>
              {/* ChatGPT can make mistakes. Consider checking important
              information. */}
            </p>
          </div>
        </section>
      </div>
    </>
  );
}