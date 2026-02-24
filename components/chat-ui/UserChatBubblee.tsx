import { Streamdown } from "streamdown";

export const UserChatBubble = ({ message }: { message: string }) => {
  return (
    <div className="mb-4 flex justify-end">
      <div className="flex max-w-[80%] items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-md">
            <svg
              className="h-4 w-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        <div className="rounded-2xl rounded-br-md bg-gradient-to-br from-blue-500 to-blue-600 px-4 py-3 text-white shadow-lg">
          <div className="mb-1 text-sm font-medium opacity-90">You</div>
          <div className="text-sm leading-relaxed break-words whitespace-pre-wrap">
            <Streamdown>{message}</Streamdown>
          </div>
        </div>
      </div>
    </div>
  );
};
