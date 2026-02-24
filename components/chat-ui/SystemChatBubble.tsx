import { Streamdown } from "streamdown";

export const SystemChatBubble = ({
  message,
  status,
}: {
  message: string;
  status: string;
}) => {
  return (
    <div className="mb-4 flex justify-start">
      <div className="flex max-w-[80%] items-start space-x-3">
        <div className="flex-shrink-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-md">
            <svg
              className="h-4 w-4 text-white"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        </div>

        <div className="rounded-2xl rounded-bl-md border border-gray-200 bg-white px-4 py-3 text-gray-900 shadow-lg dark:border-gray-700 dark:bg-gray-800 dark:text-white">
          <div className="mb-2 flex items-center space-x-2">
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
              AI Assistant
            </span>
            {status && (
              <span className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-500 dark:bg-gray-700 dark:text-gray-400">
                {status}
              </span>
            )}
          </div>
          <div className="text-sm leading-relaxed break-words whitespace-pre-wrap">
            <Streamdown>{message}</Streamdown>
          </div>
        </div>
      </div>
    </div>
  );
};
