// import { MessageCircle } from "lucide-react";

// const FloatingChatButton = () => {
//     return (
//         <button
//             className="fixed bottom-6 right-6 bg-red-600 text-black p-4 rounded-full shadow-lg hover:bg-red-700 transition duration-300 z-50 flex items-center justify-center"
//             style={{ position: "fixed", bottom: "24px", right: "24px" }}
//             onClick={() => { window.location.href = "http://localhost:9000"; }}
//             aria-label="Chatbot"
//         >
//             <MessageCircle size={35} strokeWidth={4} />
//         </button>
//     );
// };

// export default FloatingChatButton;




// import botIcon from "./botIcon.png";
// const FloatingChatButton = () => {
//     return (
//         <button
//         className="fixed bottom-6 right-6 bg-transparent p-3 rounded-full shadow-lg hover:opacity-80 transition duration-300 z-50 flex items-center justify-center"
//         style={{ position: "fixed", bottom: "24px", right: "24px" }}
//         onClick={() => { window.location.href = "http://localhost:9000"; }}
//         aria-label="Chatbot"
//     >
//         <img 
//            src={botIcon}
//             alt="Chatbot"
//             style={{ width: "62px", height: "62px"  }}        />
//     </button>
    

//     );
// };


// export default FloatingChatButton;









import botIcon from "./botIcon.png";

const FloatingChatButton = () => {
    return (
        <a
            href="http://localhost:9000"
            className="fixed bottom-6 right-6 z-50"
            aria-label="Chatbot"
            style={{ position: "fixed", bottom: "24px", right: "24px" }}

        >
            <img 
                src={botIcon}
                alt="Chatbot"   
                style={{ width: "150px", height: "150px", borderRadius: "50%", objectFit: "cover" }} 

                // className="w-8 h-8 rounded-full object-cover shadow-lg hover:opacity-80 transition duration-300"

                // style={{ border: "3px solid white" }} // Optional border for visibility
            />
        </a>
    );
};

export default FloatingChatButton;

